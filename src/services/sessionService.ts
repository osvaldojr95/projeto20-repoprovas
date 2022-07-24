import { v4 as uuid } from "uuid";
import { User } from "@prisma/client";
import { CreateSessionData } from "../interfaces/sessionInterface.js";
import sessionRepository from "../repository/sessionRepository.js";

async function newSession(user: User) {
    const sessionExist = await sessionRepository.findByUserId(user.id);
    if (sessionExist) await sessionRepository.remove(sessionExist.id);

    const sessionId = uuid();
    const session: CreateSessionData = {
        userId: user.id,
        session: sessionId,
    };
    await sessionRepository.insert(session);
    return sessionId;
}

export default {
    newSession,
};
