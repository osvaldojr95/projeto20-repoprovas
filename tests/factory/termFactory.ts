import { prisma } from "../../src/config/database.js";

export async function createTerm(term: number) {
    return await prisma.term.upsert({
        where: { number: term },
        update: {},
        create: {
            number: term,
        },
    });
}
