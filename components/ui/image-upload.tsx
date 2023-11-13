'use client'
import { CldUploadButton } from 'next-cloudinary'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ImageUploadProps {
  value: string
  onChange: (src: string) => void
  disabled?: boolean
}

export const ImageUpload = ({
  value,
  onChange,
  disabled,
}: ImageUploadProps) => {
  //resolve hydration errors
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  // check that server side is ready before shifting to client side
  if (!isMounted) {
    return null
  }

  return (
    <div className=" space-y-4 w-full flex flex-col justify-center items-center ">
      <CldUploadButton
        onUpload={(result: any) => onChange(result.info.secure_url)}
        options={{ maxFiles: 1 }}
        uploadPreset="messenger"
        className=" p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center"
      >
        <div className="relative h-40 w-40">
          <Image
            fill
            alt="upload"
            src={value || '/placeholder.png'}
            className="rounded-lg object-cover"
          />
        </div>
      </CldUploadButton>
    </div>
  )
}
