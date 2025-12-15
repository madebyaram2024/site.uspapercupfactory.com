
import { requireAdmin } from "@/lib/admin";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireAdmin();
    console.log("Admin Layout Accessed");

    return (
        <div style={{ display: 'flex' }}>
            <AdminSidebar />
            <div style={{ marginLeft: '250px', width: 'calc(100% - 250px)', padding: '2rem', minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
                {children}
            </div>
        </div>
    );
}
