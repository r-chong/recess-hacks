import { connectDB, db } from '@app/lib/db';
import UserModel from '../userModel';
import { NextResponse } from 'next/server';

/*
    @ Description of all possible endpoints:
    * GET: Get all acheivements of user
        ? user email
        > Returns: some JSON
*/

connectDB();

/// GET user ahceivement, complete useless, not implmented in frontend
export async function GET(req) {
    let searchURL = new URL(req.url);
    let searchParams = searchURL.searchParams;
    const email = searchParams.get('email');

    let user = await UserModel.findOne({ email: email });

    if (user) {
        return NextResponse.json(
            { achievments: user.achievements },
            { status: 200 }
        );
    } else {
        return NextResponse.json(
            { message: 'User not found' },
            { status: 404 }
        );
    }
}

export async function PUT(req) {
    const updateData = await req.json();
    const email = updateData.email;
    const achievement = updateData.achievement;
    try {
        await UserModel.findOneAndUpdate(
            { email: email },
            {
                $push: {
                    achievements: achievement,
                },
            }
        );

        return NextResponse.json({ status: 200 });
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
