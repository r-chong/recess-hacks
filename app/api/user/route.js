import { connectDB, db } from '@app/lib/db';
import { UserModel } from './userModel';
import { NextResponse } from 'next/server';
import bodyParser from 'body-parser';

export async function GET(req) {
    try {
        const id = req.query.id;
        const user = await UserModel.findById(id, function (err, docs) {
            if (err) {
                console.log(err);
            } else {
                return docs;
            }
        });
        return NextResponse.json(user);
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    const body = await req.json();
    connectDB();
    console.log(body);
    try {
        await db.once('open', async () => {
            const newUser = new UserModel(...jp);
            console.log(newUser);

            await newUser.save();
            console.log('User added:', newUser);

            return NextResponse.json({ status: 200 });
        });
    } catch (err) {
        console.log(err.stack);
    }
}

export async function DELETE(req) {
    connectDB;
    try {
        await db.once('open', async () => {
            const email = req.query.email;
            await UserModel.findOneAndDelete({ email: email });

            return NextResponse.json({ status: 200 });
        });
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// TODO This needs to be fixed lol
export async function PUT(req) {
    try {
        const email = req.query.email;
        const newData = req.body;
        await UserModel.findOneAndUpdate({ email: email }, newData);

        return NextResponse.json({ status: 200 });
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
