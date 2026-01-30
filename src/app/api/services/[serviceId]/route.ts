import { NextRequest, NextResponse } from "next/server";
import { updateService, deleteService } from "@/services/service.service";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ serviceId: string }> }
) {
  try {
    const { serviceId } = await context.params;
    const data = await req.json();

    const service = await updateService(serviceId, data);
    return NextResponse.json(service);
  } catch (err) {
    console.error("Update service error:", err);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ serviceId: string }> }
) {
  try {
    const { serviceId } = await context.params;

    await deleteService(serviceId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete service error:", err);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
