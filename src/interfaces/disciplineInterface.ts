import { Discipline } from "@prisma/client";

export type CreateDisciplineData = Omit<Discipline, "id">;
