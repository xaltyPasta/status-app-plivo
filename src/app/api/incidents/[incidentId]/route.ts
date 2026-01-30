import { NextRequest, NextResponse } from "next/server";
import { resolveIncident } from "@/services/incident.service";

export async function PATCH(
  _req: NextRequest,
  context: { params: Promise<{ incidentId: string }> }
) {
  const { incidentId } = await context.params;

  const incident = await resolveIncident(incidentId);
  return NextResponse.json(incident);
}
