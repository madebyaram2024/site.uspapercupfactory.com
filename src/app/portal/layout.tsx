
import { auth, signOut } from "@/../auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // If explicit /portal/login route, allow it (handled by nextjs match, but this is a layout for /portal)
    // However, layouts wrap children. If /portal/login is inside /portal, this runs.
    // We need to exclude the login page logic or structure folders carefully.
    // To be safe, let's assume /portal/login is a sibling or we handle check differently.
    // Actually, usually login is outside protected layout. 
    // BUT if I put login inside /portal folder, it shares this layout.
    // I should move login out OR add a check.
    // Let's assume for now /portal/login is the only public route under /portal.
    // But since I can't check pathname easily in RSC layout without headers(), 
    // I will MOVE login to /portal-login if needed, OR just rely on the page logic.

    // Better: Allow rendering, but the Page components themselves enforce auth? 
    // No, standard is Layout enforces. 
    // Let's use the 'group' route strategy if I could, but folders are already made.

    // WORKAROUND: Just don't enforce redirect HERE if it's the login page? 
    // Can't know. 

    // Let's move this layout logic to a ProtectedLayout component wrapper or just check user?
    // If I am NOT logged in, I usually want to serve the Login page. 
    // Use `session` to decide UI? 

    // If I am on /portal/login, I don't want to redirect to /portal/login (loop).

    // SIMPLE FIX: Only redirect if session is null AND we are not on login.
    // But I can't check URL.

    // RE-PLAN: Create `src/app/(protected)/portal/layout.tsx` and move this there?
    // Too complex for now.

    // I previously created `src/app/portal/login/page.tsx`.
    // I will make `src/app/portal/layout.tsx` ONLY render the header/container, NOT enforce auth.
    // I will enforce auth in `src/app/portal/page.tsx` and `mockups/...`.

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
            <header style={{
                backgroundColor: "white", borderBottom: "1px solid #e5e7eb", padding: "1rem 2rem",
                display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
                <Link href="/portal" style={{ fontWeight: "bold", color: "#003366", textDecoration: "none", fontSize: "1.2rem" }}>
                    USPCF Customer Portal
                </Link>
                {session?.user && (
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <span style={{ fontSize: "0.9rem", color: "#666" }}>{session.user.email}</span>
                        <form action={async () => {
                            'use server';
                            await signOut({ redirectTo: "/" });
                        }}>
                            <button type="submit" style={{
                                border: "1px solid #ddd", background: "white", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer"
                            }}>Sign Out</button>
                        </form>
                    </div>
                )}
            </header>
            <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
                {children}
            </main>
        </div>
    );
}
