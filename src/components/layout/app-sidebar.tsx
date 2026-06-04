"use client"

import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { FileText, Home, LifeBuoy, FileChartPie, UsersRound, MailCheck, Scale } from "lucide-react"
import { SidebarModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavUser } from "./nav-user"

const routes = [
    {
        title: "Dashboard",
        url: `/home`,
        icon: Home
    },
    {
        title: "Invoices",
        url: `/invoices`,
        icon: FileText
    },
    {
        title: "Contacts",
        url: `/contacts`,
        icon: UsersRound
    },
    {
        title: "Accounting",
        url: `/accounting`,
        icon: Scale
    },
    {
        title: "Statements",
        url: `/statements`,
        icon: FileChartPie
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { setOpen } = useSidebar()

    const route = "/" + usePathname().split("/").slice(0, 4)[1] // check for the first route under main routes
    //console.log("route: ", route)
    return (
        <Sidebar collapsible="icon" {...props} className="text-white ">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <div className=" flex aspect-square size-8 items-center justify-center rounded-lg">
                                <Image
                                    src={'/logo.svg'}
                                    height={32}
                                    width={32}
                                    alt="logo"
                                />
                            </div>
                            <div className="flex-1 text-left">
                                <span className="truncate font-bold  text-2xl leading-tight">
                                    GS-FIN
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="">
                    <SidebarMenu>
                        {routes.map((item, idx) => (
                            <SidebarMenuItem key={idx} >
                                <SidebarMenuButton tooltip={item.title} isActive={item.url === route} asChild>
                                    <a href={item.url} onClick={() => setOpen(false)}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}

                    </SidebarMenu>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <NavUser />
                    <SidebarMenuItem >
                        <SidebarModeToggle />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )

}