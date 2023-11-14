import SearchInput from '@/components/search-input'
import prismadb from '@/lib/prismadb'
import { Categories } from '@/components/Categories'
import Companions from '@/components/Companions'

interface RootPageProps {
  searchParams: {
    categoryId: string
    name: string
  }
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  // extract params from url to fetch companions based on filter
  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        //full text search
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    //count all messages companion has
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  })

  const categories = await prismadb.category.findMany()

  return (
    <div className=" h-full p4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  )
}

export default RootPage
