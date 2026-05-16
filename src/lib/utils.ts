import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function rupeesToPaisa(amount: number): number {
  return Math.round(amount * 100);
}

export function paisaToRupees(amount: number): number {
  return amount / 100;
}

export function formatRupees(amountInPaisa: number): string {
  return "₹ " + (amountInPaisa / 100).toFixed(2);
}

export function printRupees(amountInPaisa: number): string {
  return "₹" + (amountInPaisa / 100).toFixed(2) + "/-"
}