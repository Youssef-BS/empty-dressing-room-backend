import { User } from "../models/users.js";
import { Msg } from "../models/msg.js";
import { Produit } from "../models/produits.js";
import { Server } from "socket.io";

let io;

export const initSocketIO = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });

    socket.on("sendMessage", async (message) => {
      console.log("Received message:", message);

      try {
             const { content, user, to, product } = message;
        const productFind = await Produit.findById(product);

        const newMessage = new Msg({ content });
        const messageEnvoyer = await newMessage.save();

        await User.findByIdAndUpdate(user, {
          $push: { msg: `${messageEnvoyer._id} ${user}` },
        });
        await User.findByIdAndUpdate(to, {
          $push: { msg: `${messageEnvoyer._id} ${user}` },
        });
        const conversation = { conversation: { _id: messageEnvoyer._id, content: messageEnvoyer.content }, Me: true };
        io.to(to).emit("receiveMessage", conversation);


        conversation.Me = false;
        io.to(user).emit("receiveMessage", conversation);
      } catch (error) {
        console.log("Error:", error);
      }
    });
  });
};


export const addMessage = async (req, res) => {
  const content = req.body;
  const user = req.params.id;
  const to = req.params.idtouser;
  const product = req.params.idproduct;

  try {
    const productFind = await Produit.findById(product);

    const NewMessage = new Msg(content);
    const messageEnvoyer = await NewMessage.save();

    res.status(200).json(messageEnvoyer);

    try {
      await User.findByIdAndUpdate(user, {
        $push: { msg: messageEnvoyer._id + " " + user },
      });
      await User.findByIdAndUpdate(to, {
        $push: { msg: messageEnvoyer._id + " " + user },
      });

      // const index = productFind.msgUser.indexOf(user);
      // if (index === -1) {
      //   await Produit.findByIdAndUpdate(product, {
      //     $push: { msgUser: user },
      //   });
      // }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConversation = async (req, res) => {
  const user = req.params.id;
  const to = req.params.idtouser;

  try {
    const userMessage = await User.findById(user);
    const toUserMessage = await User.findById(to);

    const list1 = userMessage.msg;
    const list2 = toUserMessage.msg;
    var Me = false;

    const list3 = [];

    // Retrieve the last 10 messages from each list
    const reversedList1 = list1.slice(-7).reverse();
    const reversedList2 = list2.slice(-7).reverse();

    for (let i = 0; i < reversedList1.length; i++) {
      for (let j = 0; j < reversedList2.length; j++) {
        if (reversedList1[i].split(" ")[0] === reversedList2[j].split(" ")[0]) {
          if (reversedList1[i].split(" ")[1] === user) {
            Me = true;
          } else {
            Me = false;
          }
          const conversation = await Msg.findById(reversedList1[i].split(" ")[0]);
          list3.push({ conversation, Me });
          break; // Exit the inner loop once a match is found
        }
      }
    }

    res.status(200).json(list3.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const Notification = async (req, res) => {
  const id = req.params.id;
  const myProduct = [];
  const userContact = [];
  try {
    const Me = await User.findById(id); // Me
    if (Me.produit.length != 0) {
      for (let i = 0; i < Me.produit.length; i++) {
        const myproduct = await Produit.findById(Me.produit[i]);
        const UserSendMe = myproduct.msgUser;
        for (let j = 0; j < UserSendMe.length; j++) {
          const userSendMe = await User.findById(UserSendMe[j]);
          userContact.push(userSendMe);
        }
        myProduct.push({ myproduct, userContact });
      }
    }

    res.status(200).json({ myProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const gettwo = async (req, res) => {
  try {
    const users = [];
    const id = req.params.id;
    const user = await User.findById(id);

    for (let i = 0; i < user.msg.length; i++) {
      const messageId = user.msg[i].split(" ")[1];

      // Check if the user with 'messageId' is already in the 'users' array
      const existingUser = users.find((u) => u._id.toString() === messageId);
      if (!existingUser && messageId !== id) {
        const recepteur = await User.findById(messageId);
        users.push(recepteur);
      }
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
