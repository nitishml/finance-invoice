"use client"
import { DataError, QueryLoading } from "@/components/custom-loaders";
import {
    Stat,
    StatIndicator,
    StatLabel,
    StatValue,
} from "@/components/ui/stat";
import { Download, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetEmployeeContacts } from "./useGetEmployeeContacts";
import { EmployeeContactsTable } from "./employee-contacts-table";

export const ContactDashboard = () => {

    const query = useGetEmployeeContacts()

    const isLoading = query.isLoading || query.isPending || query.isFetching
    if (isLoading) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data
    return (
        <div className="w-full space-y-4">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-6 items-end">
                <Stat>
                    <StatLabel>Employee Count</StatLabel>
                    <StatValue>{data.contacts.length}</StatValue>
                    <StatIndicator variant="icon" color="success">
                        <Users />
                    </StatIndicator>
                </Stat>
                <div className="flex flex-col items-center justify-center gap-1">
                    <Button variant={'outline'} className="w-full h-12">
                        <Download />
                        Export CSV
                    </Button>
                    <Button className="w-full h-14" asChild>
                        <Link href={`/contacts/add`}>
                            <UserPlus />
                            Add Contact
                        </Link>
                    </Button>
                </div>
                <Stat>

                </Stat>
            </div>
            <EmployeeContactsTable
                contacts={data.contacts}
            />
        </div>
    );
}