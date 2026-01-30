import { prisma } from "../lib/primsa";
import { ServiceStatus } from "@prisma/client";

export function getServicesByOrganization(organizationId: string) {
  return prisma.service.findMany({
    where: { organizationId },
    include: {
      incidents: {
        where: { isResolved: false },
      },
    },
    orderBy: { createdAt: "asc" },
  });
}

export function createService(
  organizationId: string,
  name: string,
  description?: string
) {
  return prisma.service.create({
    data: {
      organizationId,
      name,
      description,
    },
  });
}

export function updateService(
  serviceId: string,
  data: {
    name?: string;
    description?: string;
    status?: ServiceStatus;
  }
) {
  return prisma.service.update({
    where: { id: serviceId },
    data,
  });
}

export function deleteService(serviceId: string) {
  return prisma.service.delete({
    where: { id: serviceId },
  });
}

