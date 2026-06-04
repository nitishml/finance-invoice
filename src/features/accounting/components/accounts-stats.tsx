"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react";
import { AddAccountForm } from "./add-account-form";
import { useState } from "react";
type Props = {

}
export const AccountsStats = ({ }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full flex flex-col gap-6">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="max-w-40 w-full h-10">
                        <PlusCircle />
                        Add Account
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Account</DialogTitle>
                        <AddAccountForm setOpen={setOpen} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}