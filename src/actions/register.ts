
'use server';

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function register(values: any) {
    const { email, password, name } = values;

    if (!email || !password || !name) {
        return { error: "Missing fields" };
    }

    const existingUser = await db.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        return { error: "Email already in use!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    return { success: "User created!" };
}
