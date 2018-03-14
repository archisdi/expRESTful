require('dotenv').config();
const test = require('ava');
const app = require('../../server');
const request = require('supertest');

const apiSecret = process.env.API_SECRET;

test.serial('return 200 with jwt token', async (t) => {
    await request(app).post('/login')
        .send({ username: 'admin', password: 'admin' })
        .set('secret', apiSecret)
        .then(({ status, body }) => {
            t.is(status, 200);
        });
});

test.serial('return 401 if no api key provided', async (t) => {
    await request(app).post('/login')
        .send({ username: 'admin', password: 'admin' })
        .then(({ status, body }) => {
            t.is(status, 401);
        });
});

test.serial('return 401 if credentials not match', async (t) => {
    await request(app).post('/login')
        .send({ username: 'admin2', password: 'admin2' })
        .set('secret', apiSecret)
        .then(({ status, body }) => {
            t.is(status, 401);
        });
});
