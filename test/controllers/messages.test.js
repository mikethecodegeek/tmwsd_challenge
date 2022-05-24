const { expect } = require('chai');
const { lstat } = require('fs');
const MessageController = require('../../controllers/messages');
const db = require('../../models/index');

describe('Messages', () => {
    let testMessage;
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    beforeEach(() => {
        testMessage = new MessageController();
    });

    afterEach(async () => {
        await db.message.destroy({ where: {} });
    });

    afterAll(async () => {
        await db.sequelize.close();
    });

    describe('createMessage', () => {
        test('it should create a message', async () => {
            try {
                const beforeMessageCount = await db.message.count();
                expect(beforeMessageCount).to.equal(0);
    
                const message = await testMessage.createMessage('Hello', 'World');
     
                expect(message.title).to.equal('Hello');
                expect(message.text).to.equal('World');
    
                const afterMessageCount = await db.message.count();
                expect(afterMessageCount).to.equal(1);
    
                const messageFromDb = await db.message.findByPk(message.id);
                expect(messageFromDb.title).to.equal('Hello');
                expect(messageFromDb.text).to.equal('World');

            } catch (error) {
                console.log(error);
            }
        });

        test('it should not create a message if title is missing', async () => {
            const beforeMessageCount = await db.message.count();
            expect(beforeMessageCount).to.equal(0);

            const message = await testMessage.createMessage('', 'World');
            expect(message.error).to.equal('Title is required');

            const afterMessageCount = await db.message.count();
            expect(afterMessageCount).to.equal(0);
        });

        test('it should not create a message if text is missing', async () => {
            const beforeMessageCount = await db.message.count();
            expect(beforeMessageCount).to.equal(0);

            const message = await testMessage.createMessage('Hello', '');
            expect(message.error).to.equal('Text is required');

            const afterMessageCount = await db.message.count();
            expect(afterMessageCount).to.equal(0);
        });
    });

    describe('getMessages', () => {
        test('it should return all messages', async () => {
            const message1 = await db.message.create({
                title: 'Hello',
                text: 'World'
            });

            const message2 = await db.message.create({
                title: 'Hello',
                text: 'World'
            });

            const allMessages = await testMessage.getMessages(1);
            expect(allMessages.messages.length).to.equal(2);
            expect(allMessages.messageStart).to.equal(1);
            expect(allMessages.messageEnd).to.equal(2);
            expect(allMessages.messageCount).to.equal(2);
            expect(allMessages.skip).to.equal(0);  
        });
        test('it should return page not found if page is greater than number of pages', async () => {
            const message1 = await db.message.create({
                title: 'Hello',
                text: 'World'
            });

            const message2 = await db.message.create({
                title: 'Hello',
                text: 'World'
            });

            const allMessages = await testMessage.getMessages(3);
            expect(allMessages.error).to.equal('Page not found');
        });
        test('it should return no messages if there are no messages', async () => {
            const allMessages = await testMessage.getMessages(1);
            expect(allMessages.error).to.equal('No messages found');
        });
    });
    describe('viewMessage', () => {
        test('it should return a message', async () => {
            const message = await db.message.create({
                title: 'Hello',
                text: 'World'
            });

            const messageFromDb = await testMessage.viewMessage(message.id);
            expect(messageFromDb.title).to.equal('Hello');
            expect(messageFromDb.text).to.equal('World');
        });
        test('it should return page not found if message does not exist', async () => {
            const messageFromDb = await testMessage.viewMessage(1);
            expect(messageFromDb.error).to.equal('Message not found');
        });
    });
});