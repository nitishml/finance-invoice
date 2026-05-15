import { cn } from '@/lib/utils'
import { GenericProps } from '@/types/generic-props'

export default function PageRoot({ children, className }: GenericProps) {
  return (
    <div className={cn(['h-full w-full overflow-hidden', className])}>
      {children}
    </div>
  )
}
