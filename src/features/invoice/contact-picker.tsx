"use client"
import { Dispatch, SetStateAction } from "react";
import { useGetContacts } from "../contact/useGetContacts";
import { DataError, QueryLoading } from "@/components/custom-loaders";
import { ContactListItem } from "../contact/types";
import { useId, useState } from 'react'

import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from "@/lib/utils";

type Props = {
    setContactId: Dispatch<SetStateAction<string | null>>;
}
export const ContactPicker = ({ setContactId }: Props) => {
    const [open, setOpen] = useState(false)
    const [selectedContact, setSelectedContact] = useState<ContactListItem | null>(null)

    const query = useGetContacts()
    const isLoading = query.isLoading || query.isPending || query.isFetching
    if (isLoading) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    return (
        <div className="*:not-first:mt-2 py-4 max-w-lg mx-auto">
            <h3>Select Contact</h3>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                    >
                        <span className={cn("truncate", !selectedContact && "text-muted-foreground")}>
                            {selectedContact ? selectedContact.name : "Select Contact"}

                        </span>
                        <ChevronDownIcon
                            size={16}
                            className="text-muted-foreground/80 shrink-0"
                            aria-hidden="true"
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
                    align="start"
                >
                    <Command>
                        <CommandInput placeholder={`Search Contact...`} />
                        <CommandList>
                            <CommandEmpty>No Contact found.</CommandEmpty>
                            <CommandGroup>
                                <div className="w-full">
                                    {data.contacts.map((item) => (
                                        <CommandItem
                                            key={item.id}
                                            value={item.name}
                                            onSelect={() => {
                                                const newContact = selectedContact?.id === item.id ? null : item
                                                setSelectedContact(newContact)
                                                setContactId(newContact?.id ?? null)
                                                setOpen(false)
                                            }}
                                            className={cn("h-10")}
                                        >
                                            {item.name}
                                            <span className="text-muted-foreground text-xs ml-1">{item.mobile}</span>
                                            {selectedContact?.id === item.id && (
                                                <CheckIcon size={16} className="" />
                                            )}
                                        </CommandItem>
                                    ))}
                                </div>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}

