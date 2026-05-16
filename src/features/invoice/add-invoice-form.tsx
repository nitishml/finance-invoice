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

import {
    Input
} from "@/components/ui/input"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { InPageHeader } from "@/components/layout/in-page-header"
import { QueryLoading } from "@/components/custom-loaders"
import { addInvoiceFormSchema } from "./types"
import { useAddInvoice } from "./useAddInvoice"
import { ContactPicker } from "./contact-picker"
import { AccountToggle } from "./account-toggle"
import { IndianRupee } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Circle } from "lucide-react"

export function AddInvoiceForm() {
    const mutation = useAddInvoice()
    const [isLoading, setLoading] = useState(false)
    const [account, setAccount] = useState<"INCOME" | "EXPENSE">("INCOME")
    const [contactId, setContactId] = useState<string | null>(null)

    const router = useRouter()

    const form = useForm<z.infer<typeof addInvoiceFormSchema>>({
        resolver: zodResolver(addInvoiceFormSchema) as any,
        defaultValues: {

        }
    })

    function onSubmit(values: z.infer<typeof addInvoiceFormSchema>) {
        //console.log("values:", values)
        if (!contactId) return null

        setLoading(true)
        mutation.mutate({
            price: values.price,
            taxAmount: values.taxAmount,
            gstAmount: values.gstAmount,
            total: values.price + values.taxAmount + values.gstAmount,
            account,
            contactId: contactId,
            description: values.description,
            expectedPaymentDate: values.expectedPaymentDate,
        }, {
            onSuccess: (data) => {
                if (data.success && data.data) {
                    toast.success("Invoice Created")
                    router.push(`/invoices/manage/${data.data.id}`)
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
            <form onSubmit={form.handleSubmit(onSubmit)} className=" max-w-6xl  w-full mx-auto">
                <AccountToggle account={account} setAccount={setAccount} />

                <ContactPicker account={account} setContactId={setContactId} />
                <FieldGroup>
                    <div className="w-full flex items-center justify-center gap-2 max-w-lg mx-auto">
                        <Controller
                            name="price"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="price">
                                        Price*
                                    </FieldLabel>
                                    <div className='relative'>
                                        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                                            <IndianRupee className='size-4' />
                                            <span className='sr-only'>INR</span>
                                        </div>
                                        <Input
                                            {...field}
                                            id="price"
                                            aria-invalid={fieldState.invalid}
                                            className="pl-9 h-12"
                                        />
                                    </div>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 max-w-lg mx-auto">
                        <Controller
                            name="taxAmount"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="taxAmount">
                                        Tax Amount*
                                    </FieldLabel>
                                    <div className='relative'>
                                        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                                            <IndianRupee className='size-4' />
                                            <span className='sr-only'>INR</span>
                                        </div>
                                        <Input
                                            {...field}
                                            id="price"
                                            aria-invalid={fieldState.invalid}
                                            className="pl-9"
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="gstAmount"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="gstAmount">
                                        GST Amount*
                                    </FieldLabel>
                                    <div className='relative'>
                                        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                                            <IndianRupee className='size-4' />
                                            <span className='sr-only'>INR</span>
                                        </div>
                                        <Input
                                            {...field}
                                            id="price"
                                            aria-invalid={fieldState.invalid}
                                            className="pl-9 "
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </div>
                    <div className="max-w-lg w-full mx-auto">
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
                            name="expectedPaymentDate"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="flex flex-col">
                                    <FieldLabel htmlFor="expectedPaymentDate">
                                        Expected Payment Date
                                    </FieldLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                id="expectedPaymentDate"
                                                type="button"
                                                variant="outline"
                                                aria-invalid={fieldState.invalid}
                                                className={cn(
                                                    "w-full h-14 pl-3 border-[#dcdcdc] rounded-xl text-left text-foreground font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0" align="center">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                captionLayout="dropdown"
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


