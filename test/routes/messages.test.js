const { expect } = require('chai');
const request = require('supertest');
const server = require('../../app');
const db = require('../../models');
const models = require('../../models/index')

describe('Messages', () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
        await models.message.create({
            text: 'Hello',
            title: 'World',
            createdAt: new Date(),
            updatedAt: new Date()
        });
    });

    afterAll(async () => {
        await db.sequelize.close();
    })

    describe('GET /', () => {
        test('it should return all messages', async () => {
            const response = await request(server)
                .get('/?page=1')
                .expect(200);
            expect(response.text).stringContaining('Hello');
        });
    });
});