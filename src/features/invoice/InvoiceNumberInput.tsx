"use client"
import { Loader, TriangleAlert } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useGetInvoiceNumber } from "./useGetInvoiceNumber";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { extractInvoiceSerial, transformSerial } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type WrapperProps = {
    invoiceNumber: string | null;
    setInvoiceNumber: Dispatch<SetStateAction<string | null>>
}
export const InvoiceNumberWrapper = ({ invoiceNumber, setInvoiceNumber }: WrapperProps) => {
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
    return (
        <InvoiceNumberInput
            maxSerial={data.maxSerial}
            setInvoiceNumber={setInvoiceNumber}
            invoiceNumber={invoiceNumber}
        />

    );
}


type Props = {
    invoiceNumber: string | null;
    maxSerial: number;
    setInvoiceNumber: Dispatch<SetStateAction<string | null>>
}
export const InvoiceNumberInput = ({ maxSerial, setInvoiceNumber }: Props) => {
    const nextSerial = transformSerial(maxSerial + 1)
    const [temp, setTemp] = useState(nextSerial)

    return (

        <div className='flex rounded-md shadow-xs'>
            <Input
                id="invoiceNumber"
                type="text"
                placeholder="format: GS-xxx-A"
                value={nextSerial}
                onChange={(e) => setTemp(e.target.value)}
                className='-me-px rounded-r-none shadow-none focus-visible:z-1'
            />
            <Button
                className='rounded-l-none'
                onClick={() => setInvoiceNumber(temp)}
                type="button"
            >
                Confirm
            </Button>
        </div>

    );
}


