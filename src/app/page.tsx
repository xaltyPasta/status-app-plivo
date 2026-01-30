import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="container py-5">
      <h1 className="fw-bold mb-3">Status Page</h1>

      <p className="text-muted">
        Public service health dashboard
      </p>

      {session ? (
        <div className="mt-4">
          <p className="mb-3">
            Logged in as <strong>{session.user.email}</strong>
          </p>

          <form action="/api/auth/signout" method="post">
            <button className="btn btn-danger">
              Logout
            </button>
          </form>
        </div>
      ) : (
        <Link href="/login" className="btn btn-primary mt-3">
          Login with Google
        </Link>
      )}
    </main>
  );
}
