import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { addIncidentUpdate } from "@/services/incidentUpdate.service";

export async function POST(
  req: Request,
  { params }: { params: { incidentId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const { message, status } = await req.json();

  const update = await addIncidentUpdate(
    params.incidentId,
    session.user.id,
    message,
    status
  );

  return NextResponse.json(update);
}

