import { connectDB, db } from '@app/lib/db';
import UserModel from '../userModel';
import { NextResponse } from 'next/server';

/*
    @ Description of all possible endpoints:
    * GET: Get all user's appointments
        ? email: email of user
        > Returns: User's appointments
    * POST: Add to the user's appointments
        ? email: email of user
        ? appointment: appointment to add
        > Returns: Status code
    * DELETE: Delete an appointment
        ? email: email of user
        ? appointmentId: ID of the appointment to delete
        > Returns: Status code
*/

connectDB();

export async function GET(req) {
    let searchURL = new URL(req.url);
    let searchParams = searchURL.searchParams;
    const email = searchParams.get('email');

    // Find and return user's appointments based on email
    try {
        const user = await UserModel.findOne({ email: email });
        return NextResponse.json(
            { appointments: user.appointments },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}

export async function POST(req) {
    const hihi = await req.json();
    const email = hihi.email;
    const appointment = hihi.appointment;

    try {
        // Find the user by email
        await UserModel.findOneAndUpdate(
            { email: email },
            { $push: { appointments: appointment } }
        );

        return NextResponse.json(
            { status: 'Appointment added' },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}

export async function DELETE(req) {
    const { email, appointmentId } = req.query;

    try {
        // Find the user by email
        const user = await UserModel.findOne({ email: email });

        // Find the index of the appointment to delete
        const appointmentIndex = user.appointments.findIndex(
            (appointment) => appointment._id.toString() === appointmentId
        );

        if (appointmentIndex !== -1) {
            // Remove the appointment from the array
            user.appointments.splice(appointmentIndex, 1);

            // Save the updated user
            await user.save();

            return NextResponse.json(
                { status: 'Appointment deleted' },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { error: 'Appointment not found' },
                { status: 404 }
            );
        }
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
