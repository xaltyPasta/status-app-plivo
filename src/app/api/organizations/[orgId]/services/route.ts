import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import {
  getServicesByOrganization,
  createService,
} from "@/services/service.service";

export async function GET(
  _: Request,
  { params }: { params: { orgId: string } }
) {
  const services = await getServicesByOrganization(params.orgId);
  return NextResponse.json(services);
}

export async function POST(
  req: Request,
  { params }: { params: { orgId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const { name, description } = await req.json();
  const service = await createService(params.orgId, name, description);

  return NextResponse.json(service);
}

