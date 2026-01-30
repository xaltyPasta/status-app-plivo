import { prisma } from "@/lib/db/prisma";

export function createIncident(
  serviceId: string,
  title: string,
  description?: string
) {
  return prisma.incident.create({
    data: {
      serviceId,
      title,
      description,
    },
  });
}

export function resolveIncident(incidentId: string) {
  return prisma.incident.update({
    where: { id: incidentId },
    data: { isResolved: true },
  });
}

