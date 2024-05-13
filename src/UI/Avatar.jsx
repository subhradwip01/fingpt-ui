import React from 'react'
import { cn } from '../libs/utils'

export const Avatar =React.forwardRef(({name,image,className},ref) => {
  return (
    <div className={cn('text-white bg-black text-center rounded-full h-[25px] w-[25px] pt-[0.5px]',className)}>{name}</div>
  )
})
