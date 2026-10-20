import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function rupeesToPaise(input: string | number): number {
  const str = String(input).trim();
  if (!/^\d+(\.\d{1,2})?$/.test(str)) {
    throw new Error(`Invalid rupee amount: ${str}`);
  }
  const [rupees, decimals = ""] = str.split(".");
  return Number(rupees) * 100 + Number(decimals.padEnd(2, "0"));
}

export function paisaToRupees(amount: number): number {
  return amount / 100;
}

export function formatRupees(amountInPaisa: number): string {
  return "₹" + (amountInPaisa / 100).toFixed(2);
}

export function printRupees(amountInPaisa: number): string {
  return "₹" + (amountInPaisa / 100).toFixed(2) + "/-"
}

export function extractInvoiceSerial(invoiceNumber: string): number {
  const serial = invoiceNumber.slice(2, -2);
  return parseInt(serial, 10);
}

export function transformSerial(serial: number): string {
  const padded = String(serial).padStart(3, '0');
  return "GS" + padded + "-A"
}