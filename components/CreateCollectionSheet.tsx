import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { useForm } from 'react-hook-form';
import { CreateCollectionSchemaType, createCollectionSchema } from '../schema/createCollection';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CollectionColor, CollectionColors } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function CreateCollectionSheet({ open, onOpenChange }: Props) {
    const form = useForm<CreateCollectionSchemaType>({
        resolver: zodResolver(createCollectionSchema),
        defaultValues: {},
    })

    const onSubmit = (data: CreateCollectionSchemaType) => {
        console.log("Submitted", data)
    }


    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create a Collection</SheetTitle>
                    <SheetDescription>
                        Collections are a way to group your tasks.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Name your collection" />
                                    </FormControl>
                                    <FormDescription>Collection Name</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='color'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <FormControl>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Color" className="w-full h-8" />
                                            </SelectTrigger>
                                            <SelectContent className='w-full'>
                                                {Object.keys(CollectionColors).map((color) => (
                                                    <SelectItem
                                                        key={color}
                                                        value={color}
                                                        className={cn(`w-full h-8 rounded-md my-1 text-white focus:text-white focus:font-bold focus:ring-2 ring-neutral-700 focus:ring-inset dark:focus:ring-white
                                            focus:px-8
                                            `, CollectionColors[color as CollectionColor])}
                                                    >{color}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>Select your collection color</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}

export default CreateCollectionSheet