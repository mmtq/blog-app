import Image from "next/image";
import Link from "next/link";
import { prisma } from "./utils/db";

async function getData() {
  const data = await prisma.blogpost.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      imageURL: true,
      authorName: true,
      authorImage: true,
      createdAt: true
    }
    })
  return data
}

export default async function Home() {
  const data = await getData()
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
