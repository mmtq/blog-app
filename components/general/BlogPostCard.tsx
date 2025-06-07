"use client";

import Link from "next/link"
import Image from "next/image"
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { handleDelete } from "@/app/actions";
import { useRouter } from "next/navigation";
interface BlogPostCardProps {
  data: {
    id: string,
    title: string,
    content: string,
    imageURL: string,
    authorID: string,
    authorName: string,
    authorImage: string,
    createdAt: Date,
    updatedAt: Date
  },
  currentUserId?: string
}

const BlogPostCard = ({ data, currentUserId }: BlogPostCardProps) => {
  const router = useRouter();
  const isAuthor = currentUserId === data.authorID;
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      <Link href={`post/${data.id}`} className="block w-full h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={data.imageURL}
            alt={data.title}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
          />

        </div>

        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">{data.title}</h3>
          <p className="mb-4 text-shadow-teal-600 line-clamp-2">{data.content}</p>
        </div>

        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <Image src={data.authorImage} alt={data.authorName} fill className="object-cover" />
            </div>
            <p className="text-sm font-medium text-gray-700">{data.authorName}</p>
          </div>
          <time className="text-xs text-gray-500">
            {new Date(data.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </Link>
                {isAuthor && (
            <div>
              {/* Icons container */}
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  type="button"
                  aria-label="Edit post"
                  className="rounded bg-white p-1 shadow hover:bg-gray-100"
                  onClick={() => router.push('/dashboard/edit?id=' + data.id)}
                >
                  <FiEdit size={20} className="text-gray-700" />
                </button>
                <button
                  type="button"
                  aria-label="Delete post"
                  className="rounded bg-white p-1 shadow hover:bg-gray-100"
                  onClick={() => handleDelete(data, currentUserId)}
                >
                  <FiTrash2 size={20} className="text-red-600" />
                </button>
              </div>

            </div>
          )}

    </div>
  );
};

export default BlogPostCard;
