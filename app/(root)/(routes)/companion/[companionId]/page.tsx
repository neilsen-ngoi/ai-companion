import prismadb from '@/lib/prismadb'
import CompanionForm from './components/CompanionForm'
import { auth, redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface CompanionIdPageProps {
  params: {
    companionId: string
  }
}
const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  const { userId } = auth()

  if (!userId) {
    return redirectToSignIn()
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
    },
  })

  const categories = await prismadb.category.findMany()
  return <CompanionForm initialData={companion} categories={categories} />
}

export default CompanionIdPage
