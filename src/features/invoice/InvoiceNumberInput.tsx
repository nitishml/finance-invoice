"use client"
import { Loader, TriangleAlert } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useGetInvoiceNumber } from "./useGetInvoiceNumber";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { extractInvoiceSerial, transformSerial } from "@/lib/utils";

type Props = {
    setInvoiceNumber: Dispatch<SetStateAction<string | null>>
}
export const InvoiceNumberInput = ({ setInvoiceNumber }: Props) => {
    const query = useGetInvoiceNumber()

    const isLoading = query.isLoading || query.isPending || query.isFetching

    if (isLoading) return (
        <div className="w-full flex items-center justify-center">
            <Loader className="animate-spin size-10" />
        </div>
    )

    if (!query.data || !query.data.data) return (
        <div className="w-full flex items-center justify-center">
            <TriangleAlert className="animate-pulse size-10" />
        </div>
    )
    const data = query.data.data
    const nextSerial = transformSerial(data.maxSerial + 1)
    return (
        <div className="w-full max-w-lg mx-auto pb-4">
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="username">Select Invoice Number</FieldLabel>
                    <Input
                        id="invoiceNumber"
                        type="text"
                        placeholder="format: GS-xxx-A"
                        value={nextSerial}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                    />
                    <FieldDescription>
                        Custom serials are subject to unique constraint checks
                    </FieldDescription>
                </Field>

            </FieldGroup>
        </div>
    );
}