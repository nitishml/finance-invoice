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
import { DevTool } from "@hookform/devtools";
import {
    Input
} from "@/components/ui/input"
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { InPageHeader } from "@/components/layout/in-page-header"
import { QueryLoading } from "@/components/custom-loaders"
import { BookMarked, Building2, IndianRupee, Mail, Phone, PlusCircle, UserSearch } from "lucide-react"
import { addAccountFormSchema, addTransactionFormSchema } from "../types"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { accountTypeEnum } from "@/db/schema"
import { DialogClose } from "@/components/ui/dialog"
import { useAddTransaction } from "../hooks/useAddTransaction"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

type Props = {
    accounts: {
        title: string;
        id: string;
        accountType: typeof accountTypeEnum.enumValues[number];
    }[]
}

export function AddJournalEntryForm({ accounts }: Props) {
    const mutation = useAddTransaction()
    const [isLoading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof addTransactionFormSchema>>({
        resolver: zodResolver(addTransactionFormSchema) as any,
        defaultValues: {
            amount: 500,
            transactionDate: new Date(),
            description: "Test desc",
            transactionSerial: 1,
            transactionNumber: "BCD-1"
        }
    })

    function onSubmit(values: z.infer<typeof addTransactionFormSchema>) {
        //console.log("values:", values)
        setLoading(true)
        mutation.mutate(
            values, {
            onSuccess: (data) => {
                if (data.success && data.data) {
                    toast.success("Transaction Added")
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
    return (
        <div className="w-full flex-1 flex flex-col gap-8 items-center justify-center pt-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full space-y-6">
                <InPageHeader label="Add Journal Entry" />
                <FieldGroup className="  flex flex-col items-center justify-center gap-8">
                    <div className="w-full grid grid-cols-1 gap-2">
                        <Controller
                            name="creditAccountId"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field orientation="responsive" data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel htmlFor="creditAccountId">
                                            Choose Credit Account
                                        </FieldLabel>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </FieldContent>
                                    <Select
                                        name={field.name}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger
                                            id="creditAccountId"
                                            aria-invalid={fieldState.invalid}
                                            className="min-w-[120px]"
                                        >
                                            <SelectValue placeholder="Select Account" />
                                        </SelectTrigger>
                                        <SelectContent position="item-aligned">
                                            {accounts.map((item) => (
                                                <SelectItem
                                                    key={item.id}
                                                    value={item.id}>
                                                    {item.accountType + " | " + item.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            )}
                        />
                        <Controller
                            name="debitAccountId"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field orientation="responsive" data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel htmlFor="debitAccountId">
                                            Choose Debit Account
                                        </FieldLabel>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </FieldContent>
                                    <Select
                                        name={field.name}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger
                                            id="debitAccountId"
                                            aria-invalid={fieldState.invalid}
                                            className="min-w-[120px]"
                                        >
                                            <SelectValue placeholder="Select Account" />
                                        </SelectTrigger>
                                        <SelectContent position="item-aligned">
                                            {accounts.map((item) => (
                                                <SelectItem
                                                    key={item.id}
                                                    value={item.id}>
                                                    {item.accountType + " | " + item.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            )}
                        />

                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Controller
                            name="transactionNumber"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="transactionNumber">
                                        Transaction Number*
                                    </FieldLabel>

                                    <div className='relative'>
                                        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                                            <BookMarked className='size-4' />
                                            <span className='sr-only'>Transaction Number</span>
                                        </div>
                                        <Input
                                            {...field}
                                            id="transactionNumber"
                                            aria-invalid={fieldState.invalid}
                                            className="pl-9 h-12 border-foreground"
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="transactionSerial"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="transactionSerial">
                                        Transaction Serial*
                                    </FieldLabel>
                                    <div className='relative'>
                                        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                                            <UserSearch className='size-4' />
                                            <span className='sr-only'>transactionSerial</span>
                                        </div>
                                        <Input
                                            {...field}
                                            id="transactionSerial"
                                            aria-invalid={fieldState.invalid}
                                            className="pl-9 h-12 border-foreground"
                                        />
                                    </div>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Controller
                            name="amount"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="amount">
                                        Amount*
                                    </FieldLabel>

                                    <div className='relative'>
                                        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                                            <IndianRupee className='size-4' />
                                            <span className='sr-only'>Amount</span>
                                        </div>
                                        <Input
                                            {...field}
                                            id="amount"
                                            aria-invalid={fieldState.invalid}
                                            className="pl-9 h-12 border-foreground"
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="transactionDate"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="flex flex-col">
                                    <FieldLabel htmlFor="transactionDate">
                                        Transaction Date
                                    </FieldLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                id="transactionDate"
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
                    <div className="w-full">

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
                                        placeholder="describe this account"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                    <Button
                        size={'lg'}
                        type="submit"
                        variant={'default'}
                        className=" max-w-sm w-full h-12"
                        disabled={isLoading}
                    >
                        <PlusCircle />
                        SUBMIT
                    </Button>
                </FieldGroup>
            </form>

            <DevTool control={form.control} />
        </div>
    )
}


