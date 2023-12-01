"use client"

import React, { useState } from 'react'
import { Collection } from '@prisma/client'
import { Collapsible, CollapsibleTrigger } from './ui/collapsible';
import { Button } from './ui/button';
import { CollectionColor, CollectionColors } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface Props {
    collection: Collection;
}

function CollectionCard({collection}: Props) {
    const [isOpen, setIsOpen] = useState(true)

    return (    
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger>
                <Button variant={"ghost"}
                className={cn("flex w-full justify-between p-6",
                CollectionColors[collection.color as CollectionColor]
                )}
                >
                    {collection.name}
                </Button>
            </CollapsibleTrigger>
        </Collapsible>
    )

}

export default CollectionCard