import { AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
    noRefresh?: boolean
}
export const QueryLoading = ({ noRefresh }: Props) => {
    return (
        <div className="h-screen w-full max-w-[300px] mx-auto my-10">
            <Card className="border drop-shadow-md">
                <CardContent className="h-[250px] w-full flex flex-col items-center justify-center gap-2 p-2">
                    <p className="animate-pulse">
                        {noRefresh ? "Transacting ... " : "Loading ..."}
                    </p>
                    {noRefresh && (
                        <p className="px-4 text-center font-bold">Please do not go back or refresh the page</p>
                    )}
                    <Loader2 className="size-20 text-foreground animate-spin" />

                </CardContent>

            </Card>
        </div>
    )
}

export const QueryLoadingSM = ({ noRefresh }: Props) => {
    return (
        <div className="h-full w-full max-w-[300px] mx-auto my-10">
            <Card className="border drop-shadow-md">
                <CardContent className="h-[250px] w-full flex flex-col items-center justify-center gap-2 p-2">
                    <p className="animate-pulse">
                        {noRefresh ? "Transacting ... " : "Loading ..."}
                    </p>
                    {noRefresh && (
                        <p className="px-4 text-center font-bold">Please do not go back or refresh the page</p>
                    )}
                    <Loader2 className="size-20 text-foreground animate-spin" />

                </CardContent>

            </Card>
        </div>
    )
}


export const DataError = () => {
    return (
        <div className="h-screen w-full max-w-[300px] mx-auto my-10">
            <Card className="border drop-shadow-md">
                <CardContent className="h-[200px] w-full flex flex-col items-center justify-center gap-2 p-2">
                    <p className="animate-pulse">Data Error</p>
                    <AlertCircle className="size-20 text-foreground animate-pulse" />
                </CardContent>

            </Card>
        </div>
    )
}

export function InlineLoader() {
    return (
        <div className="mt-10 grid grid-cols-1 gap-6  sm:grid-cols-2 lg:grid-cols-4">
            <div className="w-full flex flex-col items-center justify-center py-20 space-y-3">
                <Skeleton className="h-[125px] w-[300px] rounded-xl" />
                <div className="space-y-2 flex flex-col items-center justify-center">
                    <Skeleton className="h-4 w-[300px]" />
                    <Skeleton className="h-8 w-[200px]" />
                    <div className="flex items-center justify-center">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                    <Skeleton className="h-4 w-[100px]" />
                </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center py-20 space-y-3">
                <Skeleton className="h-[125px] w-[300px] rounded-xl" />
                <div className="space-y-2 flex flex-col items-center justify-center">
                    <Skeleton className="h-4 w-[300px]" />
                    <Skeleton className="h-8 w-[200px]" />
                    <div className="flex items-center justify-center">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                    <Skeleton className="h-4 w-[100px]" />
                </div>
            </div>
            <div className="w-full hidden md:flex flex-col items-center justify-center py-20 space-y-3">
                <Skeleton className="h-[125px] w-[300px] rounded-xl" />
                <div className="space-y-2 flex flex-col items-center justify-center">
                    <Skeleton className="h-4 w-[300px]" />
                    <Skeleton className="h-8 w-[200px]" />
                    <div className="flex items-center justify-center">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                    <Skeleton className="h-4 w-[100px]" />
                </div>
            </div>
            <div className="w-full hidden md:flex flex-col items-center justify-center py-20 space-y-3">
                <Skeleton className="h-[125px] w-[300px] rounded-xl" />
                <div className="space-y-2 flex flex-col items-center justify-center">
                    <Skeleton className="h-4 w-[300px]" />
                    <Skeleton className="h-8 w-[200px]" />
                    <div className="flex items-center justify-center">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                    <Skeleton className="h-4 w-[100px]" />
                </div>
            </div>
        </div>
    )
}
