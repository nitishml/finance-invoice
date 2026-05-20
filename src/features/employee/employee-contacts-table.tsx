"use client"

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
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Edit } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmployeeContactListItem } from "./types"

interface Props {
    contacts: EmployeeContactListItem[];
}

export function EmployeeContactsTable({ contacts, }: Props) {
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const data = React.useMemo<EmployeeContactListItem[]>(
        () =>
            contacts.map(c => ({
                ...c,
            })),
        [contacts]
    )

    const columns: ColumnDef<EmployeeContactListItem>[] = [
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
                <div className="flex flex-col items-start justify-center">
                    <p className="">{row.original.name}</p>
                    <p className="font-semibold text-sm">{row.original.slug}</p>
                </div>
            ),
        },
        {
            accessorKey: "designation",
            header: ({ column }) => (
                <Button
                    variant="muted"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="px-0"
                >
                    Contact <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex flex-col items-start justify-center">
                    <p className="">{row.original.designation}</p>
                    <p className="font-semibold text-sm">{row.original.department}</p>
                </div>
            ),
        },
        {
            accessorKey: "mobile",
            header: ({ column }) => (
                <Button
                    variant="muted"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="px-0"
                >
                    Contact <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex flex-col items-start justify-center">
                    <p className="">{row.original.mobile}</p>
                    <p className="font-semibold text-sm">{row.original.email}</p>
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <Button variant="view_item" size="sm" className="" asChild>
                    <Link
                        href={`/contacts/manage/${row.original.id}`}
                        prefetch={false}>
                        <Edit className="w-4 h-4" />
                        View
                    </Link>
                </Button>
            ),
        },
    ]

    const table = useReactTable({
        data: contacts,
        columns,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getRowId: row => row.id,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
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