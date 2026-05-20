"use client"
import {
    useState,
} from "react"
import {
    Button
} from "@/components/ui/button"
import { AddEmployeeContact } from "../employee/add-employee-form"
import { AddVendorContact } from "../vendor/add-vendor-form"
import { AddCustomerContact } from "../customer/add-customer-form"

export function AddContactDashboard() {
    const [category, setCategory] = useState<"CUSTOMER" | "EMPLOYEE" | "VENDOR">("CUSTOMER")

    return (
        <div className="w-full flex-1 flex flex-col gap-8 items-center justify-center">
            <div className="w-full flex items-center justify-evenly gap-4">
                <Button
                    onClick={() => setCategory("EMPLOYEE")}
                    className="w-[200px] h-12"
                >
                    ADD EMPLOYEE
                </Button>
                <Button
                    onClick={() => setCategory("CUSTOMER")}
                    className="w-[200px] h-12"
                >
                    ADD CUSTOMER
                </Button>
                <Button
                    onClick={() => setCategory("VENDOR")}
                    className="w-[200px] h-12"
                >
                    ADD VENDOR
                </Button>
            </div>
            {category === "EMPLOYEE" && (
                <AddEmployeeContact />
            )}
            {category === "CUSTOMER" && (
                <AddCustomerContact />
            )}
            {category === "VENDOR" && (
                <AddVendorContact />
            )}
        </div>
    )
}


