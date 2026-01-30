"use client";

import { useEffect, useState } from "react";

type Incident = {
    id: string;
    title: string;
    description?: string;
    isResolved: boolean;
};

export default function IncidentsPage() {
    const [incidents, setIncidents] = useState<Incident[]>([]);

    useEffect(() => {
        fetch("/api/incidents")
            .then((res) => res.json())
            .then(setIncidents);
    }, []);

    async function resolveIncident(id: string) {
        const res = await fetch(`/api/incidents/${id}`, {
            method: "PATCH",
        });
        const updated = await res.json();

        setIncidents((i) =>
            i.map((inc) => (inc.id === id ? updated : inc))
        );
    }

    async function addUpdate(id: string) {
        const message = prompt("Update message?");
        if (!message) return;

        await fetch(`/api/incidents/${id}/updates`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        alert("Update added");
    }

    return (
        <>
            <h2 className="fw-bold mb-4">Incidents</h2>

            {incidents.map((i) => (
                <div key={i.id} className="card p-3 mb-3">
                    <h5>{i.title}</h5>
                    <p className="text-muted">{i.description}</p>

                    {!i.isResolved ? (
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-sm btn-success"
                                onClick={() => resolveIncident(i.id)}
                            >
                                Resolve
                            </button>
                            <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => addUpdate(i.id)}
                            >
                                Add Update
                            </button>
                        </div>
                    ) : (
                        <span className="badge bg-success">Resolved</span>
                    )}
                </div>
            ))}
        </>
    );
}
