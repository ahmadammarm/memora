"use client"

import React, { useState } from 'react'
import { Collection } from '@prisma/client'
import { Collapsible, CollapsibleTrigger } from './ui/collapsible';
import { Button } from './ui/button';
import { CollectionColor, CollectionColors } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';

interface Props {
    collection: Collection;
}

function CollectionCard({collection}: Props) {
    const [isOpen, setIsOpen] = useState(true)

    return (    
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
                <Button variant={"ghost"}
                className={cn("flex w-full justify-between p-6",
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
        </Collapsible>
    )

}

export default CollectionCard