"use client";

import { useEffect, useState } from "react";
import { ServiceStatus } from "@prisma/client";

// 🔴 TEMP – replace with org selector later
const ORG_ID = "TEMP_ORG_ID";

type Service = {
    id: string;
    name: string;
    description?: string;
    status: ServiceStatus;
};

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    /* =========================
       FETCH SERVICES
       ========================= */
    useEffect(() => {
        fetch(`/api/organizations/${ORG_ID}/services`)
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || "Failed to fetch services");
                }
                return res.json();
            })
            .then(setServices)
            .catch((err) => {
                console.error("Fetch services error:", err);
                setServices([]);
            });
    }, []);

    /* =========================
       CREATE SERVICE
       ========================= */
    async function createService() {
        if (!name.trim()) return alert("Service name is required");

        setLoading(true);

        const res = await fetch(`/api/organizations/${ORG_ID}/services`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description }),
        });

        setLoading(false);

        if (!res.ok) {
            const text = await res.text();
            alert(text || "Failed to create service");
            return;
        }

        const service = await res.json();
        setServices((s) => [...s, service]);
        setName("");
        setDescription("");
    }

    /* =========================
       UPDATE STATUS
       ========================= */
    async function updateStatus(id: string, status: ServiceStatus) {
        const res = await fetch(`/api/services/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });

        if (!res.ok) {
            alert("Failed to update service status");
            return;
        }

        const updated = await res.json();
        setServices((s) =>
            s.map((svc) => (svc.id === id ? updated : svc))
        );
    }

    /* =========================
       CREATE INCIDENT
       ========================= */
    async function createIncident(serviceId: string) {
        const title = prompt("Incident title?");
        if (!title) return;

        const res = await fetch("/api/incidents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ serviceId, title }),
        });

        if (!res.ok) {
            alert("Failed to create incident");
            return;
        }

        alert("Incident created");
    }

    return (
        <>
            <h2 className="fw-bold mb-4">Services</h2>

            {/* Create Service */}
            <div className="card p-3 mb-4">
                <input
                    className="form-control mb-2"
                    placeholder="Service name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    className="form-control mb-2"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button
                    className="btn btn-primary"
                    onClick={createService}
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Service"}
                </button>
            </div>

            {/* Service List */}
            {services.map((s) => (
                <div key={s.id} className="card p-3 mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-1">{s.name}</h5>
                            <p className="text-muted mb-0">{s.description}</p>
                        </div>

                        <select
                            className="form-select w-auto"
                            value={s.status}
                            onChange={(e) =>
                                updateStatus(s.id, e.target.value as ServiceStatus)
                            }
                        >
                            {Object.values(ServiceStatus).map((st) => (
                                <option key={st} value={st}>
                                    {st}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="btn btn-sm btn-outline-danger mt-2"
                        onClick={() => createIncident(s.id)}
                    >
                        Create Incident
                    </button>
                </div>
            ))}
        </>
    );
}
