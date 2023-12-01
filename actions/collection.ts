"use server"

import { CreateCollectionSchemaType } from "@/schema/createCollection";
import { currentUser } from "@clerk/nextjs";
import prisma from '../lib/prisma';

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