import Image from "next/image";
import Link from "next/link";

async function getData() {
  const items = [
    {
      title: "Post 1",
      content: "Content 1",
    },
  ]
  return items
}

export default async function Home() {
  const items = await getData()
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      </div>
    </div>
  );
}
