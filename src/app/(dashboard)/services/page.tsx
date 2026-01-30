"use client";

import { useEffect, useState } from "react";
import { ServiceStatus } from "@prisma/client";

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

    useEffect(() => {
        fetch("/api/services")
            .then((res) => res.json())
            .then(setServices);
    }, []);

    async function createService() {
        const res = await fetch("/api/services", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description }),
        });
        const service = await res.json();
        setServices((s) => [...s, service]);
        setName("");
        setDescription("");
    }

    async function updateStatus(id: string, status: ServiceStatus) {
        const res = await fetch(`/api/services/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        const updated = await res.json();
        setServices((s) =>
            s.map((svc) => (svc.id === id ? updated : svc))
        );
    }

    async function createIncident(serviceId: string) {
        const title = prompt("Incident title?");
        if (!title) return;

        await fetch("/api/incidents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ serviceId, title }),
        });

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
                <button className="btn btn-primary" onClick={createService}>
                    Create Service
                </button>
            </div>

            {/* Service List */}
            {services.map((s) => (
                <div key={s.id} className="card p-3 mb-3">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5>{s.name}</h5>
                            <p className="text-muted">{s.description}</p>
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
