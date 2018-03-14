require('dotenv').config();
const test = require('ava');
const app = require('../../server');
const request = require('supertest');

const apiSecret = process.env.API_SECRET;

test.serial('Successfully get jwt token', async (t) => {
    await request(app).post('/login')
        .send({ username: 'admin', password: 'admin' })
        .set('secret', apiSecret)
        .then(({ status, body }) => {
            t.is(status, 200);
        });
});
