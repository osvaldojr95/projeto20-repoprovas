import app from "../src/index.js";
import supertest from "supertest";
import { prisma } from "../src/config/database.js";
import { createUser } from "./factory/userFactory.js";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
});

describe("POST /signup", () => {
    it("Criando conta", async () => {
        const body = { email: "yv@email.com", password: "123" };

        const createdUser = await supertest(app).post("/signup").send(body);
        expect(createdUser.status).toEqual(201);
    });

    it("Email já existente", async () => {
        await createUser("yv@email.com", "123");

        const body = { email: "yv@email.com", password: "123" };
        const tryCreate = await supertest(app).post("/signup").send(body);
        expect(tryCreate.status).toEqual(409);
    });

    it("Criando conta com body errado", async () => {
        await createUser("yv@email.com", "123");

        const body = { email: "yv@email.com" };
        const tryCreate = await supertest(app).post("/signup").send(body);
        expect(tryCreate.status).toEqual(422);
    });
});

describe("POST /signin", () => {
    it("Fazendo login", async () => {
        await createUser("yv@email.com", "123");
        const body = { email: "yv@email.com", password: "123" };
        const Login = await supertest(app).post("/signin").send(body);
        expect(Login.status).toEqual(200);
    });

    it("Senha incorreta", async () => {
        await createUser("yv@email.com", "123");
        const body = { email: "yv@email.com", password: "1234" };
        const tryLogin = await supertest(app).post("/signin").send(body);
        expect(tryLogin.status).toEqual(401);
    });

    it("Email inexistente", async () => {
        const body = { email: "yv@email.com", password: "123" };
        const tryLogin = await supertest(app).post("/signin").send(body);
        expect(tryLogin.status).toEqual(404);
    });

    it("Login com body errado", async () => {
        const body = { email: "yv2@email.com" };
        const tryLogin = await supertest(app).post("/signin").send(body);
        expect(tryLogin.status).toEqual(422);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});
