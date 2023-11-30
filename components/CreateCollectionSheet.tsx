import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { useForm } from 'react-hook-form';
import { CreateCollectionSchemaType, createCollectionSchema} from '../schema/createCollection';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

interface Props {
    open: boolean;
    onOpenChange : (open: boolean) => void;
}

function CreateCollectionSheet({open, onOpenChange}: Props) {
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
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Name your collection" />
                            </FormControl>
                            <FormDescription>Collection Name</FormDescription>
                            <FormMessage/>
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