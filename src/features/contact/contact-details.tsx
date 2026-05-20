"use client"
import { Page } from "@/components/layout/page";
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { format } from "date-fns";
import { DataDisplay, SoftDataDisplay } from "@/components/data-display";
import { DataError, QueryLoading } from "@/components/custom-loaders";
import { useGetContactDetails } from "./useGetContactDetails";
import { ChartNetwork, FileText, UserPen } from "lucide-react";
import { ComponentActions } from "@/components/actions-list";

type Props = {
    contactId: string
}
export const ContactDetails = ({ contactId }: Props) => {
    const actions = [
        {
            label: 'Edit',
            href: `/contacts/manage/${contactId}/edit`,
            icon: <UserPen />,
        },
        {
            label: 'Invoices',
            href: `/contacts/manage/${contactId}/invoices`,
            icon: <FileText />,
        },
        {
            label: 'Analytics',
            href: `/contacts/manage/${contactId}/analytics`,
            icon: <ChartNetwork />,
        },
    ];
    const query = useGetContactDetails({ contactId })

    const isDisabled = query.isLoading || query.isPending || query.isFetching
    if (isDisabled) return <QueryLoading />
    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    //console.log(data.name)
    return (
        <div className='flex flex-col items-center justify-start gap-4 w-full'>
            <div className='w-full flex flex-col md:flex-row items-center justify-between gap-4'>
                <Card className='flex-1 p-4 border-none shadow-md flex flex-col md:flex-row items-center md:items-start justify-between '>
                    <div className='flex flex-col items-start pt-4 justify-center gap-4'>
                        <h1 className='text-xl md:text-3xl font-bold'>
                            {data.name}
                        </h1>
                        <p className='text-base md:text-xl font-semibold'>{data.slug}</p>

                    </div>
                    <div className='w-full max-w-25 md:max-w-44'>
                        <AspectRatio
                            ratio={1 / 1}
                            className='bg-linear-to-br from-pink-500 to-indigo-600 rounded-md overflow-hidden'
                        >
                        </AspectRatio>
                    </div>
                </Card>
                <ComponentActions actions={actions} />
            </div>

            <div className='w-full flex flex-col md:flex-row items-center justify-center gap-4'>
                <Card className='w-full md:w-1/2 p-4 border-none shadow-md flex flex-col items-center justify-center gap-4'>
                    <DataDisplay title='Mobile' value={data.mobile} />
                </Card>

                <Card className='w-full md:w-1/2  p-4 border-none shadow-md flex flex-col items-center justify-center gap-4 '>
                    <DataDisplay title='Email' value={data.email} classNames='lowercase' />
                </Card>
            </div>

            <Card className="w-full p-4">
                <div className='w-full flex flex-col md:flex-row items-center justify-center gap-4'>
                    <SoftDataDisplay title='GSTIN' value={data.gstin} />
                    <SoftDataDisplay title='CIN' value={data.cin} />
                    <SoftDataDisplay title='PAN' value={data.pan} />
                </div>
            </Card>

            <Card className="w-full p-4">
                <div className='w-full flex flex-col md:flex-row items-center justify-center gap-4'>
                    <SoftDataDisplay title='Address Line 1' value={data.address} />
                    <SoftDataDisplay title='Address Line 2' value={data.address2} />
                </div>
                <div className='w-full flex flex-col md:flex-row items-center justify-center gap-4'>
                    <div className='w-full flex flex-col items-center justify-center gap-4'>
                        <SoftDataDisplay title='City/Town/District' value={data.city} />
                        <SoftDataDisplay title='State' value={data.state} />
                    </div>
                    <div className='w-full flex flex-col items-center justify-center gap-4'>
                        <SoftDataDisplay title='Country' value={data.country} />
                        <SoftDataDisplay title='Zip Code' value={data.zipcode} />
                    </div>
                </div>
            </Card>
            <Card className="w-full p-4">
                <div className='w-full flex flex-col md:flex-row items-center justify-center gap-4'>
                    <DataDisplay title='State Code' value={data.stateCode} />
                    <DataDisplay title='Currency Code' value={data.currencyCode} />
                </div>
            </Card>
        </div>
    );
}