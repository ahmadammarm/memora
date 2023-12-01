"use server"

import { CreateCollectionSchemaType } from "@/schema/createCollection";
import { currentUser } from "@clerk/nextjs";
import prisma from '../lib/prisma';
import { wait } from "@/lib/wait";

export async function createCollection(form: CreateCollectionSchemaType){
    const user = await currentUser()

    if(!user) {
        throw new Error('You must be logged in to create a collection')
    }

    return await prisma.collection.create({
        data: {
            userId: user.id,
            color: form.color,
            name: form.name,
        }
    })
}

export async function deleteCollection(id: number){
    const user = await currentUser()

    if(!user) {
        throw new Error('You must be logged in to delete a collection')
    }

    await wait(3000)

    return await prisma.collection.delete({
        where: {
            id: id
        }
    })
}