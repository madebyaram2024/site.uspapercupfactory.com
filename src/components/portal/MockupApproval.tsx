
'use client';

import { useState, useTransition } from "react";
import { updateMockupStatus } from "@/actions/portal";
import { useRouter } from "next/navigation";

interface MockupApprovalProps {
    mockupId: string;
    initialStatus: string;
    existingComment?: string | null;
}

export function MockupApproval({ mockupId, initialStatus, existingComment }: MockupApprovalProps) {
    const [status, setStatus] = useState(initialStatus);
    const [isPending, startTransition] = useTransition();
    const [showRejectForm, setShowRejectForm] = useState(false);
    const [comment, setComment] = useState(existingComment || "");
    const router = useRouter();

    const handleApprove = () => {
        if (!confirm("Are you sure you want to approve this mockup? It will be sent to production instantly.")) return;
        startTransition(async () => {
            try {
                await updateMockupStatus(mockupId, "APPROVED");
                setStatus("APPROVED");
                router.refresh();
            } catch (error) {
                alert("Failed to update status.");
            }
        });
    };

    const handleReject = () => {
        if (!comment.trim()) {
            alert("Please provide feedback on what needs to change.");
            return;
        }
        startTransition(async () => {
            try {
                await updateMockupStatus(mockupId, "CHANGES_REQUESTED", comment);
                setStatus("CHANGES_REQUESTED");
                setShowRejectForm(false);
                router.refresh();
            } catch (error) {
                alert("Failed to send feedback.");
            }
        });
    };

    if (status === "APPROVED") {
        return (
            <div style={{ padding: "1rem", background: "#def7ec", color: "#03543f", borderRadius: "8px", textAlign: "center", border: "1px solid #bcf0da" }}>
                <h3 style={{ margin: 0 }}>✅ Approved for Production</h3>
                <p>This mockup has been approved. You will hear from us soon regarding shipping.</p>
            </div>
        );
    }

    return (
        <div style={{ marginTop: "2rem" }}>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                {!showRejectForm && (
                    <>
                        <button
                            onClick={handleApprove}
                            disabled={isPending}
                            style={{
                                padding: "1rem 2rem", background: "#0e9f6e", color: "white", border: "none", borderRadius: "8px",
                                fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer", opacity: isPending ? 0.7 : 1
                            }}
                        >
                            {isPending ? "Processing..." : "Approve Design"}
                        </button>
                        <button
                            onClick={() => setShowRejectForm(true)}
                            disabled={isPending}
                            style={{
                                padding: "1rem 2rem", background: "white", color: "#c81e1e", border: "1px solid #c81e1e", borderRadius: "8px",
                                fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer", opacity: isPending ? 0.7 : 1
                            }}
                        >
                            Request Changes
                        </button>
                    </>
                )}
            </div>

            {(showRejectForm || status === "CHANGES_REQUESTED") && (
                <div style={{ marginTop: "1.5rem", padding: "1.5rem", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                    <h4 style={{ marginTop: 0 }}>What would you like to change?</h4>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="e.g. Please make the logo 20% bigger and move it up..."
                        disabled={status === "CHANGES_REQUESTED"}
                        style={{ width: "100%", height: "100px", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "1rem" }}
                    />
                    {status !== "CHANGES_REQUESTED" && (
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <button
                                onClick={handleReject}
                                disabled={isPending}
                                style={{
                                    padding: "0.5rem 1rem", background: "#c81e1e", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer"
                                }}
                            >
                                {isPending ? "Sending..." : "Submit Feedback"}
                            </button>
                            <button
                                onClick={() => setShowRejectForm(false)}
                                style={{
                                    padding: "0.5rem 1rem", background: "transparent", color: "#555", border: "none", cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                    {status === "CHANGES_REQUESTED" && (
                        <div style={{ color: "#c81e1e", fontWeight: "bold" }}>Changes have been requested. We will upload a new version shortly.</div>
                    )}
                </div>
            )}
        </div>
    );
}
