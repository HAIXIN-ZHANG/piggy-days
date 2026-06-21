import { prisma } from "@piggy-days/database";

export const builtInHouseholdUsers = [
  {
    id: "me",
    name: "me",
    displayName: "Me",
    avatarLabel: "Me",
    sortOrder: 1
  },
  {
    id: "wife",
    name: "wife",
    displayName: "Piggy",
    avatarLabel: "Piggy",
    sortOrder: 2
  }
] as const;

export async function ensureHouseholdUsers() {
  await Promise.all(
    builtInHouseholdUsers.map((user) =>
      prisma.householdUser.upsert({
        where: {
          id: user.id
        },
        create: user,
        update: {
          name: user.name,
          displayName: user.displayName,
          avatarLabel: user.avatarLabel,
          sortOrder: user.sortOrder
        }
      })
    )
  );
}

export async function listHouseholdUsers() {
  await ensureHouseholdUsers();

  return prisma.householdUser.findMany({
    orderBy: {
      sortOrder: "asc"
    }
  });
}
