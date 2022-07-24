import { prisma } from "./../config/database.js";
import { CreateUserData } from "../interfaces/userInterface.js";

async function findByEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email },
    });
}

async function findById(id: number) {
    return await prisma.user.findUnique({
        where: { id },
    });
}

async function insert(createUserData: CreateUserData) {
    return await prisma.user.create({
        data: createUserData,
    });
}

export default {
    findByEmail,
    findById,
    insert,
};
