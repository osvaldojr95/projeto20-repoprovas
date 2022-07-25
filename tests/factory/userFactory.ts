import { prisma } from "../../src/config/database.js";
import { CreateUserData } from "../../src/interfaces/userInterface.js";
import bcrypt from "bcrypt";

export async function createUser(email: string, password: string) {
    const passwordHash: string = bcrypt.hashSync(password, +process.env.SALT);
    const user: CreateUserData = { email, password: passwordHash };

    const insertedUser = await prisma.user.create({
        data: user,
    });

    return insertedUser;
}