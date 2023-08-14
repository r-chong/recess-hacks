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

    let users = await UserModel.find({
        interests: { $regex: interest, $options: 'i' },
    });
    if (users) {
        return NextResponse.json({ users: users }, { status: 200 });
    } else {
        return NextResponse.json({ error: 'Users not found' }, { status: 404 });
    }
}
