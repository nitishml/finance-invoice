import { cn } from '@/lib/utils'
import { GenericProps } from '@/types/generic-props'

export default function PageMain({ children, className }: GenericProps) {
  return (
    <main className={cn(['h-full overflow-auto p-4 mb-8 mx-auto w-full pt-18 md:pt-0', className])}>
      {children}
    </main>
  )
}
