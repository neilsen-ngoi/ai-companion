import prismadb from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await currentUser()
    const { src, name, description, instructions, seed, categoryId } = body

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('unauthorized', { status: 401 })
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    // TODO check for subscription
    const isPro = await checkSubscription()

    if (!isPro) {
      return new NextResponse('please subscribe', { status: 403 })
    }

    const companion = await prismadb.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    })

    return NextResponse.json(companion)
  } catch (error) {
    console.log('[COMPANION_POST]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
