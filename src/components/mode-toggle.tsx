"use client"

import * as React from "react"
import { Computer, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenuButton } from "./ui/sidebar"
import { Button } from "./ui/button"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    function getTheme(theme: string | undefined) {
        if (!theme) return ""
        if (theme === "light") return "Light Mode"
        if (theme === "dark") return "Dark Mode"
        if (theme === "system") return "System Theme"
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'}
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer max-w-[200px]  w-32 text-foreground">
                    {theme === "light" &&
                        (<Sun className="h-[1.2rem] w-[1.2rem] " />)
                    }
                    {theme === "dark" &&
                        (<Moon className="h-[1.2rem] w-[1.2rem] " />)
                    }
                    {theme === "system" &&
                        (<Computer className="h-[1.2rem] w-[1.2rem] transition-all " />)
                    }

                    <span className="sr-only">Toggle theme</span>
                    <span className="text-xs md:text-sm text-foreground">{getTheme(theme)}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom" className="w-32">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function SidebarModeToggle() {
    const { setTheme, theme } = useTheme()

    function getTheme(theme: string | undefined) {
        if (!theme) return ""
        if (theme === "light") return "Light Mode"
        if (theme === "dark") return "Dark Mode"
        if (theme === "system") return "System Theme"
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    tooltip={"Change Theme"}
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer ">
                    {theme === "light" &&
                        (<Sun className="h-[1.2rem] w-[1.2rem] " />)
                    }
                    {theme === "dark" &&
                        (<Moon className="h-[1.2rem] w-[1.2rem] " />)
                    }
                    {theme === "system" &&
                        (<Computer className="h-[1.2rem] w-[1.2rem] transition-all " />)
                    }

                    <span className="sr-only">Toggle theme</span>
                    <span className="text-xs md:text-sm">{getTheme(theme)}</span>
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom" className="w-32">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}