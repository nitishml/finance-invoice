import * as z from "zod";

export type AddCustomerDTO = {
    name: string;
    slug: string;
    mobile: string;
    email: string;
    gstin: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
}

export const addCustomerFormSchema = z.object({
    name: z.string(),
    slug: z.string(),
    mobile: z.string(),
    email: z.string(),
    gstin: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipcode: z.string(),
})

export const addCustomerApiSchema = z.object({
    name: z.string(),
    slug: z.string(),
    mobile: z.string(),
    email: z.string(),
    gstin: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipcode: z.string(),
})

export type CustomerListItem = {
    id: string;
    name: string;
    slug: string;
    mobile: string;
    city: string;
}

export type CustomerDetails = {
    id: string;
    name: string;
    slug: string;

    mobile: string;
    email: string;
    gstin: string;

    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
}