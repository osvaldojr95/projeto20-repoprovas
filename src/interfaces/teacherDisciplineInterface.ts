import { TeacherDiscipline } from "@prisma/client";

export type CreateTeacherDisciplineData = Omit<TeacherDiscipline, "id">;
