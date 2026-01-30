import { prisma } from "./../../lib/primsa";

export default async function StatusPage() {
  const services = await prisma.service.findMany({
    include: {
      incidents: { where: { isResolved: false } },
    },
  });

  return (
    <div className="container py-4">
      <h1 className="fw-bold mb-4">System Status</h1>

      {services.map((s) => (
        <div key={s.id} className="card p-3 mb-3">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="mb-1">{s.name}</h5>
              <p className="text-muted mb-0">{s.description}</p>
            </div>
            <span className="badge bg-secondary">{s.status}</span>
          </div>

          {s.incidents.length > 0 && (
            <div className="mt-2 text-danger small">
              Incident: {s.incidents[0].title}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
