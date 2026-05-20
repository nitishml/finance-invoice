"use client"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { BanknoteArrowDown } from "lucide-react";
import { usePayInvoice } from "./usePayInvoice";
import { useState } from "react";
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
import { payInvoiceFormSchema } from "./types";
import z from "zod";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea";

type Props = {
    invoiceId: string;
    dueDate: Date,
}
export const PayInvoiceForm = ({ invoiceId, dueDate }: Props) => {
    const mutation = usePayInvoice()
    const [isLoading, setLoading] = useState(false)
    // const router = useRouter()

    const form = useForm<z.infer<typeof payInvoiceFormSchema>>({
        resolver: zodResolver(payInvoiceFormSchema) as any,
        defaultValues: {
            paymentDate: dueDate,
        }
    })

    function onSubmit(values: z.infer<typeof payInvoiceFormSchema>) {
        setLoading(true)
        //console.log("values:", values)
        mutation.mutate({
            invoiceId,
            remarks: values.remarks,
            paymentDate: values.paymentDate,
        }, {
            onSuccess: (data) => {
                if (data.success && data.data) {
                    toast.success("Invoice Payment Successful")
                    // router.push(`/staff/finance/fees/receipts/manage/${data.data.txnId}?std=${studentId}`)
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
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="pay_item" size="sm" className="px-4">
                    <BanknoteArrowDown className="w-4 h-4" />
                    Pay
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invoice Payment</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="  w-full mx-auto">
                    <FieldGroup className=" bg-muted p-10 py-6 rounded-md border border-b-2 border-muted-foreground flex flex-col items-center justify-center gap-8">
                        <div className="w-full grid grid-cols-1  gap-4">
                            <Controller
                                name="paymentDate"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="flex flex-col">
                                        <FieldLabel htmlFor="dob">
                                            PaymentDate
                                        </FieldLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id="dob"
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

                        <Controller
                            name="remarks"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="remarks">
                                        Remarks
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="remarks"
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

                        <Button
                            size={'lg'}
                            type="submit"
                            variant={'default'}
                            className=" max-w-sm w-full h-14"
                            disabled={isLoading}
                        >
                            SUBMIT
                        </Button>
                    </FieldGroup>
                </form>
                <DialogFooter >
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}