import { LangChainStream, StreamingTextResponse } from 'ai'
import { auth, currentUser } from '@clerk/nextjs/server'
import { CallbackManager } from 'langchain/callbacks'

import { Replicate } from 'langchain/llms/replicate'
import { NextResponse } from 'next/server'

import { MemoryManager } from '@/lib/memory'
import { ratelimit } from '@/lib/rate-limit'
import prismadb from '@/lib/prismadb'
import { constrainedMemory } from 'process'

export async function POST(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const { prompt } = await request.json()
    const user = await currentUser()
    if (!user || !user.firstName || !user.id) {
      return new NextResponse('unauthorized', { status: 401 })
    }
    const identifier = request.url + '_' + user.id
    const { success } = await ratelimit(identifier)
    if (!success) {
      return new NextResponse('rate limit exceeded', { status: 429 })
    }
    const companion = await prismadb.companion.update({
      where: {
        id: params.chatId,
        userId: user.id,
      },
      data: {
        messages: {
          create: {
            content: prompt,
            role: 'user',
            userId: user.id,
          },
        },
      },
    })
    if (!companion) {
      return new NextResponse('Companion not foundd', { status: 404 })
    }

    const name = companion.id
    const companion_file_name = name + '.txt'
    const companionKey = {
      companionName: name,
      userId: user.id,
      modelName: 'llama2-13b',
    }

    const memoryManager = await MemoryManager.getInstance()
    const records = await memoryManager.readLatestHistory(companionKey)

    if (records.length === 0) {
      await memoryManager.seedChatHistory(companion.seed, '\n\n', companionKey)
    }

    await memoryManager.writeToHistory('User: ' + prompt + '\n', companionKey)

    const recentChatHistory = await memoryManager.readLatestHistory(
      companionKey
    )

    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      companion_file_name
    )

    let relevantHistory = ''
    if (!!similarDocs && similarDocs.length !== 0) {
      relevantHistory = similarDocs.map((doc) => doc.pageContent).join('\n')
    }

    const { handlers } = LangChainStream()

    const model = new Replicate({
      model:
        'a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5',
      input: {
        max_length: 2048,
      },
      apiKey: process.env.REPLICATE_API_TOKEN,
      callbackManager: CallbackManager.fromHandlers(handlers),
    })
  } catch (error) {
    console.log('CHAT_POST', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
