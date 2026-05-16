import { cn } from "@/lib/utils";

type Props = {
    label: string;
    className?: string;
}
export const InPageHeader = ({ label, className }: Props) => {
    return (
        <h1
            className={cn("text-2xl font-semibold text-center shadow-foreground shadow-md max-w-max py-2 px-4 rounded-md mx-auto",
                className)}>
            {label}
        </h1>
    );
}