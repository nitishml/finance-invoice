"use client"
import { DataError, QueryLoading } from "@/components/custom-loaders";
import { parseAsInteger, useQueryState } from "nuqs";
import { useGetCustomers } from "./useGetCustomers";
import { CustomersTable } from "./customers-table";
import {
    Stat,
    StatIndicator,
    StatLabel,
    StatValue,
} from "@/components/ui/stat";
import { Download, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CustomerDashboard = () => {
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(25))

    const query = useGetCustomers({
        page,
        limit,
    })

    const isLoading = query.isLoading || query.isPending || query.isFetching
    if (isLoading) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data
    return (
        <div className="w-full space-y-4">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-6 items-end">
                <Stat>
                    <StatLabel>Total</StatLabel>
                    <StatValue>{data.pagination.total}</StatValue>
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
                        <Link href={`/customers/onboard`}>
                            <UserPlus />
                            Add Customer
                        </Link>
                    </Button>
                </div>
                <Stat>

                </Stat>
            </div>
            <CustomersTable
                customers={data.customers}
                total={data.pagination.total}
                page={data.pagination.page}
                limit={data.pagination.limit}
                setPage={setPage}
                setLimit={setLimit}
            />
        </div>
    );
}