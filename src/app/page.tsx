import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center  gap-10 p-10">
      <Button asChild>
        <Link href={"/home"}>Home</Link>
      </Button>
      <Button asChild>
        <Link href={"/auth/login"}>Login</Link>
      </Button>
    </div>
  );
}
