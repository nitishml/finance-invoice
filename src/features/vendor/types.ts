import z from "zod";

export type AddVendorContactDTO = {
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

    pocName?: string | null;
    pocContact?: string | null;
    pocEmail?: string | null;

    websiteUrl?: string | null;
    remarks?: string | null;
}

export const addVendorContactFormSchema = z.object({
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
    currencyCode: z.string(),

    pocName: z.string().optional(),
    pocContact: z.string().optional(),
    pocEmail: z.string().optional(),

    websiteUrl: z.string().optional(),
    remarks: z.string().optional(),
})

export const addVendorContactApiSchema = z.object({
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
    currencyCode: z.string(),


    pocName: z.string().optional(),
    pocContact: z.string().optional(),
    pocEmail: z.string().optional(),

    websiteUrl: z.string().optional(),
    remarks: z.string().optional(),
})

export type VendorContactListItem = {
    id: string;
    name: string;
    slug: string;
    mobile: string;
    email: string;
    city: string;
}