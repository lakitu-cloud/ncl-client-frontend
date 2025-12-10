// lib/queryKeys.ts or keys/managerKeys.ts
export const managerKeys = {
  all: ["managers"] as const,
  lists: () => [...managerKeys.all, "list"] as const,
  list: (filters: string) => [...managerKeys.lists(), { filters }] as const,
  byId: (id: string) => [...managerKeys.all, id] as const,
};

export const meterKeys = {
  all: ["meters"] as const,

  lists: () => [...meterKeys.all, "list"] as const,

  list: (filters: Record<string, any>) =>
    [...meterKeys.lists(), { filters }] as const,

  supplier: () => [...meterKeys.all, "supplier"] as const,

  byId: (id: string) => [...meterKeys.all, id] as const,

  byManager: (managerId: string) =>
    [...meterKeys.all, "manager", managerId] as const,
};