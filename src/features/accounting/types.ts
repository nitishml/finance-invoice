import { accountTypeEnum } from "@/db/schema";
import z from "zod";

export type AccountListItem = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    accountType: typeof accountTypeEnum.enumValues[number];
}

export type AddAccountDTO = {
    accountType: typeof accountTypeEnum.enumValues[number];
    title: string;
    slug: string;
    description?: string | null;
}

export const addAccountFormSchema = z.object({
    accountType: z.enum(accountTypeEnum.enumValues),
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
})

export const addAccountApiSchema = z.object({
    accountType: z.enum(accountTypeEnum.enumValues),
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
})

export type AddTransactionDTO = {
    debitAccountId: string;
    creditAccountId: string;
    amount: number;
    transactionNumber: string;
    transactionSerial: number;
    transactionDate: Date;
    description?: string | null;
}

export const addTransactionFormSchema = z.object({
    debitAccountId: z.string(),
    creditAccountId: z.string(),
    amount: z.coerce.number(),
    transactionNumber: z.string(),
    transactionSerial: z.coerce.number(),
    transactionDate: z.coerce.date(),
    description: z.string().optional(),
})

export const addTransactionApiSchema = z.object({
    debitAccountId: z.string(),
    creditAccountId: z.string(),
    amount: z.coerce.number(),
    transactionNumber: z.string(),
    transactionSerial: z.coerce.number(),
    transactionDate: z.coerce.date(),
    description: z.string().optional(),
})

export type GeneralLedgerListItem = {
    id: string;
    creditAccount: string;
    debitAccount: string;
    amount: number;
    transactionDate: string;
    transactionNumber: string;
}