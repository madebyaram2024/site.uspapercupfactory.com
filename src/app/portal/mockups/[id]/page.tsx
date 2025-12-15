
import { auth } from "@/../auth";
import { redirect, notFound } from "next/navigation";
import { getMockup } from "@/actions/portal";
import { MockupApproval } from "@/components/portal/MockupApproval";
import Link from "next/link";

interface Props {
    params: { id: string }
}

export default async function MockupDetailPage({ params }: Props) {
    const session = await auth();
    if (!session) redirect("/portal/login");

    const { id } = await params;
    const mockup = await getMockup(id);

    if (!mockup) notFound();

    return (
        <div>
            <div style={{ marginBottom: "2rem" }}>
                <Link href="/portal" style={{ textDecoration: "none", color: "#666", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    &larr; Back to Dashboard
                </Link>
            </div>

            <h1 style={{ marginBottom: "0.5rem", color: "#111" }}>Mockup Review</h1>
            <p style={{ color: "#666", marginBottom: "2rem" }}>
                Order #{mockup.orderId.slice(-6).toUpperCase()} | Version {mockup.version}
            </p>

            <div style={{
                background: "white", borderRadius: "8px", border: "1px solid #e5e7eb", overflow: "hidden",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }}>
                <div style={{ padding: "2rem", background: "#f8fafc", textAlign: "center" }}>
                    <img
                        src={mockup.imageUrl}
                        alt="Mockup Proof"
                        style={{ maxWidth: "100%", maxHeight: "600px", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", borderRadius: "4px" }}
                    />
                </div>

                <div style={{ padding: "2rem" }}>
                    {mockup.adminComments && (
                        <div style={{ marginBottom: "2rem", padding: "1rem", background: "#eff6ff", borderLeft: "4px solid #3b82f6", borderRadius: "4px" }}>
                            <strong style={{ display: "block", color: "#1e40af", marginBottom: "0.5rem" }}>Message from Designer:</strong>
                            <p style={{ margin: 0, color: "#1e3a8a" }}>{mockup.adminComments}</p>
                        </div>
                    )}

                    <MockupApproval
                        mockupId={mockup.id}
                        initialStatus={mockup.status}
                        existingComment={mockup.userComments}
                    />
                </div>
            </div>
        </div>
    );
}
