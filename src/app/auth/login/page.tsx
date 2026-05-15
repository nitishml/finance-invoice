import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getSession } from "@/features/auth/get-session";
import { LoginCard } from "@/features/auth/login-card";

export const metadata: Metadata = {
    title: "Login",
    description: "Login page",
};

const LoginPage = async () => {
    const session = await getSession();

    if (session)
        return redirect("/")

    return (
        <section className="w-full flex-1 flex items-center justify-center">
            <LoginCard />
        </section>
    );
}

export default LoginPage;