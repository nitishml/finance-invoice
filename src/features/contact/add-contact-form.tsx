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
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { InPageHeader } from "@/components/layout/in-page-header"
import { QueryLoading } from "@/components/custom-loaders"
import { addContactFormSchema } from "./types"
import { useAddContact } from "./useAddContact"
import { Building2, Mail, Phone, PlusCircle, UserLock, UserRound, UserSearch } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { contactCategoryEnum } from "@/db/schema"
import { AddEmployeeContact } from "../employee/add-employee-form"
import { AddClientContact } from "../client/add-client-form"
import { AddVendorContact } from "../vendor/add-vendor-form"
export function AddContactForm() {
    const mutation = useAddContact()
    const [isLoading, setLoading] = useState(false)
    const [category, setCategory] = useState<"CLIENT" | "EMPLOYEE" | "VENDOR">("CLIENT")
    const router = useRouter()

    const form = useForm<z.infer<typeof addContactFormSchema>>({
        resolver: zodResolver(addContactFormSchema),
        defaultValues: {
            city: "Bengaluru",
            state: "Karnataka",
            country: "India",
            stateCode: "KA",
            currencyCode: "INR"
        }
    })

    function onSubmit(values: z.infer<typeof addContactFormSchema>) {
        //console.log("values:", values)
        setLoading(true)
        mutation.mutate({
            name: values.name,
            slug: values.slug,
            mobile: values.mobile,
            email: values.email,

            gstin: values.gstin,
            cin: values.cin,
            pan: values.pan,

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
            <div className="w-full flex items-center justify-evenly gap-4">
                <Button
                    onClick={() => setCategory("EMPLOYEE")}
                    className="w-[200px] h-12"
                >
                    ADD EMPLOYEE
                </Button>
                <Button
                    onClick={() => setCategory("CLIENT")}
                    className="w-[200px] h-12"
                >
                    ADD CLIENT
                </Button>
                <Button
                    onClick={() => setCategory("VENDOR")}
                    className="w-[200px] h-12"
                >
                    ADD VENDOR
                </Button>
            </div>
            {category === "EMPLOYEE" && (
                <AddEmployeeContact />
            )}
            {category === "CLIENT" && (
                <AddClientContact />
            )}
            {category === "VENDOR" && (
                <AddVendorContact />
            )}
        </div>
    )
}


