'use client'
import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

const SearchInput = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryId = searchParams.get('categoryId')
  const name = searchParams.get('name')
  return (
    <div className="relative">
      <SearchIcon className="absolute h-4 top-3 left-4 text-muted-foreground" />
      <Input placeholder="Search..." className=" pl-10 bg-primary/10" />
    </div>
  )
}

export default SearchInput
