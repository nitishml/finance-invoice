"use client"
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Controller,
    useForm
} from "react-hook-form"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    searchSlug: z.string().optional(),
    searchName: z.string().optional(),
    searchMobile: z.string().optional(),
});



export function ContactSearch() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (values.searchSlug) router.push(`/invoices/add?slug=${values.searchSlug}`)
        if (values.searchName) router.push(`/invoices/add?name=${values.searchName}`)
        if (values.searchMobile) router.push(`/invoices/add?mobile=${values.searchMobile}`)
    };

    return (
        <div className='w-full mt-6 space-y-10'>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted pt-4 p-6 rounded-md border border-b-2 border-muted-foreground   w-full mx-auto space-y-2">
                <h1 className='font-semibold text-lg'>Search Contact</h1>

                <FieldGroup className="">
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2">
                        <Controller
                            name="searchSlug"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <Input
                                        {...field}
                                        id="searchUsn"
                                        aria-invalid={fieldState.invalid}
                                        className="bg-background h-[50px]"
                                        placeholder='Search Slug'
                                        type='search'
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="searchName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>

                                    <Input
                                        {...field}
                                        id="searchName"
                                        aria-invalid={fieldState.invalid}
                                        className="bg-background h-[50px]"
                                        placeholder='Search Name'
                                        type='search'
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="searchMobile"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <Input
                                        {...field}
                                        id="searchMobile"
                                        aria-invalid={fieldState.invalid}
                                        className="bg-background h-[50px]"
                                        placeholder='Search Mobile'
                                        type='search'
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Button type='submit' size={'lg'} className='w-full md:w-max h-[50px] md:rounded-l-none'>
                            Search <Search />
                        </Button>
                    </div>
                </FieldGroup>

            </form>
        </div>
    );
}