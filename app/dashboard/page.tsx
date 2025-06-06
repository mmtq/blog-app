import { buttonVariants } from "@/components/ui/button"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link"
import { prisma } from "../utils/db";
import BlogPostCard from "@/components/general/BlogPostCard";

async function getData(userID:string) {
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

const page = async () => {
  const {getUser} = await getKindeServerSession();
  const user = (await getUser())!;
  const data = await getData(user.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>
        <Link href="/dashboard/create" className={buttonVariants({})}>Create Post</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((post) => (
          <BlogPostCard key={post.id} data={post} />
        ))}
      </div>
    </div>
  )
}

export default page
