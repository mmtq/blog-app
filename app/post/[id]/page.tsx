import { prisma } from "@/app/utils/db"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"

type Params = Promise <{id:string}>

async function getData(postID:string) {
    const data = await prisma.blogpost.findUnique({
        where: {
            id: postID
        }
    })

    if (!data) {
        return notFound()
    }

    return data
}

async function Post({params}:{params:Params}) {
    const {id} = await params
    const data = await getData(id)
    return (
         <div className="max-w-3xl mx-auto py-8 px-4">
            <Link href="/" className={buttonVariants({ variant: "secondary" })}>&larr; Back to posts</Link>
            <div className="mb-8 mt-6">
                <h1 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h1>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="relative size-10 overflow-hidden rounded-full">
                            <Image src={data.authorImage} alt={data.authorName} fill className="object-cover"/>
                        </div>
                        <p className="font-medium">{data.authorName}</p>
                    </div>
                    <p>{new Date(data.createdAt).toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})}</p>
                </div>
            </div>

            <div className="relative h-[400px] w-full mb-8 overflow-hidden rounded-lg">
                <Image src={data.imageURL} alt={data.title} fill className="object-cover" priority /> 
            </div>

            <Card>
                <CardContent>
                    <p className="text-gray-700">{data.content}</p>
                </CardContent>
            </Card>
         </div>
    )
}

const page = ({params}:{params:Params}) => {
  return (
    <div>
        <div className="py-6">
            <Suspense fallback={<div>Loading...</div>}>
                <Post params={params} />
            </Suspense>
        </div>
    </div>
  )
}

export default page
