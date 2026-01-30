import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/primsa";

export async function GET(
  _: Request,
  { params }: { params: { orgId: string } }
) {
  try {
    const incidents = await prisma.incident.findMany({
      where: {
        service: {
          organizationId: params.orgId,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(incidents);
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 500 });
  }
}
