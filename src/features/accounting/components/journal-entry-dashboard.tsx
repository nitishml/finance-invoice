"use client"

import { DataError, QueryLoading } from "@/components/custom-loaders"
import { useGetAccounts } from "../hooks/useGetAccounts"
import { AddJournalEntryForm } from "./add-journal-entry-form"

type Props = {

}
export const JournalEntryDashbord = ({ }: Props) => {

    const query = useGetAccounts()

    const isLoading = query.isLoading || query.isPending || query.isFetching
    if (isLoading) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    return (
        <div className="w-full">
            <AddJournalEntryForm accounts={data} />
        </div>
    );
}