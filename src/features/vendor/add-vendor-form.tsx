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
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { InPageHeader } from "@/components/layout/in-page-header"
import { QueryLoading } from "@/components/custom-loaders"
import { Building2, Mail, Phone, PlusCircle, UserSearch } from "lucide-react"
import { addVendorContactFormSchema } from "./types"
import { useAddVendorContact } from "./useAddVendor"

export function AddVendorContact() {
    const mutation = useAddVendorContact()
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof addVendorContactFormSchema>>({
        resolver: zodResolver(addVendorContactFormSchema),
        defaultValues: {
            city: "Bengaluru",
            state: "Karnataka",
            country: "India",
            stateCode: "KA",
            currencyCode: "INR"
        }
    })

    function onSubmit(values: z.infer<typeof addVendorContactFormSchema>) {
        //console.log("values:", values)
        setLoading(true)
        mutation.mutate({
            name: values.name,
            slug: values.slug,
            mobile: values.mobile,
            email: values.email,

            gstin: values.gstin,
            pan: values.pan,
            cin: values.cin,

            address: values.address,
            address2: values.address2,

            city: values.city,
            state: values.state,
            country: values.country,
            zipcode: values.zipcode,

            stateCode: values.stateCode,
            currencyCode: values.currencyCode,
        }, {
            onSuccess: (data) => {
                if (data.success && data.data) {
                    toast.success("Contact Created")
                    router.push(`/contacts/manage/${data.data.id}`)
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
        <div className="w-full flex-1 flex flex-col gap-8 items-center justify-center">
            <InPageHeader label="Add Vendor Contact Form" />
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
                <FieldGroup className="  flex flex-col items-center justify-center gap-8">

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="name">
                                        Full Name*
                                    </FieldLabel>

                                    <div className='relative'>
                                        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                                            <Building2 className='size-4' />
                                            <span className='sr-only'>Name</span>
                                        </div>
                                        <Input
                                            {...field}
                                            id="name"
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
                            name="slug"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="slug">
                                        Slug/Alias*
                                    </FieldLabel>
                                    <div className='relative'>
                                        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                                            <UserSearch className='size-4' />
                                            <span className='sr-only'>Slug</span>
                                        </div>
                                        <Input
                                            {...field}
                                            id="slug"
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
                            name="mobile"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="mobile">
                                        Mobile*
                                    </FieldLabel>

                                    <div className='relative'>
                                        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                                            <Phone className='size-4' />
                                            <span className='sr-only'>mobile</span>
                                        </div>
                                        <Input
                                            {...field}
                                            id="mobile"
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
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email">
                                        Email*
                                    </FieldLabel>
                                    <div className='relative'>
                                        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                                            <Mail className='size-4' />
                                            <span className='sr-only'>mobile</span>
                                        </div>
                                        <Input
                                            {...field}
                                            id="email"
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

                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
                        <Controller
                            name="gstin"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="gstin">
                                        GSTIN
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="gstin"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="cin"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="cin">
                                        CIN
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="cin"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="pan"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="pan">
                                        PAN
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="pan"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
                        <Controller
                            name="pocName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="pocName">
                                        PoC Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="pocName"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="pocContact"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="pocContact">
                                        POC Contact
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="pocContact"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="pocEmail"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="pocEmail">
                                        POC Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="pocEmail"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">

                        <Controller
                            name="address"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="address">
                                        Address Line 1*
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="address"
                                        placeholder="Official Address"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="address2"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="address2">
                                        Address Line 2
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="address2"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Controller
                            name="city"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="city">
                                        City*
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="city"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="state"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="state">
                                        State*
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="state"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Controller
                            name="country"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="country">
                                        Country*
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="country"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="zipcode"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="zipcode">
                                        Zipcode*
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="zipcode"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Controller
                            name="stateCode"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="stateCode">
                                        State Code*
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="stateCode"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="currencyCode"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="currencyCode">
                                        Currency Code*
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="currencyCode"
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

            {/* <DevTool control={form.control} /> */}
        </div>
    )
}


