"use client"
import { DataError, QueryLoading } from "@/components/custom-loaders";
import { parseAsInteger, useQueryState } from "nuqs";
import { useGetInvoices } from "./useGetInvoices";
import { InvoicesTable } from "./invoices-table";
import { InvoiceStats } from "./invoice-stats";

export const InvoiceDashboard = () => {
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(25))

    const query = useGetInvoices({
        page,
        limit,
        status: "ARREARED"
    })

    const isLoading = query.isLoading || query.isPending || query.isFetching
    if (isLoading) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data
    return (
        <div className="w-full space-y-4">
            <InvoiceStats />
            <InvoicesTable
                invoices={data.invoices}
                total={data.pagination.total}
                page={data.pagination.page}
                limit={data.pagination.limit}
                setPage={setPage}
                setLimit={setLimit}
            />
        </div>
    );
}