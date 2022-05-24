const models = require('../models/index')

class MessageController {
    constructor() {}

    async createMessage(title, text)  {
        if (!title || title == '') {
            return {
                error: 'Title is required'
            }
        }

        if (!text || text == '') {
            return {
                error: 'Text is required'
            }
        }

        try {
            const message = await models.message.create({
                title,
                text
            })
            return message
        } catch (error) {
            console.log(error)
            return {error: error}
        }
    }

    async getMessages(page) {
        try {
            const pageSize = 10;
            const skip = (Number(page) - 1) * pageSize;
            let messageCount = await models.message.count();
            if (messageCount === 0) {
                return {
                    error: 'No messages found'
                }
            }
            if (page > Math.ceil(messageCount / pageSize)) {
                return {
                    error: 'Page not found'
                }
            }
            if (messageCount > 0) {
                const messages = await models.message.findAll({offset: skip, limit: pageSize, order: [['createdAt', 'DESC']]})
                return {
                    messageStart: (Number(page) -1 ) * pageSize + 1,
                    messageEnd: Number(page) * pageSize > messageCount ? messageCount : Number(page) * pageSize,
                    messageCount, 
                    skip,
                    messages, 
                }
            }
        } catch (error) {
            console.log(error)
            return {error: error}
        }
    }

    async viewMessage(id) {
        try {
            const message = await models.message.findByPk(id)
            if (!message) {
                return {
                    error: 'Message not found'
                }
            }
            
            message.destroy();
            return message
        } catch (error) {
            console.log(error)
            return {error: error}
        }
    }

}

module.exports = MessageController