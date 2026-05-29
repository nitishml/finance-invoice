"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Forward } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { DataError, QueryLoading } from '@/components/custom-loaders';
import { useSearchContact } from './useSearchContact';


export const ContactSearchResults = () => {
    const [searchSlug] = useQueryState('slug', parseAsString.withDefault(""))
    const [searchName] = useQueryState('name', parseAsString.withDefault(""))
    const [searchMobile] = useQueryState('mobile', parseAsString.withDefault(""))

    const query = useSearchContact({
        slug: searchSlug,
        name: searchName,
        mobile: searchMobile,
    });

    if (!searchSlug && !searchName && !searchMobile) return null

    const isDisabled = query.isLoading || query.isPending || query.isFetching
    if (isDisabled) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    return (
        <>
            <Table className="hidden md:block w-full max-w-screen-md mx-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[60px]'>#</TableHead>
                        <TableHead className='w-[300px]'>Name</TableHead>
                        <TableHead className='w-[300px]'>Contact</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.contacts.map((contact, indx) => (
                        <TableRow key={contact.id}>
                            <TableCell className='font-medium hidden md:block w-[60px] '>{indx + 1}</TableCell>
                            <TableCell className=''>
                                <div className="flex flex-col items-start justify-center gap-1">
                                    <span className="font-medium">{contact.slug}</span>
                                    <span className="font-light text-muted-foreground">{contact.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className=''>
                                <div className="flex flex-col items-start justify-center gap-1">
                                    <span className="font-medium">{contact.mobile}</span>
                                    <span className="font-light text-muted-foreground">{contact.email}</span>
                                </div>
                            </TableCell>
                            <TableCell className='capitalize'>
                                <Button asChild variant={'default'} size={'icon'}>
                                    <Link href={`/invoices/add/contact/${contact.id}`}>
                                        <Forward />
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className='w-full md:hidden flex flex-col items-center justify-center gap-2'>
                {data.contacts.map((contact) => (
                    <div key={contact.id} className='p-4 border border-foreground rounded-md w-full flex flex-col items-center justify-center gap-2'>
                        <p>{contact.name}</p>
                        <Button asChild variant={'default'} size={'lg'}>
                            <Link href={`/invoices/add/contact/${contact.id}`}>
                                <Forward /> Select
                            </Link>
                        </Button>
                    </div>
                ))}
            </div>
        </>
    )
}