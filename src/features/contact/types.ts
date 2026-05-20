import { contactCategoryEnum, invoiceCategoryEnum } from "@/db/schema";
import * as z from "zod";

export type AddContactDTO = {
    name: string;
    slug: string;
    mobile: string;
    email: string;

    gstin?: string | null;
    cin?: string | null;
    pan?: string | null;

    address: string;
    address2?: string | null;

    city: string;
    state: string;
    country: string;
    zipcode: string;

    stateCode?: string | null;
    currencyCode?: string | null;
}

export const addContactFormSchema = z.object({
    name: z.string(),
    slug: z.string(),
    mobile: z.string(),
    email: z.string(),

    gstin: z.string().optional(),
    cin: z.string().optional(),
    pan: z.string().optional(),

    address: z.string(),
    address2: z.string().optional(),

    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipcode: z.string(),

    stateCode: z.string(),
    currencyCode: z.string().optional(),

    category: z.enum(contactCategoryEnum.enumValues).optional(),
})

export const addContactApiSchema = z.object({
    name: z.string(),
    slug: z.string(),
    mobile: z.string(),
    email: z.string(),

    gstin: z.string().optional(),
    cin: z.string().optional(),
    pan: z.string().optional(),

    address: z.string(),
    address2: z.string().optional(),

    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipcode: z.string(),

    stateCode: z.string(),
    currencyCode: z.string().optional(),

    category: z.enum(contactCategoryEnum.enumValues).optional(),

})

export type ContactListItem = {
    id: string;
    name: string;
    slug: string;
    mobile: string;
    city: string;
}

export type ContactDetails = {
    id: string;
    category: typeof contactCategoryEnum.enumValues[number] | null;

    name: string;
    slug: string;
    mobile: string;
    email: string;

    gstin?: string | null;
    cin?: string | null;
    pan?: string | null;

    address: string;
    address2?: string | null;

    city: string;
    state: string;
    country: string;
    zipcode: string;

    stateCode?: string | null;
    currencyCode?: string | null;
}

export type ContactSearchListItem = {
    id: string;
    name: string;
    slug: string;
    mobile: string;
    city: string;
}