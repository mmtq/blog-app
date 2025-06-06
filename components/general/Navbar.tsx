import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    return (
        <nav className="py-5 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <Link href="/">
                    <h1 className="text-3xl font-semibold">Blog<span className="text-blue-500">MMTQ</span></h1>
                </Link>
                <div className="hidden sm:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium hover:text-blue-500 transition-colors">Home</Link>
                    <Link href="/dashboard" className="text-sm font-medium hover:text-blue-500 transition-colors">Dashboard</Link>
                </div>
            </div>
            {user ? (
                <div className="flex items-center gap-4">
                    <div>
                        <p>{user.given_name}</p>
                    </div>
                    <LogoutLink className={buttonVariants({ variant: "outline" })}>Sign Out</LogoutLink>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <RegisterLink className={buttonVariants({})}>Sign Up</RegisterLink>
                    <LoginLink className={buttonVariants({ variant: "outline" })}>Sign In</LoginLink>
                </div>
            )}
        </nav>
    )
}

export default Navbar
