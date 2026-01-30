import { prisma } from "../lib/primsa";
import { ServiceStatus } from "@prisma/client";

/**
 * Create a new update for an incident.
 * Used for:
 * - Posting progress updates
 * - Status changes during incidents / maintenance
 */
export async function addIncidentUpdate(
  incidentId: string,
  authorId: string,
  message: string,
  status?: ServiceStatus
) {
  return prisma.incidentUpdate.create({
    data: {
      incidentId,
      authorId,
      message,
      status,
    },
  });
}

/**
 * Fetch all updates for a given incident
 * Ordered oldest → newest (timeline view)
 */
export async function getIncidentUpdates(incidentId: string) {
  return prisma.incidentUpdate.findMany({
    where: { incidentId },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
}
