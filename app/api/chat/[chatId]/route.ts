import { LangChainStream, StreamingTextResponse } from 'ai'
import { auth, currentUser } from '@clerk/nextjs/server'
import { CallbackManager } from 'langchain/callbacks'

import { Replicate } from 'langchain/llms/replicate'
import { NextResponse } from 'next/server'

import { MemoryManager } from '@/lib/memory'
import { ratelimit } from '@/lib/rate-limit'
import prismadb from '@/lib/prismadb'
