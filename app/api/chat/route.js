import { connectDB } from '@app/lib/db';
import UserModel from '../user/userModel';
import ChatModel from './chatModel';
import { NextResponse } from 'next/server';

/*
    @ Description of all possible endpoints:
    * GET: Get all chats for a user
        ? email: email of user
        > Returns: Array or object? of chats
    * POST: Create a new chat
        ? people: array of emails of people in chat
        > Returns: Chat object
    * PUT: Update a chat - DOES NOT OVERWRITE THE MESSAGES! (simply pushes them to array)
        ? people: array of emails of people in chat
        ? messages: array of messages
        > Returns: Status code
    * DELETE: Delete a chat
*/

//! THIS IS IMPORTANT, learned this the hard way LOL
connectDB();

// Get all chats for a user
export async function GET(req) {
    let searchURL = new URL(req.url);
    let searchParams = searchURL.searchParams;
    const userEmail = searchParams.get('email');
    try {
        // Find all chats and send back
        const chatData = await ChatModel.find({ people: { $in: [userEmail] } });
        return NextResponse.json({ chatData: chatData }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// Create a new chat
export async function POST(req) {
    const chatData = await req.json();
    console.log(await chatData);
    try {
        const people = chatData.people;

        // First check if anything is null
        people.forEach((person) => {
            if (person === null) {
                return NextResponse.json(
                    { error: 'Person is null' },
                    { status: 500 }
                );
            }
        });

        const newChat = new ChatModel(chatData);
        await newChat.save();
        console.log('Chat created:', newChat);

        // Update each user's data in UserModel > chats
        chatData.people.forEach(async (email) => {
            console.log('Updating user: ' + email);
            await UserModel.findOneAndUpdate(
                { email: email },
                { chats: newChat._id }
            );
        });
        return NextResponse.json({ chat: newChat }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}

export async function PUT(req) {
    const updateData = await req.json();
    try {
        const people = updateData.people;
        const messages = updateData.messages;
        await ChatModel.findOneAndUpdate(
            { people: { $all: people } },
            { $push: { messages: messages } }
        );
        console.log(data);
        console.log('SUCCESS');
        return NextResponse.json({ status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.stack }, { status: 500 });
    }
}

export async function DELETE(req) {
    let searchURL = new URL(req.url);
    let searchParams = searchURL.searchParams;
    const userEmail = searchParams.get('email');
    try {
        await ChatModel.findOneAndDelete({ people: { $in: [userEmail] } });
        return NextResponse.json({ status: 200 });
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
