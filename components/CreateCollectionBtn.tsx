"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'

function CreateCollectionBtn() {
    const [open, setOpen] = useState(false)
    const handleOpenChange = (open:boolean) => setOpen(open)
  return (
    <div className='w-full rounded-md bg-gradient-to-r from-red-700 via-pink-700 to-yellow-500 p-[1px]'>
        <Button 
        variant={"outline"} 
        className='dark:text-white w-full dark:bg-neutral-950 bg-white'
        onClick={() => setOpen(true)}
        >
        <span className='bg-gradient-to-r from-red-500 to-orange-500
        bg-clip-text text-transparent
        '>Create a Collection</span>
    </Button>
    <CreateCollectionSheet/>
    </div>
    
  )
}

export default CreateCollectionBtn