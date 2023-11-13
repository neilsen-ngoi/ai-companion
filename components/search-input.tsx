'use client'

import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react'

const SearchInput = () => {
  return (
    <div className="relative">
      <SearchIcon className="absolute h-4 top-3 left-4 text-muted-foreground" />
      <Input />
    </div>
  )
}

export default SearchInput
