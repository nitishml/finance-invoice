import { contactCategoryEnum } from "@/db/schema";
import z from "zod";

export type AddEmployeeContactDTO = {
    name: string;
    slug: string;
    mobile: string;
    email: string;

    department: string;
    designation: string;

    adhaar?: string | null;
    pan?: string | null;

    address: string;
    address2?: string | null;

    alternateContact?: string | null;
    officialEmail?: string | null;
    contactAddress?: string | null;

    city: string;
    state: string;
    country: string;
    zipcode: string;

    stateCode?: string | null;
    currencyCode?: string | null;
}

export const addEmployeeContactFormSchema = z.object({
    name: z.string(),
    slug: z.string(),
    mobile: z.string(),
    email: z.string(),

    department: z.string(),
    designation: z.string(),

    adhaar: z.string().optional(),
    pan: z.string().optional(),

    address: z.string(),
    address2: z.string().optional(),

    alternateContact: z.string().optional(),
    officialEmail: z.string().optional(),
    contactAddress: z.string().optional(),

    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipcode: z.string(),

    stateCode: z.string(),
    currencyCode: z.string(),

})

export const addEmployeeContactApiSchema = z.object({
    name: z.string(),
    slug: z.string(),
    mobile: z.string(),
    email: z.string(),

    department: z.string(),
    designation: z.string(),

    adhaar: z.string().optional(),
    pan: z.string().optional(),

    address: z.string(),
    address2: z.string().optional(),

    alternateContact: z.string().optional(),
    officialEmail: z.string().optional(),
    contactAddress: z.string().optional(),

    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipcode: z.string(),

    stateCode: z.string(),
    currencyCode: z.string(),
})

export type EmployeeContactListItem = {
    id: string;
    name: string;
    slug: string;
    mobile: string;
    email: string;
    department: string;
    designation: string;
}