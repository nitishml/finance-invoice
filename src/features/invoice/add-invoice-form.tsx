"use client"
import {
    useState,
} from "react"
import {
    toast
} from "sonner"
import {
    Controller,
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"

import {
    Button
} from "@/components/ui/button"

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { InPageHeader } from "@/components/layout/in-page-header"
import { QueryLoading } from "@/components/custom-loaders"
import { addInvoiceFormSchema } from "./types"
import { useAddInvoice } from "./useAddInvoice"
import { ContactPicker } from "./contact-picker"
import { AccountToggle } from "./account-toggle"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn, extractInvoiceSerial } from "@/lib/utils"
import { format, parseISO } from "date-fns"
import { CalendarIcon, Hash } from "lucide-react"
import { InvoiceNumberWrapper } from "./InvoiceNumberInput"
import { Input } from "@/components/ui/input"

export function AddInvoiceForm() {
    const mutation = useAddInvoice()
    const [isLoading, setLoading] = useState(false)
    const [account, setAccount] = useState<"INCOME" | "EXPENSE">("INCOME")
    const [contactId, setContactId] = useState<string | null>(null)
    const [invoiceNumber, setInvoiceNumber] = useState<string | null>(null)

    const router = useRouter()

    const form = useForm<z.infer<typeof addInvoiceFormSchema>>({
        resolver: zodResolver(addInvoiceFormSchema) as any,
        defaultValues: {
            invoiceDate: format(new Date, "yyyy-MM-dd"),
        }
    })

    function onSubmit(values: z.infer<typeof addInvoiceFormSchema>) {
        //console.log("values:", values)
        if (!contactId || !invoiceNumber) return null

        setLoading(true)
        mutation.mutate({
            account,
            contactId: contactId,
            description: values.description,
            invoiceDate: values.invoiceDate,
            invoiceNumber,
            invoiceSerial: extractInvoiceSerial(invoiceNumber)
        }, {
            onSuccess: (data) => {
                if (data.success && data.data) {
                    toast.success("Invoice Created")
                    router.push(`/invoices/add/${data.data.id}`)
                }
                else {
                    toast.error(data.message || "Please try again")
                    setLoading(false)
                }
            },
            onError: (data) => {
                toast.error(data.message || "Please try again")
                setLoading(false)
            }

        })
    }
    if (isLoading || mutation.isPending) return <QueryLoading />;
    return (
        <div className="w-full flex-1 flex flex-col gap-8 items-start justify-center">
            <InPageHeader label="Add Invoice Form" />
            <form onSubmit={form.handleSubmit(onSubmit)} className=" max-w-6xl  w-full mx-auto space-y-4">
                <AccountToggle account={account} setAccount={setAccount} />

                <ContactPicker setContactId={setContactId} />
                <FieldGroup className={cn("w-full max-w-lg mx-auto p-4 mb border rounded-md",
                    invoiceNumber ? " border-emerald-500" : " border-rose-500"
                )}>
                    <Field>
                        <FieldLabel htmlFor="username">Select Invoice Number</FieldLabel>
                        <InvoiceNumberWrapper setInvoiceNumber={setInvoiceNumber} invoiceNumber={invoiceNumber} />

                        <FieldDescription>
                            Custom serials are subject to unique constraint checks
                        </FieldDescription>
                    </Field>

                </FieldGroup>

                <FieldGroup>

                    <div className="max-w-lg w-full mx-auto space-y-4">
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="description">
                                        Description
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="description"
                                        placeholder=""
                                        aria-invalid={fieldState.invalid}
                                        className=""
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </div>

                    <div className="max-w-lg w-full mx-auto">
                        <Controller
                            name="invoiceDate"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="flex flex-col">
                                    <FieldLabel htmlFor="invoiceDate">
                                        Invoice Date
                                    </FieldLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                id="invoiceDate"
                                                type="button"
                                                variant="outline"
                                                aria-invalid={fieldState.invalid}
                                                className={cn(
                                                    "w-full h-14 pl-3 border-[#dcdcdc] rounded-xl text-left text-foreground font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")  // parseISO, not new Date()
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0" align="center">
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}  // string → Date for display
                                                onSelect={(date) =>
                                                    field.onChange(date ? format(date, 'yyyy-MM-dd') : null)  // Date → string for storage
                                                } captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    <div className="flex items-center justify-center">
                        <Button
                            size={'lg'}
                            type="submit"
                            variant={'default'}
                            className=" max-w-sm w-full h-12"
                            disabled={isLoading}
                        >
                            SUBMIT
                        </Button>
                    </div>
                </FieldGroup>
            </form>
            {/* <DevTool control={form.control} /> */}
        </div>
    )
}


