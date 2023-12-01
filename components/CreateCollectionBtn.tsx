"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import CreateCollectionSheet from './CreateCollectionSheet'

function CreateCollectionBtn() {
    const [open, setOpen] = useState(false)
    const handleOpenChange = (open: boolean) => setOpen(open)
    return (
        <div className='w-full rounded-md bg-gradient-to-r from-violet-700 via-pink-700 to-purple-500 p-[1px]'>
            <Button
                variant={"outline"}
                className=' w-full dark:bg-neutral-950 bg-white'
                onClick={() => setOpen(true)}
            >
                <span className='bg-gradient-to-r from-violet-700 to-purple-700
        bg-clip-text text-transparent
        '>Create a Collection</span>
            </Button>
            <CreateCollectionSheet open={open} onOpenChange={handleOpenChange} />
        </div>

    )
}

export default CreateCollectionBtn