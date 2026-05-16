import * as z from "zod";

export type AddContactDTO = {
    name: string;
    slug: string;
    mobile: string;
    email: string;
    gstin?: string | null;
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
}

export const addContactFormSchema = z.object({
    name: z.string(),
    slug: z.string(),
    mobile: z.string(),
    email: z.string(),
    gstin: z.string().optional(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipcode: z.string(),
})

export const addContactApiSchema = z.object({
    name: z.string(),
    slug: z.string(),
    mobile: z.string(),
    email: z.string(),
    gstin: z.string().optional(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipcode: z.string(),
})

export type ContactListItem = {
    id: string;
    name: string;
    slug: string;
    mobile: string;
    city: string;
    isExpenseContact: boolean;
}

export type ContactDetails = {
    id: string;
    name: string;
    slug: string;

    mobile: string;
    email: string;
    gstin?: string | null;

    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
}

export type ContactSearchListItem = {
    id: string;
    name: string;
    slug: string;
    mobile: string;
    city: string;
}