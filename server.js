import express from "express";

import cors from "cors";
import Messages from "./firebase.js";
import Contacts from "./firebase.js";
import twilio from "twilio";

import endpoint from "./config.js";
import { addDoc, query, getDocs, orderBy } from "firebase/firestore";

//app config
const app = express();
const port = process.env.PORT || 9000;
// twilio config
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// middleware
app.use(express.json());
app.use(cors());
//db config

//console.log(process.env)
// mongoose.connect(
//  process.env.mongodb_url
// );

// const db = mongoose.connection;

// routes
// - send message _/
// - see all messages /
// - get contacts /
// - create contact /
// - see contact details

app.get("/contacts", async (req, res) => {
  let allDocs = [];
  try {
    const docsRec = await getDocs(query(Contacts.Contacts));
    docsRec.forEach((snap) => {
      allDocs.push(snap.data());
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
  res.status(201).send(allDocs);
});

app.get("/messages", async (req, res) => {
  let allDocs = [];
  try {
    const docsRec = await getDocs(query(Messages.Messages,orderBy('created',desc)));
    docsRec.forEach((snap) => {
      allDocs.push(snap.data());
    });
  } catch (err) {
    console.log(err)
    res.status(400).send(err.message);
  }
  res.status(201).send(allDocs);
});
app.get("/total", async (req, res) => {
  let allDocs = [];
  try {
    const docsRec = await getDocs(query(Messages.Messages));
    docsRec.forEach((snap) => {
      allDocs.push(snap.data());
    });
  } catch (err) {
    console.log(err)
    res.status(400).send(err.message);
  }
  res.status(201).send(allDocs);
});
app.post("/create/message", async (req, res) => {
  try {
    console.log(req.body);
    await client.messages.create({
      body: req.body.msg,
      from: "+19706361098",
      to: req.body.to,
      created: new Date()
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
  const data = req.body;
  await addDoc(Messages.Messages, data);
  res.status(200).send({ msg: "Message sent!" });
});
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/create/contact", async (req, res) => {
  try {
    const data = req.body;
    await addDoc(Contacts.Contacts, data);
  } catch (err) {
    res.status(400).send(err.message);
  }
  res.status(200).send({ msg: "New Contact added" });
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
