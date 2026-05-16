"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
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
import { InvoiceListItem } from "./types"
import { format } from "date-fns"
import { cn, printRupees } from "@/lib/utils"
import { StatusBadge } from "./status-badge"
import { Separator } from "@/components/ui/separator"
import { PayInvoiceForm } from "./pay-invoice-form"
import { PublishInvoiceForm } from "./publish-invoice-form"

interface Props {
    invoices: InvoiceListItem[];
    total: number;
    page: number
    limit: number
    setPage: (page: number) => void
    setLimit: (limit: number) => void
}

export function InvoicesTable({ invoices, total, page, limit, setPage, setLimit }: Props) {

    const data = React.useMemo<InvoiceListItem[]>(
        () =>
            invoices.map(c => ({
                ...c,
            })),
        [invoices]
    )

    const columns: ColumnDef<InvoiceListItem>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="muted"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="px-0"
                >
                    Name <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex items-start justify-start gap-2">
                    <div className={cn("w-2 h-10",
                        row.original.account === "INCOME" && "bg-emerald-500",
                        row.original.account === "EXPENSE" && "bg-rose-500",
                    )}>

                    </div>
                    <div className="flex flex-col items-start justify-start">
                        <p className="">{row.original.name}</p>
                        <p className="font-semibold text-sm">{row.original.expenseType && (row.original.expenseType + " - ")}{row.original.slug}</p>
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
            accessorKey: "expectedPaymentDate",
            header: "Date",
            cell: ({ row }) => (
                <div className="flex flex-col items-start justify-center gap-1">
                    {row.original.paymentDate && (
                        <p className="font-semibold text-base ">{"Paid:" + format(row.original.paymentDate, "dd-MM-yyyy")}</p>
                    )}
                    {row.original.cancelledDate && (
                        <p className="font-semibold text-base ">{"Canc:" + format(row.original.cancelledDate, "dd-MM-yyyy")}</p>
                    )}
                    {row.original.arrearedDate && (
                        <p className="font-semibold text-base ">{"Arr:" + format(row.original.arrearedDate, "dd-MM-yyyy")}</p>
                    )}
                    <p className="text-muted-background">{"Exp:" + format(row.original.expectedPaymentDate, "dd-MM-yyyy")}</p>
                </div>
            ),
        },
        {
            accessorKey: "total",
            header: "Amount",
            cell: ({ row }) => (
                <div className="flex flex-col items-start justify-center">
                    <p className="">{printRupees(row.original.total)}</p>
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
                            href={`/contacts/manage/${row.original.id}`}
                            prefetch={false}>
                            <Eye className="w-4 h-4" />
                            View
                        </Link>
                    </Button>
                    {row.original.status === "EXPECTED" && (
                        <PayInvoiceForm invoiceId={row.original.id} />
                    )}
                    {row.original.status === "DRAFT" && (
                        <PublishInvoiceForm invoiceId={row.original.id} expectedPaymentDate={row.original.expectedPaymentDate} />
                    )}

                </div>
            ),
        },
    ]

    const table = useReactTable({
        data,
        columns,
        pageCount: Math.ceil(total / limit), // Calculate total pages from server
        state: {
            pagination: {
                pageIndex: page - 1, // TanStack uses 0-based index
                pageSize: limit,
            },
        },
        getRowId: row => row.id, // important: ensures row.id is used for selection
        onPaginationChange: (updater) => {
            const newState = typeof updater === 'function'
                ? updater({ pageIndex: page - 1, pageSize: limit })
                : updater

            setPage(newState.pageIndex + 1) // Convert back to 1-based
            setLimit(newState.pageSize)
        },
        manualPagination: true, // KEY: Enable server-side pagination
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        // Remove getPaginationRowModel() for server-side pagination
    })

    return (
        <div className="rounded-3xl w-full border border-muted-foreground p-4 max-w-7xl mx-auto">
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