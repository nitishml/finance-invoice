import { GeneralFooter } from "@/components/layout/general-footer";
import Image from "next/image";
import { Suspense } from 'react'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="min-h-screen w-full flex flex-col relative">
      <div className="absolute inset-0 h-full w-full z-0 bg-custom-secondary-100">

      </div>

      <Suspense fallback={<>...</>}>
        {children}
      </Suspense>
      <GeneralFooter />
    </div>
  );
}
