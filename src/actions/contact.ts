
'use server';

import { db } from "@/lib/db";

export async function submitContact(values: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    const { name, email, phone, message } = values;

    if (!name || !email || !message) {
        return { error: "Missing fields" };
    }

    try {
        await db.contactSubmission.create({
            data: {
                name,
                email,
                phone,
                message,
            }
        });
        return { success: "Message sent!" };
    } catch (err) {
        console.error(err);
        return { error: "Failed to send." };
    }
}
