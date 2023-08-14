import { connectDB, db } from '@app/lib/db';
import UserModel from './userModel';
import { NextResponse } from 'next/server';

/*
    @ Description of all possible endpoints:
    * GET: Get all data for a user
        ? email: email of user OR nothing (to get all users)
        > Returns: User data
    * POST: Create a new user
        ? userData: object of user data (conforming to UserModel)
        > Returns: User object
    * PUT: Update a user - (usually to add chat, acheivements, etc.)
        ? email: email of user
        > Returns: Status code
    * DELETE: Delete a chat
*/

connectDB();

export async function GET(req) {
    let searchURL = new URL(req.url);
    let searchParams = searchURL.searchParams;
    const email = searchParams.get('email');
    if (email) {
        // Find and return one user based on email
        let user = await UserModel.findOne({ email: email });
        return NextResponse.json({ user }, { status: 200 });
    } else {
        // Find and return all users
        let userList = await UserModel.find({});
        return NextResponse.json({ userList }, { status: 200 });
    }
}

export async function POST(req) {
    const userData = await req.json();

    try {
        const newUser = new UserModel(userData);
        await newUser.save();

        console.log('User added:', newUser);

        return NextResponse.json({ user: newUser }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const email = req.query.email;
        await UserModel.findOneAndDelete({ email: email });

        return NextResponse.json({ status: 200 });
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// TODO This needs to be fixed lol
export async function PUT(req) {
    const updateData = await req.json();

    try {
        await UserModel.findOneAndUpdate(
            { email: updateData.email },
            updateData
        );

        return NextResponse.json({ status: 200 });
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// LEAVE GET Request code here for now
/*    connectDB().then(async () => {
        try {
            await db.once('open', async () => {
                console.log('sss');
                let user = await UserModel.findOne({ email: email });
                console.log(user);
                return NextResponse.json({ user: user }, { status: 200 });
            });
        } catch (err) {
               return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        ); 
        }
    }); */
