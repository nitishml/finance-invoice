import { db } from "@/db/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { financialAccount, transaction } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { addTransactionApiSchema } from "@/features/accounting/types";
import { asc, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const debitAccount = alias(financialAccount, "debitAccount");
        const creditAccount = alias(financialAccount, "creditAccount");

        const rows = await db
            .select({
                id: transaction.id,
                debitAccountId: transaction.debitAccountId,
                creditAccountId: transaction.creditAccountId,
                transactionNumber: transaction.transactionNumber,
                transactionSerial: transaction.transactionSerial,
                amount: transaction.amount,
                transactionDate: transaction.transactionDate,
                description: transaction.description,

                debitAccount: debitAccount.title,
                creditAccount: creditAccount.title,
            })
            .from(transaction)
            .innerJoin(debitAccount, eq(debitAccount.id, transaction.debitAccountId))
            .innerJoin(creditAccount, eq(creditAccount.id, transaction.creditAccountId))
            .orderBy(asc(transaction.transactionSerial));
        return NextResponse.json(
            {
                success: true,
                data: rows,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching financial accounts: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const body = await request.json();
        const validatedData = addTransactionApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const values = validatedData.data

        const [newTransaction] = await db
            .insert(transaction)
            .values({
                debitAccountId: values.debitAccountId,
                creditAccountId: values.creditAccountId,
                handledBy: session.userId,
                amount: values.amount * 100,
                transactionNumber: values.transactionNumber,
                transactionSerial: values.transactionSerial,
                transactionDate: values.transactionDate,
                description: values.description,
            })
            .returning({
                id: financialAccount.id
            })

        if (!newTransaction) return NextResponse.json({
            success: false,
            message: "Transaction Addition Failed",
            data: null,
        }, { status: 404 });


        return NextResponse.json(
            {
                success: true,
                message: "Transaction Added Successfully",
                data: {
                    id: newTransaction.id,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error creating new transaction: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}