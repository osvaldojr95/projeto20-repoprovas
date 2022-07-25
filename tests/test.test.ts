import { faker } from "@faker-js/faker";
import app from "../src/index.js";
import supertest from "supertest";
import { prisma } from "../src/config/database.js";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE tests;`;
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
});

describe("GET /test/discipline", () => {
    it("Buscando testes por disciplina", async () => {
        const user = {
            email: faker.internet.email.toString(),
            password: faker.internet.password.toString(),
        };
        const createUser = await supertest(app).post("/signup").send(user);
        setTimeout(() => {}, 500);
        const login = await supertest(app).post("/signin").send(user);

        const search = await supertest(app)
            .get("/test/discipline")
            .set("Authorization", login.text);
        expect(search.status).toEqual(200);
    });

    it("Buscando testes sem token", async () => {
        const search = await supertest(app)
            .get("/test/discipline")
            .set("Authorization", "");
        expect(search.status).toEqual(401);
    });
});

describe("GET /test/teacher", () => {
    it("Buscando testes por professor", async () => {
        const user = {
            email: faker.internet.email.toString(),
            password: faker.internet.password.toString(),
        };
        await supertest(app).post("/signup").send(user);
        setTimeout(() => {}, 500);
        const login = await supertest(app).post("/signin").send(user);

        const search = await supertest(app)
            .get("/test/teacher")
            .set("Authorization", login.text);
        expect(search.status).toEqual(200);
    });

    it("Buscando testes sem token", async () => {
        const search = await supertest(app)
            .get("/test/teacher")
            .set("Authorization", "");
        expect(search.status).toEqual(401);
    });
});

describe("POST /test", () => {
    it("Inserindo novo test", async () => {
        const user = {
            email: faker.internet.email.toString(),
            password: faker.internet.password.toString(),
        };
        await supertest(app).post("/signup").send(user);
        const login = await supertest(app).post("/signin").send(user);

        const body = {
            name: "provaNum1",
            pdfUrl: faker.internet.url(),
            category: 1,
            discipline: 1,
            teacher: 1,
        };

        const createdTest = await supertest(app)
            .post("/test")
            .send(body)
            .set("Authorization", login.text);
        expect(createdTest.status).toEqual(201);
    });

    it("Inserindo novo test sem token", async () => {
        const body = {
            name: "provaNum1",
            pdfUrl: faker.internet.url(),
            category: 1,
            discipline: 1,
            teacher: 1,
        };

        const createdTest = await supertest(app)
            .post("/test")
            .send(body)
            .set("Authorization", "");
        expect(createdTest.status).toEqual(401);
    });

    it("Test com categoria inexistente", async () => {
        const user = {
            email: faker.internet.email.toString(),
            password: faker.internet.password.toString(),
        };
        await supertest(app).post("/signup").send(user);
        const login = await supertest(app).post("/signin").send(user);

        const body = {
            name: "provaNum1",
            pdfUrl: faker.internet.url(),
            category: 9,
            discipline: 1,
            teacher: 1,
        };

        const createdTest = await supertest(app)
            .post("/test")
            .send(body)
            .set("Authorization", login.text);
        expect(createdTest.status).toEqual(404);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});
