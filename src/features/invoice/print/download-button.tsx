'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useState } from 'react';

interface DownloadPdfButtonProps {
    invoiceId: string;
    filename?: string;
}

export function DownloadPdfButton({ invoiceId, filename }: DownloadPdfButtonProps) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

    const handleDownload = async () => {
        setStatus('loading');

        try {
            const printUrl = `${window.location.origin}/print/invoice/${invoiceId}`;

            const res = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: printUrl,
                    filename: filename ?? `invoice-${invoiceId}.pdf`,
                    format: 'A4',
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.detail ?? 'Unknown error');
            }

            // Stream the blob and trigger download
            const blob = await res.blob();
            const objectUrl = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = objectUrl;
            anchor.download = filename ?? `invoice-${invoiceId}.pdf`;
            anchor.click();
            URL.revokeObjectURL(objectUrl);

            setStatus('idle');
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <Button
            onClick={handleDownload}
            disabled={status === 'loading'}
            className="h-12 w-[250px]"
            size={'lg'}
        >
            <Download />
            {status === 'loading' ? 'Generating PDF…' : 'Download PDF'}
            {status === 'error' && <span className="text-red-500 ml-2">Failed, try again</span>}
        </Button>
    );
}