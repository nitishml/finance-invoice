"use client"

import { SidebarTrigger } from '@/components/ui/sidebar';

import { Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
// import { UserMenu } from '@/features/auth/UserMenu';

type Props = {
	title: string;
}

export default function PageHeader({ title }: Props) {


	return (
		<>
			{/* Desktop */}
			<header className="hidden z-50 md:flex h-14 shrink-0 items-center justify-between gap-2 w-full pr-4">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />

					<Separator
						orientation="vertical"
						className="mr-2 data-[orientation=vertical]:h-8"
					/>
					{title}
				</div>
				<div className='flex items-center justify-end gap-2'>


					{/* <UserMenu /> */}
				</div>
			</header>


			{/* Mobile */}
			<header className="md:hidden fixed top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-2 w-full pr-4 bg-custom-secondary-700 text-white">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator
						orientation="vertical"
						className="mr-2 data-[orientation=vertical]:h-8"
					/>
					{title}
				</div>

			</header>
		</>
	);
}