const Message = require('../models/message');

class MessageController {
    async connection() {

    }


    // [GET] all connection
    show() {
        
    }

    // [GET] message by replyer
    async getMessageByRecepient(req, res) {
        try {
            const { senderId, recepientId } = req.params;
            console.log('getMsg: ', req.params);
            const messages = await Message.find({
              $or: [
                { senderId: senderId, recepientId: recepientId },
                { senderId: recepientId, recepientId: senderId },
              ],
            }).populate("senderId", "_id name");
        
            console.log('message: ', messages);
            res.json(messages);
          } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }
    
    async chat(req, res) {
      try{
        console.log('req, ', req.body);
        const { senderId, recepientId, messageType, messageText } = req.body;
        const newMessage = new Message({
          senderId,
          recepientId,
          messageType,
          message: messageText,
          timestamp: new Date(),
          imageUrl: messageType === "image" ? req.file.path : null,
        });
        
        await newMessage.save();
        res.status(200).json({ message: "Message sent Successfully" });
      }catch(error) {
        console.error(error);
        res.status(500).json({error: 'Post msg failed!'});
      }
    }
}

module.exports = new MessageController();