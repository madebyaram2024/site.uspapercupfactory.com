
'use client';

import { useTransition } from "react";
import { sendMagicLink } from "@/actions/auth-actions";

export default function PortalLoginPage() {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            try {
                await sendMagicLink(formData);
                alert("Check your email for the login link!");
            } catch (error) {
                console.error(error);
                alert("Something went wrong. Please try again.");
            }
        });
    };

    return (
        <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            minHeight: "80vh", padding: "2rem", fontFamily: "sans-serif"
        }}>
            <h1 style={{ color: "#003366", marginBottom: "1rem" }}>Customer Portal</h1>
            <p style={{ marginBottom: "2rem", color: "#666" }}>
                Enter your email to view your orders and approve items.
            </p>

            <form action={handleSubmit} style={{
                display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "400px"
            }}>
                <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    required
                    style={{
                        padding: "1rem", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1rem"
                    }}
                />
                <button
                    type="submit"
                    disabled={isPending}
                    style={{
                        padding: "1rem", borderRadius: "8px", border: "none",
                        background: isPending ? "#ccc" : "#003366", color: "white",
                        fontSize: "1rem", fontWeight: "bold", cursor: isPending ? "not-allowed" : "pointer"
                    }}
                >
                    {isPending ? "Sending Link..." : "Email Me a Login Link"}
                </button>
            </form>
        </div>
    );
}
