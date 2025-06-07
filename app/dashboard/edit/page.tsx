// app/dashboard/edit/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { handleEdit } from "@/app/actions";
import SubmitButton from "@/components/general/SubmitButton";
import { prisma } from "@/app/utils/db";
import { redirect } from "next/navigation";

export default async function EditPage({ searchParams }: { searchParams: { id: string } }) {
  const postId = searchParams.id;
  if (!postId) {
    redirect("/dashboard");
  }

  const data = await prisma.blogpost.findUnique({
    where: { id: postId },
  });

  if (!data) {
    redirect("/dashboard");
  }

  return (
    <div className="py-6">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Update Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={handleEdit}>
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input defaultValue={data.title} name="title" required type="text" placeholder="Enter title" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Content</Label>
              <Textarea defaultValue={data.content} name="content" required placeholder="Enter content" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Image URL</Label>
              <Input defaultValue={data.imageURL} name="imageURL" required type="url" placeholder="Enter image URL" />
            </div>
            <input type="hidden" name="id" value={data.id} />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
