import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import SubmitButton from './SubmitButton'
import { handleEdit } from '@/app/actions'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

const Editor = (pid: string, title: string, content: string, imageURL: string) => {
    return (
        <Card className="max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Create Post</CardTitle>
                <CardDescription>Create a new blog post to share with the world</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-4" action={handleEdit(pid)}>
                    <div className="flex flex-col gap-2">
                        <Label>Title</Label>
                        <Input value={title} name="title" required type="text" placeholder="Enter title" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Content</Label>
                        <Textarea value={content} name="content" required placeholder="Enter content" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Image URL</Label>
                        <Input value={imageURL} name="imageURL" required type="url" placeholder="Enter image URL" />
                    </div>
                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    )
}

export default Editor
