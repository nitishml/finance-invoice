"use client"
import {
    Dispatch,
    SetStateAction,
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
import { BookMarked, Building2, Mail, Phone, PlusCircle, UserSearch } from "lucide-react"
import { addAccountFormSchema } from "../types"
import { useAddAccount } from "../hooks/useAddAccount"
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

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>
}
export function AddAccountForm({ setOpen }: Props) {
    const mutation = useAddAccount()
    const [isLoading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof addAccountFormSchema>>({
        resolver: zodResolver(addAccountFormSchema),
        defaultValues: {

        }
    })

    function onSubmit(values: z.infer<typeof addAccountFormSchema>) {
        //console.log("values:", values)
        setLoading(true)
        mutation.mutate(
            values, {
            onSuccess: (data) => {
                if (data.success && data.data) {
                    toast.success("Account Added")
                    setOpen(false)
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
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
                <FieldGroup className="  flex flex-col items-center justify-center gap-8">
                    <Controller
                        name="accountType"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field orientation="responsive" data-invalid={fieldState.invalid}>
                                <FieldContent>
                                    <FieldLabel htmlFor="form-rhf-select-language">
                                        Choose An Account Type
                                    </FieldLabel>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </FieldContent>
                                <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        id="form-rhf-select-language"
                                        aria-invalid={fieldState.invalid}
                                        className="min-w-[120px]"
                                    >
                                        <SelectValue placeholder="Select Account Type" />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        {accountTypeEnum.enumValues.map((item) => (
                                            <SelectItem
                                                key={item}
                                                value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                        )}
                    />

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
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
                                            <BookMarked className='size-4' />
                                            <span className='sr-only'>Title</span>
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

            {/* <DevTool control={form.control} /> */}
        </div>
    )
}


