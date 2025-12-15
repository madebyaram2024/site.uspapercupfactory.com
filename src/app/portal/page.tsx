
import { auth } from "@/../auth";
import { redirect } from "next/navigation";
import { getUserOrders } from "@/actions/portal";
import Link from "next/link";

export default async function PortalDashboard() {
    const session = await auth();
    if (!session) redirect("/portal/login");

    const orders = await getUserOrders();

    return (
        <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "2rem", color: "#111" }}>Your Orders</h1>

            {orders.length === 0 ? (
                <div style={{ padding: "3rem", background: "white", borderRadius: "8px", textAlign: "center", color: "#666", border: "1px solid #eee" }}>
                    No orders found.
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {orders.map((order) => (
                        <div key={order.id} style={{
                            background: "white", borderRadius: "8px", border: "1px solid #e5e7eb", padding: "1.5rem",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", borderBottom: "1px solid #f0f0f0", paddingBottom: "1rem" }}>
                                <div>
                                    <span style={{ fontWeight: "bold", color: "#333" }}>Order #{order.id.slice(-6).toUpperCase()}</span>
                                    <span style={{ marginLeft: "1rem", fontSize: "0.9rem", color: "#666" }}>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div>
                                    <span style={{
                                        background: order.status === "PAID" ? "#def7ec" : "#fde8e8",
                                        color: order.status === "PAID" ? "#03543f" : "#9b1c1c",
                                        padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "bold"
                                    }}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div style={{ marginBottom: "1rem" }}>
                                <strong>Details:</strong> <br />
                                <span style={{ color: "#555" }}>{order.details || "No details provided"}</span>
                            </div>

                            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "#003366" }}>Mockups & Proofs</h3>
                            {order.mockups.length > 0 ? (
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
                                    {order.mockups.map(mock => (
                                        <div key={mock.id} style={{ border: "1px solid #eee", borderRadius: "6px", overflow: "hidden" }}>
                                            <div style={{ height: "150px", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                {/* Placeholder or Image */}
                                                <img src={mock.imageUrl || "/images/placeholder.png"} alt="Mockup" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                                            </div>
                                            <div style={{ padding: "1rem" }}>
                                                <div style={{
                                                    display: "inline-block", marginBottom: "0.5rem",
                                                    fontSize: "0.75rem", fontWeight: "bold", padding: "2px 6px", borderRadius: "4px",
                                                    background: mock.status === "APPROVED" ? "#def7ec" : mock.status === "PENDING_REVIEW" ? "#fef3c7" : "#e0e0e0",
                                                    color: mock.status === "APPROVED" ? "#03543f" : mock.status === "PENDING_REVIEW" ? "#92400e" : "#333"
                                                }}>
                                                    {mock.status.replace("_", " ")}
                                                </div>
                                                <Link href={`/portal/mockups/${mock.id}`} style={{ display: "block", textAlign: "center", background: "#003366", color: "white", padding: "0.5rem", borderRadius: "4px", textDecoration: "none", fontSize: "0.9rem" }}>
                                                    View & Approve
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: "#888", fontStyle: "italic" }}>No mockups available yet.</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
