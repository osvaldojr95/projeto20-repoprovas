import { Session } from "@prisma/client";

export type CreateSessionData = Omit<Session, "id">;
