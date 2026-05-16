import { invoiceStatusEnum } from "@/db/schema";
import { cn } from "@/lib/utils";
import { BookAlert, SendHorizontal, BadgeCheck, TriangleAlert, CircleX } from "lucide-react";

type Props = {
    status: typeof invoiceStatusEnum.enumValues[number];
}
export const StatusBadge = ({ status }: Props) => {
    return (
        <div className={cn("w-40 p-2 rounded-md",
            status === "DRAFT" && "bg-muted border border-foreground",
            status === "EXPECTED" && "bg-amber-500",
            status === "PAID" && "bg-emerald-500 text-white",
            status === "ARREARED" && "bg-rose-500 text-white",
            status === "CANCELLED" && "bg-muted text-muted-foreground",

        )}>
            {status === "DRAFT" && (
                <div className="flex items-center justify-center gap-2">
                    <BookAlert />
                    <p>
                        DRAFT
                    </p>
                </div>
            )}
            {status === "EXPECTED" && (
                <div className="flex items-center justify-center gap-2">
                    <SendHorizontal />
                    <p>
                        EXPECTED
                    </p>
                </div>
            )}
            {status === "PAID" && (
                <div className="flex items-center justify-center gap-2">
                    <BadgeCheck />
                    <p>
                        PAID
                    </p>
                </div>
            )}
            {status === "ARREARED" && (
                <div className="flex items-center justify-center gap-2">
                    <TriangleAlert />
                    <p>
                        ARREARED
                    </p>
                </div>
            )}
            {status === "CANCELLED" && (
                <div className="flex items-center justify-center gap-2">
                    <CircleX />
                    <p>
                        CANCELLED
                    </p>
                </div>
            )}

        </div>
    );
}