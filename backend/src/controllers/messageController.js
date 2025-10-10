import cloudinary from "../lib/cloudinary.js";
import messageModel from "../models/mesageModel.js";
import userModel from "../models/userModel.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await userModel
      .find({ _id: { $ne: loggedInUserId } })
      .select("-password");

    return res.status(200).json({
      success: true,
      filteredUsers,
    });
  } catch (error) {
    console.log("Error in getAllContacts in message routes : ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log("Error in getMessageById : ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    // TODO: send message in real time if the user is online

    return res.status(200).json({
      success: true,
      newMessage,
    });
  } catch (error) {
    console.log("Error in sendMessage : ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getChatFriends = async (req, res) => {
  try {
    const userId = req.user._id;

    // find all messages where user is either sender or receiver
    const messages = await messageModel.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    });

    const chatFriendsId = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === userId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatFriends = await userModel
      .find({ _id: { $in: chatFriendsId } })
      .select("-password");

    return res.status(200).json({
        success: true,
        chatFriends
    })
  } catch (error) {
    console.log("Error in getChatFriend : ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
