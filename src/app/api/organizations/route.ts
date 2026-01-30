import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { createOrganization, getUserOrganizations } from "@/services/organization.service";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json([], { status: 401 });

  const orgs = await getUserOrganizations(session.user.id);
  return NextResponse.json(orgs);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const { name, slug } = await req.json();
  const org = await createOrganization(session.user.id, name, slug);

  return NextResponse.json(org);
}

