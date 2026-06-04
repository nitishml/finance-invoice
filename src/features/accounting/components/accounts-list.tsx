"use client"

import { DataError, QueryLoading } from "@/components/custom-loaders"
import { useGetAccounts } from "../hooks/useGetAccounts"
import { Card } from "@/components/ui/card"

type Props = {

}
export const AccountsList = ({ }: Props) => {
    const query = useGetAccounts()

    const isLoading = query.isLoading || query.isPending || query.isFetching
    if (isLoading) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    const accounts = Object.entries(
        Object.groupBy(data, (row) => row.accountType)
    ).map(([accountType, items]) => ({
        accountType,
        items: items!.map(({ id, title, slug, description }) => ({ id, title, slug, description })),
    }));

    return (
        <div className="w-full flex flex-col gap-6">
            {accounts.map((item) => (
                <div key={item.accountType} className="w-full flex flex-col gap-2">
                    <h2>{item.accountType}</h2>
                    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                        {item.items.map((account) => (
                            <Card
                                key={account.id}
                                className="p-0"
                            >
                                <div className="w-full p-4 flex flex-col items-center justify-center gap-2">

                                    <p className="text-sm font-semibold">{account.slug}</p>
                                    <p className="text-2xl font-bold">{account.title}</p>
                                    <p className="font-light">{account.description}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}