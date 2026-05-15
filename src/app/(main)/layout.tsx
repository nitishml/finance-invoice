import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { getSession } from "@/features/auth/get-session";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default async function TeacherLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    const session = await getSession();
    if (!session) return redirect("/auth/login")

    return (
        <SidebarProvider defaultOpen={defaultOpen} className="min-h-screen w-full h-full">
            <AppSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}