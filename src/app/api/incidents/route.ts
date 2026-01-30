import { NextResponse } from "next/server";
import { createIncident } from "@/services/incident.service";

export async function POST(req: Request) {
  const { serviceId, title, description } = await req.json();
  const incident = await createIncident(serviceId, title, description);
  return NextResponse.json(incident);
}

