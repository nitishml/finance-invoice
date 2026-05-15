"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Phone, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { QueryLoadingSM } from "@/components/custom-loaders";
import { useLogin } from "./useLogin";

export const LoginCard = () => {
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const router = useRouter()
    const toggleVisibility = () => setIsVisible((p) => !p);
    const mutation = useLogin()

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        mutation.mutate(
            { mobile, password },
            {
                onError: () => {
                    setLoading(false);
                    setError(true);
                },
                onSuccess: (data) => {
                    if (!data.success) {
                        setLoading(false);
                        setError(true);
                    } else {
                        router.push(`/`);
                        router.refresh();
                    }
                },
            }
        );
    };

    if (isLoading) return <QueryLoadingSM />

    return (
        <div className="relative w-full flex items-center justify-center p-4">
            <div className="
        w-full max-w-[380px] 
        sm:max-w-[360px] 
        md:max-w-[380px]
      ">
                <Card className="bg-muted backdrop-blur-xl shadow-2xl border rounded-xl p-4 sm:p-5 md:p-6">

                    <CardHeader className=" px-1 sm:px-2">
                        <div className=" h-[200px]">
                            <Image
                                src="/logo.svg"
                                width={300}
                                height={250}
                                alt="MPSPSC"
                                className=" w-full h-full object-center rounded-md"
                            />
                        </div>
                        <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-center leading-tight">
                            App Login
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <div className="w-full flex items-center justify-between gap-4">
                                    <Label className="text-sm sm:text-base">Mobile</Label>
                                    <p className="pt-1 text-sm">* 10 digits only</p>
                                </div>
                                <div className="relative">
                                    <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center px-2 peer-disabled:opacity-50 border-r-2'>
                                        <span>+91</span>
                                    </div>
                                    <Input
                                        placeholder="Enter Mobile"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        className="peer pl-12 pe-10 text-sm sm:text-base placeholder:italic"
                                        autoFocus
                                    />
                                    <Phone className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1">
                                <Label className="text-sm sm:text-base">Password</Label>
                                <div className="relative">
                                    <Input
                                        placeholder="Enter Password"
                                        type={isVisible ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="peer pe-10 text-sm sm:text-base"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleVisibility}
                                        className="absolute right-3 top-2.5 text-muted-foreground"
                                    >
                                        {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <Button disabled={isLoading} className="w-full text-sm sm:text-base py-2 sm:py-3">
                                Submit
                            </Button>
                        </form>
                        {/* Error Message */}
                        {isError && (
                            <p className="text-red-600 text-center flex items-center gap-2 justify-center text-sm">
                                <TriangleAlert size={18} /> Invalid login, try again
                            </p>
                        )}
                    </CardContent>
                    <CardFooter className="p-0">
                        <div className="w-full space-y-4">
                            {/* <div className="w-full flex items-end justify-between gap-2">
                                <Button className="text-xs md:text-sm py-5" asChild>
                                    <Link href="/auth/activate" >
                                        Activate Account
                                    </Link>
                                </Button>
                                <Button className="text-xs md:text-sm py-5" asChild>
                                    <Link href="/auth/reset-password" >
                                        Forgot Password
                                    </Link>
                                </Button>
                            </div> */}
                            <div className="w-full flex items-end justify-center gap-2">
                                <ModeToggle />
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};
