"use client"

import React, { useState, useTransition } from 'react'
import { Collection } from '@prisma/client'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Button } from './ui/button';
import { CollectionColor, CollectionColors } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { CaretDownIcon, CaretUpIcon, TrashIcon } from '@radix-ui/react-icons';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import Plus from './icons/Plus';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { deleteCollection } from '@/actions/collection';
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

interface Props {
    collection: Collection;
}

const tasks: string[] = [
    "task 2"
]

function CollectionCard({collection}: Props) {
    const [isOpen, setIsOpen] = useState(true)
    const router = useRouter()

    const [isLoading, startTransition] = useTransition()

    const removeCollection = async () => {
        try {
            await deleteCollection(collection.id)
            toast({
                title: "Collection deleted",
                description: "Collection has been deleted successfully",
            })
            router.refresh()
        } catch(e) {
            toast({
                title: "Error",
                description: "Cannot delete the collection",
                variant: "destructive",
            })
        }
        
    }

    return (    
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
                <Button variant={"ghost"}
                className={cn("flex w-full justify-between p-6",
                isOpen && "rounded-b-none",
                CollectionColors[collection.color as CollectionColor]
                )}
                >
                    <span className='
                    dark:text-white text-black
                    font-bold'>{collection.name}</span>
                    {!isOpen && <CaretDownIcon className='h-6 w-6' />}
                    {isOpen && <CaretUpIcon className="h-6 w-6" />}
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
                {tasks.length === 0 && <div>No Tasks</div>}
                {
                    tasks.length > 0 && (
                        <>
                            <Progress className='rounded-none' value={45} />
                            <div className='p-4 gap-3 flex flex-col'>
                                {tasks.map((task) => (
                                    <div>Mocked Task</div>
                                ))}
                            </div>
                        </>
                    )}
                    <Separator />
                    <footer className='h-[40px] px-4 p-[2px] text-xs text-neutral-600 flex justify-between
                    items-center
                    '>
                        <p>
                            Created at : {collection.createdAt.toDateString()}
                        </p>
                        {isLoading && <div>Deleting...</div>}
                        {!isLoading && (
                            <div>
                            <Button size={"icon"} variant={"ghost"}>
                                <Plus/>
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                <Button size={"icon"} variant={"ghost"}>
                                <TrashIcon/>
                            </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogTitle>
                                        Are you sure to delete this collection?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone and will permanently delete this collection.
                                    </AlertDialogDescription>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                        onClick={() => {
                                            startTransition(removeCollection)
                                        }}
                                        >Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                        )}
                    </footer>
            </CollapsibleContent>
        </Collapsible>
    )

}

export default CollectionCard