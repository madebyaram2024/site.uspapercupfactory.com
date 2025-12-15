
'use server';

import { signIn } from "@/../auth";

export async function sendMagicLink(formData: FormData) {
    const email = formData.get("email") as string;

    if (!email) throw new Error("Email is required");

    await signIn("resend", {
        email,
        redirect: true,
        redirectTo: "/portal"
    });
}
