"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

interface BlogPost {
    id: string;
    title: string;
    content: string;
    imageURL: string;
    authorID: string;
    authorName: string;
    authorImage: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function handleSubmission(formData : FormData) {

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/register")
    }

    const title = formData.get("title")
    const content = formData.get("content")
    const imageURL = formData.get("imageURL")
    await prisma.blogpost.create({
        data: {
            title: title as string,
            content: content as string,
            imageURL: imageURL as string,
            authorID: user.id,
            authorName: user.given_name as string,
            authorImage: user.picture as string,
        },
    })

    console.log(user.given_name + " created a post")

    return redirect("/dashboard")
}

export async function handleDelete(post: BlogPost, currentUserId: string){
    if (currentUserId !== post.authorID) {
        return redirect("/dashboard")
    }

    console.log("Trying to delete...");

    await prisma.blogpost.delete({
        where: {
            id: post.id
        }
    })

    return redirect("/dashboard")
}

export async function handleEdit(formData : FormData){

    console.log("Trying to edit...");

    const id = formData.get("id")
    const title = formData.get("title")
    const content = formData.get("content")
    const imageURL = formData.get("imageURL")
    await prisma.blogpost.update({
        where: {
            id: id as string
        },
        data: {
            title: title as string,
            content: content as string,
            imageURL: imageURL as string,
        },
    })

    return redirect("/dashboard")
}