import { NextResponse } from "next/server";
import { resolveIncident } from "@/services/incident.service";

export async function PATCH(
  _: Request,
  { params }: { params: { incidentId: string } }
) {
  const incident = await resolveIncident(params.incidentId);
  return NextResponse.json(incident);
}

