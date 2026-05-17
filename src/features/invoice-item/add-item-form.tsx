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
import { Textarea } from "@/components/ui/textarea"
import { InPageHeader } from "@/components/layout/in-page-header"
import { QueryLoading } from "@/components/custom-loaders"
import { addItemFormSchema } from "./types"
import { useAddItem } from "./useAddItem"
import { Boxes, Hash, IndianRupee, Percent, PlusCircle } from "lucide-react"

type Props = {
    invoiceId: string;
    itemLength: number;
}
export function AddItemForm({ invoiceId, itemLength }: Props) {
    const mutation = useAddItem()
    const [symmetricGst, setSymmetricGst] = useState(true)
    const [isLoading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof addItemFormSchema>>({
        resolver: zodResolver(addItemFormSchema) as any,
        defaultValues: {

        }
    })

    const f_gst_ratio = form.watch("gstRatio")
    const f_rate = form.watch("rate")
    const f_quantity = form.watch("quantity")
    const f_gst_amount = (f_rate * f_quantity) * (f_gst_ratio / 100)
    const f_total = (f_rate * f_quantity) + f_gst_amount

    function onSubmit(values: z.infer<typeof addItemFormSchema>) {
        //console.log("values:", values)
        setLoading(true)
        mutation.mutate({
            invoiceId,
            order: itemLength + 1,
            title: values.title,
            description: values.description,
            rate: values.rate,
            quantity: values.quantity,
            gstAmount: f_gst_amount,
            gstRatio: values.gstRatio,
            cgstAmount: (values.rate * values.quantity) * (values.gstRatio / 200),
            cgstRatio: values.gstRatio / 2,
            sgstAmount: (values.rate * values.quantity) * (values.gstRatio / 200),
            sgstRatio: values.gstRatio / 2,
            isSymmetricGst: symmetricGst,
            total: f_total,
        }, {
            onSuccess: (data) => {
                if (data.success && data.data) {
                    toast.success("Item Added to Invoice")
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
        <div className="flex flex-col gap-8 items-start justify-center max-w-3xl w-full border border-foreground p-4 rounded-md">
            <InPageHeader label="Add Item Form" />
            <form onSubmit={form.handleSubmit(onSubmit)} className="   w-full ">
                <FieldGroup className="w-full flex flex-col items-center justify-center">
                    <div className="w-full grid grid-cols-1 max-w-3xl">
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="title">
                                        Title*
                                    </FieldLabel>
                                    <div className='relative'>
                                        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                                            <span className=''>{itemLength + 1 + "."}</span>
                                        </div>
                                        <Input
                                            {...field}
                                            id="title"
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
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 max-w-3xl">
                        <Controller
                            name="rate"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="rate">
                                        Rate*
                                    </FieldLabel>

                                    <div className='relative'>
                                        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                                            <IndianRupee className='size-4' />
                                            <span className='sr-only'>INR</span>
                                        </div>
                                        <Input
                                            {...field}
                                            id="rate"
                                            aria-invalid={fieldState.invalid}
                                            className="pl-9 h-10 border-foreground"
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="quantity"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="quantity">
                                        Quantity*
                                    </FieldLabel>

                                    <div className='relative'>
                                        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                                            <Hash className='size-4' />
                                            <span className='sr-only'>#</span>
                                        </div>
                                        <Input
                                            {...field}
                                            id="quantity"
                                            aria-invalid={fieldState.invalid}
                                            className="pl-9 h-10 border-foreground"
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
                            name="gstRatio"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="gstRatio">
                                        Gst Ratio (out of 100)
                                    </FieldLabel>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                    <div className='relative'>
                                        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                                            <Percent className='size-4' />
                                            <span className='sr-only'>Ratio</span>
                                        </div>
                                        <Input
                                            {...field}
                                            id="gstRatio"
                                            aria-invalid={fieldState.invalid}
                                            className="pl-9 h-10 border-foreground"
                                        />
                                    </div>
                                </Field>
                            )}
                        />
                        <Field >
                            <FieldLabel htmlFor="balance">
                                GST Amount
                            </FieldLabel>
                            {/* <Input
                                id="name"
                                disabled
                                className="bg-background border-foreground h-10 text-foreground"
                                value={"₹" + (f_gst_amount || 0)}
                            /> */}
                            <p className="border border-foreground h-10 text-foreground p-4 rounded-md inline-flex items-center justify-start">
                                {"₹" + (f_gst_amount || 0)}
                            </p>
                        </Field>
                    </div>



                    <div className='flex flex-col items-center justify-center w-[200px] border border-foreground rounded-md'>
                        <div className='h-8 w-full bg-custom-secondary-600 text-white rounded-md rounded-b-none text-center text-base py-1'>
                            {"Item Total"}
                        </div>
                        <div className='h-12 w-full  rounded-md rounded-t-none text-center text-xl font-bold pt-1'>
                            {"₹" + (f_total || 0)}
                        </div>

                    </div>
                    <div className="w-full grid grid-cols-1 gap-2 max-w-3xl">
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
                                        placeholder="Item description"
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
                        className=" max-w-sm w-full"
                        disabled={isLoading}
                    >
                        <PlusCircle />
                        ADD
                    </Button>
                </FieldGroup>
            </form>

            {/* <DevTool control={form.control} /> */}
        </div>
    )
}


