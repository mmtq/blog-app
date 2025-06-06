"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

export async function handleSubmission(formData : FormData) {

    const {getUser} = getKindeServerSession();
    const user = (await getUser())!;
    const title = formData.get("title")
    const content = formData.get("content")
    const imageURL = formData.get("imageURL")
    const data = await prisma.blogpost.create({
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
