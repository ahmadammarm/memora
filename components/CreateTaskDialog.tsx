"use client"

import { Collection } from '@prisma/client';
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { cn } from '@/lib/utils';
import { CollectionColor, CollectionColors } from '@/lib/constants';
import { useForm } from 'react-hook-form';
import { createTaskSchema, createTaskSchemaType } from '@/schema/createTask';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from './ui/form';
import { Textarea } from './ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons';
import format from 'date-fns/format';
import { createTask } from '@/actions/task';
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

interface Props {
    open: boolean;
    collection: Collection;
    setOpen: (open: boolean) => void;
}

function CreateTaskDialog({
    open,
    collection,
    setOpen
}: Props) {

    const form = useForm<createTaskSchemaType>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            collectionId: collection.id,
        },
    })

    const router = useRouter()

    const openChangeWrapper = (value: boolean) => {
        setOpen(value)
        form.reset()
    }

    const onSubmit = async (data: createTaskSchemaType) => {
        try {
            await createTask(data)
            toast({
                title: "Success",
                description: "Task created successfully",
            })
            openChangeWrapper(false)
            router.refresh()
        } catch(e) {
            toast({
                title: "Error",
                description: "Cannot create the task",
                variant: "destructive",
            })
        }
        
    }

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
        <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
                <DialogTitle className="flex gap-2">Add task to the collection : <span className={cn("p-[1px] bg-clip-text text-transparent",
                CollectionColors[collection.color as CollectionColor]
                )}>{collection.name}</span></DialogTitle>
                <DialogDescription>
                    Add a task to your collection to get started. You can add more tasks as you want.
                </DialogDescription>
            </DialogHeader>
            <div className='gap-4 py-4'>
                <Form {...form}>
                    <form className="space-y-4 flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name="content"
                        render={({field}) => <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea
                                rows={5}
                                placeholder='Task Content Here'
                                {...field}
                                />

                            </FormControl>
                        </FormItem>}
                        />
                        <FormField
                        control={form.control}
                        name="expiresAt"
                        render={({field}) => <FormItem>
                            <FormLabel>Expires at</FormLabel>
                            <FormDescription>
                                When the task should be completed ?
                            </FormDescription>
                            <FormControl>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                        variant={"outline"}
                                        className={cn("justify-start text-left font-normal w-full",
                                        !field.value && "text-muted-foreground"
                                        )}
                                        >
                                            <CalendarIcon className='mr-2 w-5 h-5' />
                                            {field.value && format(field.value, "PPP")}
                                            {!field.value && <span>No Expiration</span> }
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Calendar
                                        mode='single'
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                        </FormItem>}
                        />
                    </form>
                </Form>
            </div>
            <DialogFooter>
                <Button disabled={form.formState.isSubmitting} className={cn("w-full", CollectionColors[collection.color as CollectionColor])}
                onClick={form.handleSubmit(onSubmit)}
                >
                    Confirm
                    {form.formState.isSubmitting && (
                        <ReloadIcon className="ml-2 w-5 h-5 animate-spin" />
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default CreateTaskDialog