import { prisma } from "./utils/db";
import BlogPostCard from "@/components/general/BlogPostCard";
import { Suspense } from "react";
import BlogPostsGrid from "@/components/general/BlogPostsGrid";

async function getData() {
  const data = await prisma.blogpost.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      imageURL: true,
      authorID: true,
      authorName: true,
      authorImage: true,
      createdAt: true,
      updatedAt: true
    }
  })
  return data
}

export default function Home() {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Posts</h1>
      <Suspense fallback={<BlogPostsGrid />}>
        <BlogPosts />
      </Suspense>
    </div>
  );
}

async function BlogPosts() {
  const data = await getData()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <BlogPostCard key={item.id} data={item} />
      ))}
    </div>
  )
}
