import Message from '../Models/MessageModel.js'; // make sure to add .js extension if using ESM

export const sendMessage = async (req, res) => {
  const { sender, receiver, text } = req.body;

  if (!sender || !receiver || !text) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const newMessage = new Message({
      sender,
      receiver,
      text,
      timestamp: new Date(),
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ message: 'Error sending message', error: err });
  }
};

export const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId }
      ]
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error getting messages', error: err });
  }
};
