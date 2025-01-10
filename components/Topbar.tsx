import { Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from 'react'

const Topbar = () => {
  return (
    <div className='flex items-center justify-between pt-6 sm:p-4 xl:py-5 xl:px-6'>
        <button>
            <Menu />
        </button>
        <Avatar className='w-9 h-9 cursor-pointer'>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>

    </div>
  )
}

export default Topbar