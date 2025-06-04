import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hellow from Home!</h1>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
