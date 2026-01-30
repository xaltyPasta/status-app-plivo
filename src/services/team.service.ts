import { prisma } from "@/lib/db/prisma";
import { OrgRole } from "@prisma/client";

export function getOrganizationMembers(orgId: string) {
  return prisma.organizationMember.findMany({
    where: { organizationId: orgId },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });
}

export function addMemberToOrganization(
  orgId: string,
  userId: string,
  role: OrgRole
) {
  return prisma.organizationMember.create({
    data: {
      organizationId: orgId,
      userId,
      role,
    },
  });
}

