"use client"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useState } from "react"
import { useLogout } from "./useLogout";


export const LogoutButton = () => {
    const [isLoading, setLoading] = useState(false)

    const mutation = useLogout();

    const handleLogout = () => {
        setLoading(true)
        mutation.mutate(
            undefined,
        );
    };
    return (
        <div className="w-full flex items-center justify-center">
            <Button
                className="cursor-pointer w-full  flex  items-center justify-center gap-2"
                onClick={handleLogout}
                disabled={isLoading || mutation.isPending}
            >
                <LogOut />
                Logout
            </Button>
        </div>
    )
}