import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/primsa";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ orgId: string }> }
) {
  try {
    const { orgId } = await context.params;

    const incidents = await prisma.incident.findMany({
      where: {
        service: {
          organizationId: orgId,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(incidents);
  } catch (err) {
    console.error("Fetch incidents error:", err);
    return NextResponse.json([], { status: 500 });
  }
}
