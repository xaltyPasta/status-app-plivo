import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Link from "next/link";
import UserDropdown from "@/components/UserDropdown";

export default async function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body className="d-flex flex-column min-vh-100">
                {/* Navbar */}
                <nav className="navbar navbar-light bg-light px-4">
                    <Link className="navbar-brand fw-bold" href="/">
                        Status App
                    </Link>

                    {session?.user ? (
                        <UserDropdown
                            name={session.user.name}
                            email={session.user.email}
                            role={session.user.role}
                        />
                    ) : (
                        <Link href="/login" className="btn btn-sm btn-outline-primary">
                            Login
                        </Link>
                    )}
                </nav>

                {/* Content fills remaining height */}
                <main className="flex-grow-1 d-flex flex-column">
                    {children}
                </main>
            </body>
        </html>
    );
}
