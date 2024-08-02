const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize express app
const app = express();
app.use(bodyParser.json());

// Dummy data
let users = [
    { id: uuidv4(), username: 'ahmed', password: 'password1' },
    { id: uuidv4(), username: 'saima', password: 'password2' },
    { id: uuidv4(), username: 'ali', password: 'password3' },
    { id: uuidv4(), username: 'fatima', password: 'password4' },
    { id: uuidv4(), username: 'hassan', password: 'password5' },
    { id: uuidv4(), username: 'maria', password: 'password6' },
    { id: uuidv4(), username: 'zain', password: 'password7' },
    { id: uuidv4(), username: 'aisha', password: 'password8' },
    { id: uuidv4(), username: 'bilal', password: 'password9' },
    { id: uuidv4(), username: 'rabia', password: 'password10' }
];

let messages = [
    "How are you?",
    "What's up?",
    "Good morning!",
    "Good night!",
    "Have a nice day!",
    "See you soon!",
    "Take care!",
    "I'm on my way.",
    "Let's meet up.",
    "Call me when you can.",
    "I'm busy right now.",
    "Can you help me with this?",
    "Thank you!",
    "You're welcome!",
    "Happy birthday!",
    "Congratulations!",
    "Sorry, I missed your call.",
    "No problem.",
    "Let's catch up later.",
    "Sure, sounds good!"
];

let generateDummyMessages = (numMessages, members) => {
    let dummyMessages = [];
    for (let i = 0; i < numMessages; i++) {
        let sender = members[Math.floor(Math.random() * members.length)];
        let text = messages[Math.floor(Math.random() * messages.length)];
        dummyMessages.push({ sender, text, timestamp: new Date() });
    }
    return dummyMessages;
};

let chats = [
    { id: uuidv4(), members: [users[0].id, users[1].id], messages: generateDummyMessages(10, [users[0].id, users[1].id]) },
    { id: uuidv4(), members: [users[1].id, users[2].id], messages: generateDummyMessages(10, [users[1].id, users[2].id]) },
    { id: uuidv4(), members: [users[2].id, users[3].id], messages: generateDummyMessages(10, [users[2].id, users[3].id]) },
    { id: uuidv4(), members: [users[3].id, users[4].id], messages: generateDummyMessages(10, [users[3].id, users[4].id]) },
    { id: uuidv4(), members: [users[4].id, users[5].id], messages: generateDummyMessages(10, [users[4].id, users[5].id]) },
    { id: uuidv4(), members: [users[5].id, users[6].id], messages: generateDummyMessages(10, [users[5].id, users[6].id]) },
    { id: uuidv4(), members: [users[6].id, users[7].id], messages: generateDummyMessages(10, [users[6].id, users[7].id]) },
    { id: uuidv4(), members: [users[7].id, users[8].id], messages: generateDummyMessages(10, [users[7].id, users[8].id]) },
    { id: uuidv4(), members: [users[8].id, users[9].id], messages: generateDummyMessages(10, [users[8].id, users[9].id]) },
    { id: uuidv4(), members: [users[9].id, users[0].id], messages: generateDummyMessages(10, [users[9].id, users[0].id]) }
];

let groups = [
    {
        id: uuidv4(),
        name: 'Family Group',
        members: [users[0].id, users[1].id, users[2].id, users[3].id, users[4].id],
        messages: generateDummyMessages(20, [users[0].id, users[1].id, users[2].id, users[3].id, users[4].id])
    }
];

// Routes
app.get('/api/chats', (req, res) => {
    res.json(chats);
});

app.get('/api/groups', (req, res) => {
    res.json(groups);
});

app.post('/api/chats/:chatId/messages', (req, res) => {
    const { chatId } = req.params;
    const { sender, text } = req.body;
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
        chat.messages.push({ sender, text, timestamp: new Date() });
        res.status(201).json(chat);
    } else {
        res.status(404).json({ error: 'Chat not found' });
    }
});

app.post('/api/groups/:groupId/messages', (req, res) => {
    const { groupId } = req.params;
    const { sender, text } = req.body;
    const group = groups.find(g => g.id === groupId);
    if (group) {
        group.messages.push({ sender, text, timestamp: new Date() });
        res.status(201).json(group);
    } else {
        res.status(404).json({ error: 'Group not found' });
    }
});

