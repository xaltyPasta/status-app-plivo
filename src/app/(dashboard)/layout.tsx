import { ReactNode } from "react";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <aside className="col-12 col-md-3 col-lg-2 bg-light p-3">
                    <h6 className="fw-bold mb-3">Dashboard</h6>
                    <ul className="nav flex-column gap-2">
                        <li>
                            <Link href="/services" className="nav-link p-0">
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link href="/incidents" className="nav-link p-0">
                                Incidents
                            </Link>
                        </li>
                        <li>
                            <Link href="/status" className="nav-link p-0">
                                Public Status
                            </Link>
                        </li>
                    </ul>
                </aside>

                {/* Content */}
                <main className="col-12 col-md-9 col-lg-10 p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}
