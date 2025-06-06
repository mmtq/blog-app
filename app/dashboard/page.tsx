import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user){
    return redirect('/api/auth/register');
  }
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default page
