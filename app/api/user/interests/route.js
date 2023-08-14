import { connectDB, db } from '@app/lib/db';
import UserModel from '../userModel';
import { NextResponse } from 'next/server';

/*
    @ Description of all possible endpoints:
    * GET: Get all users by interest
        ? interest
        > Returns: some JSON
*/

connectDB();

export async function GET(req) {
    let searchURL = new URL(req.url);
    let searchParams = searchURL.searchParams;
    const interest = searchParams.get('interest');
    if (interest) {
        let users = await UserModel.find({
            interests: { $regex: interest, $options: 'i' },
        });
        if (users) {
            return NextResponse.json({ users: users }, { status: 200 });
        } else {
            return NextResponse.json(
                { error: 'Users not found' },
                { status: 404 }
            );
        }
    } else {
        let interests = await UserModel.find().distinct('interests');
        if (interests) {
            return NextResponse.json({ interests }, { status: 200 });
        } else {
            return NextResponse.json(
                { error: 'Interests not found' },
                { status: 404 }
            );
        }
    }
}
export async function POST(req) {
    let body = await req.body.json();
    let userEmails = body.userEmails;
    // Given a bunch of emails, find the users with those emails and return their interests
    try {
        let userInterests = await UserModel.find(
            { email: { $in: userEmails } },
            { interests: 1 }
        );
        return NextResponse.json({ userInterests }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
