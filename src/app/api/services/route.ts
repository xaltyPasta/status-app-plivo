import { NextResponse } from "next/server";
import { getAllServices, createService } from "@/services/service.service";

export async function GET() {
  const services = await getAllServices();
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const { name, description } = await req.json();
  const service = await createService(name, description);
  return NextResponse.json(service);
}

