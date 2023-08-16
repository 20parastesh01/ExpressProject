import { Express } from "express";
import request from "supertest";

export const loginAdminTest = async (app: Express) => {
    const { body: user} = await request(app)
        .post("/login")
        .send({username: "admin", password: "admin"})
        .expect(200)
    return user;
}

export const loginRepTest = async (app: Express) => {
    const {body: user} = await request(app)
        .post("/login")
        .send({username: "rep", password: "rep"})
        .expect(200)
    return user;
}