import { handleSubmission } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function createBlogroute() {

    return (
        <div className="py-6">
            <Card className="max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>Create Post</CardTitle>
                    <CardDescription>Create a new blog post to share with the world</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4" action={handleSubmission}>
                        <div className="flex flex-col gap-2">
                            <Label>Title</Label>
                            <Input name="title" required type="text" placeholder="Enter title" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Content</Label>
                            <Textarea name="content" required placeholder="Enter content" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Image URL</Label>
                            <Input name="imageURL" required type="url" placeholder="Enter image URL" />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}