import { Switch } from "@/components/ui/switch"

type InvoiceType = "INCOME" | "EXPENSE"

type Props = {
    invoiceType: InvoiceType
    setInvoiceType: (value: InvoiceType) => void
}

export const InvoiceTypeToggle = ({ invoiceType, setInvoiceType }: Props) => {
    const checked = invoiceType === "EXPENSE"
    return (
        <div className="w-full mx-auto max-w-sm flex items-center justify-center">
            <div className="relative inline-grid h-20 grid-cols-[1fr_1fr] items-center text-sm font-medium border border-foreground rounded-md text-white ">
                <Switch
                    checked={checked}
                    onCheckedChange={(val) => setInvoiceType(val ? "EXPENSE" : "INCOME")}
                    className="peer data-[state=checked]:bg-rose-500 data-[state=unchecked]:bg-emerald-500 absolute inset-0 rounded-md data-[size=default]:h-[full] data-[size=default]:w-auto [&_span]:z-10 [&_span]:rounded-sm [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:group-data-[size=default]/switch:h-full [&_span]:group-data-[size=default]/switch:w-1/2 [&_span]:data-[state=checked]:translate-x-25 [&_span]:data-[state=checked]:rtl:-translate-x-8.75 cursor-pointer"
                    aria-label="Toggle Invoice type"
                />
                {/* Left label — INCOME (unchecked) */}
                <span className="pointer-events-none relative ml-0.5 flex items-center justify-center px-2 text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
                    <span className="text-[20px] font-medium uppercase">Income</span>
                </span>
                {/* Right label — EXPENSE (checked) */}
                <span className=" pointer-events-none relative mr-0.5 flex items-center justify-center px-2 text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
                    <span className="text-[20px] font-medium uppercase">Expense</span>
                </span>
            </div>
        </div>
    )
}