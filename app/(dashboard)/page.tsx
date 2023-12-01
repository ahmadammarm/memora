import { Skeleton } from "@/components/ui/skeleton";
import { wait } from "@/lib/wait";
import { currentUser } from "@clerk/nextjs"
import { Suspense } from "react";
import prisma from '../../lib/prisma';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SadFace from "@/components/icons/SadFace";
import CreateCollectionBtn from "@/components/CreateCollectionBtn";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
      <Suspense fallback={<div>Loading Collections....</div>}>
        <CollectionList />
      </Suspense>

    </>
  )
}

async function WelcomeMsg() {
  const user = await currentUser();
  await wait(2000);

  if (!user) {
    return (
      <div>
        erorr
      </div>
    )
  }
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        Hello, <br /> {user.firstName} {user.lastName}
      </h1>
    </div>
  )
}

function WelcomeMsgFallback() {
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[150px] h-[36px]" />
        <Skeleton className="w-[180px] h-[36px]" />
      </h1>
    </div>
  )
}

async function CollectionList() {
  const user = await currentUser();
  const collection = await prisma.collection.findMany({
    where: {
      userId: user?.id,
    }
  });

  if (collection.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <SadFace />
          <AlertTitle>There are No Collections Yet!</AlertTitle>
          <AlertDescription>Create a Collection to Get Started!</AlertDescription>
        </Alert>
        <CreateCollectionBtn />
      </div>
    )
  }

  return (
    <div>
      <CreateCollectionBtn />
      {collection.map(collection => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  )
}