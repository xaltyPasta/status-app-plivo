import { NextResponse } from "next/server";
import { updateService, deleteService } from "@/services/service.service";

export async function PATCH(
  req: Request,
  { params }: { params: { serviceId: string } }
) {
  const data = await req.json();
  const service = await updateService(params.serviceId, data);
  return NextResponse.json(service);
}

export async function DELETE(
  _: Request,
  { params }: { params: { serviceId: string } }
) {
  await deleteService(params.serviceId);
  return NextResponse.json({ success: true });
}
