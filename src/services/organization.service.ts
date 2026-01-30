import { prisma } from "../lib/primsa";

export async function createOrganization(
  userId: string,
  name: string,
  slug: string
) {
  return prisma.organization.create({
    data: {
      name,
      slug,
      members: {
        create: {
          userId,
          role: "OWNER",
        },
      },
    },
  });
}

export async function getUserOrganizations(userId: string) {
  return prisma.organization.findMany({
    where: {
      members: {
        some: { userId },
      },
    },
  });
}

