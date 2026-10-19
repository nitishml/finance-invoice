"use client"

import { DataError, QueryLoading } from "@/components/custom-loaders"
import { useGetContactInvoices } from "../hooks/use-get-contact-invoices"
import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    BanknoteArrowDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Eye,
    FileCheck,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Edit } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { cn, formatRupees, } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { ContactInvoiceListItem } from "../types"
import { StatusBadge } from "@/features/invoice/status-badge"

type Props = {
    contactId: string
}
export const ContactInvoicesList = ({ contactId }: Props) => {
    const query = useGetContactInvoices({ contactId })

    const isDisabled = query.isLoading || query.isPending || query.isFetching
    if (isDisabled) return <QueryLoading />
    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data
    return (
        <ContactsTable
            contacts={data.invoices}
        />
    );
}


function ContactsTable({ contacts }: { contacts: ContactInvoiceListItem[] }) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [pagination, setPagination] = React.useState({
        pageIndex: 0, // TanStack is 0-based natively now, no conversion needed
        pageSize: 25,
    })

    const data = React.useMemo<ContactInvoiceListItem[]>(
        () =>
            contacts.map(c => ({
                ...c,
            })),
        [contacts]
    )

    const columns: ColumnDef<ContactInvoiceListItem>[] = [
        {
            accessorKey: "name",
            header: "Description",
            cell: ({ row }) => (
                <div className="flex items-start justify-start gap-2">
                    <div className={cn("w-2 h-10",
                        row.original.invoiceType === "INCOME" && "bg-emerald-500",
                        row.original.invoiceType === "EXPENSE" && "bg-rose-500",
                    )}>

                    </div>
                    <div className="flex flex-col items-start justify-start">
                        <p className="">{row.original.description}</p>
                        <p className="font-semibold text-sm">{row.original.invoiceCategory}</p>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <p className="text-center">{"Status"}</p>
            ),
            cell: ({ row }) => (
                <div className="flex flex-col items-center justify-center">
                    <StatusBadge status={row.original.status} />
                </div>
            ),
        },
        {
            accessorKey: "dueDate",
            header: ({ column }) => (
                <Button
                    variant="muted"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="px-0"
                >
                    Date <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex flex-col items-start justify-center gap-1">
                    {row.original.paymentDate && (
                        <p className="font-semibold text-base ">{"Paid:" + format(row.original.paymentDate, "dd-MM-yyyy")}</p>
                    )}

                    <p className="text-muted-background">{"Exp:" + format(row.original.dueDate, "dd-MM-yyyy")}</p>
                </div>
            ),
        },
        {
            accessorKey: "total",
            header: "Amount",
            cell: ({ row }) => (
                <div className="flex flex-col items-start justify-center">
                    <p className="">{formatRupees(row.original.total)}</p>
                    {/* <p className="font-semibold text-sm">{row.original.status}</p> */}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center justify-start gap-1">
                    <Button variant="view_item" size="sm" className="" asChild>
                        <Link
                            href={`/invoices/manage/${row.original.id}`}
                            prefetch={false}>
                            <Eye className="w-4 h-4" />
                            View
                        </Link>
                    </Button>
                </div>
            ),
        },
    ]

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
            pagination: {
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
            },
        },
        getRowId: row => row.id,
        onPaginationChange: setPagination, // just pass the setter directly
        // manualPagination: false is the default, so just remove it
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(), // add this
    })

    return (
        <div className="rounded-3xl w-full border border-muted-foreground p-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                    placeholder="Search name..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    type="search"
                    className="max-w-sm"
                />


            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between px-2 py-4">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8 w-17.5">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="pagination_controls"
                            size="icon"
                            className="hidden size-8 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to first page</span>
                            <ChevronsLeft />
                        </Button>
                        <Button
                            variant="pagination_controls"
                            size="icon"
                            className="size-8"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeft />
                        </Button>
                        <Button
                            variant="pagination_controls"
                            size="icon"
                            className="size-8"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRight />
                        </Button>
                        <Button
                            variant="pagination_controls"
                            size="icon"
                            className="hidden size-8 lg:flex"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to last page</span>
                            <ChevronsRight />
                        </Button>
                    </div>
                </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto rounded-lg ">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    className={row.getIsSelected() ? "bg-blue-50" : ""}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}

            <div className="flex flex-col lg:flex-row items-center justify-between px-2 py-4">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8 w-17.5">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="pagination_controls"
                            size="icon"
                            className="hidden size-8 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to first page</span>
                            <ChevronsLeft />
                        </Button>
                        <Button
                            variant="pagination_controls"
                            size="icon"
                            className="size-8"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeft />
                        </Button>
                        <Button
                            variant="pagination_controls"
                            size="icon"
                            className="size-8"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRight />
                        </Button>
                        <Button
                            variant="pagination_controls"
                            size="icon"
                            className="hidden size-8 lg:flex"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to last page</span>
                            <ChevronsRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}