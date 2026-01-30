import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { addIncidentUpdate } from "@/services/incidentUpdate.service";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ incidentId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { incidentId } = await context.params;
  const { message, status } = await req.json();

  if (!message) {
    return NextResponse.json(
      { error: "Message is required" },
      { status: 400 }
    );
  }

  const update = await addIncidentUpdate(
    incidentId,
    session.user.id,
    message,
    status
  );

  return NextResponse.json(update);
}
