import { buttonVariants } from "@/components/ui/button"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link"
import { prisma } from "../utils/db";
import BlogPostCard from "@/components/general/BlogPostCard";
import { Suspense } from "react";
import BlogPostsGrid from "@/components/general/BlogPostsGrid";
import { redirect } from "next/navigation";

async function getData(userID: string) {
  const data = await prisma.blogpost.findMany({
    where: {
      authorID: userID
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return data
}

async function BlogPosts() {
  const { getUser } = getKindeServerSession();
  const user = (await getUser())!;
  const data = await getData(user.id);

  if (!user) {
  return redirect("/api/auth/register");
}


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((post) => (
        <BlogPostCard key={post.id} data={post} />
      ))}
    </div>

  )
}

const page = () => {

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>
        <Link href="/dashboard/create" className={buttonVariants({})}>Create Post</Link>
      </div>
      <Suspense fallback={<BlogPostsGrid/>}>
          <BlogPosts />
      </Suspense>
    </div>
  )
}

export default page
