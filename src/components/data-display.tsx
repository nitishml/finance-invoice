import { cn } from "@/lib/utils";

type DisplayProps = {
    title: string;
    value?: string | number | null;
    classNames?: string;
    isMoney?: boolean;
}
export const DataDisplay = ({ title, value, classNames, isMoney }: DisplayProps) => {
    return (
        <div className={cn('min-w-57.5 w-full border border-foreground rounded-md p-4 relative',
            classNames
        )}>
            <div className='absolute -top-3 left-2 px-2 bg-background z-10 rounded-md text-sm'>
                {title}
            </div>
            <p className='  font-semibold text-lg tracking-wider overflow-clip'>{
                (value !== undefined || value !== null) ? value : "-"
            }</p>
            {isMoney && (
                <span className="absolute top-3 right-2 text-2xl">/-</span>
            )}
        </div>
    )
}

export const SoftDataDisplay = ({ title, value, classNames }: DisplayProps) => {
    return (
        <div className={cn('min-w-50 w-full p-2 relative border rounded-md bg-muted',
            classNames
        )}>
            <div className='text-sm text-muted-foreground'>
                {title}
            </div>
            <span className=' font-semibold text-lg tracking-wider leading-4'>{value ? value : "-"}</span>
        </div>
    )
}