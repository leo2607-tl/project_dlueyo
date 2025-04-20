import Marathon from '@/models/marathon';
import connectToDatabase from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const {name, date, time, location, description, num_, price} = await request.json();

    if (!name || !date || !time || !location || !description || !num_ || !price) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }
    if (price < 0) {
        return NextResponse.json({ message: "Price must be a positive number" }, { status: 400 });
    }
    const isDateValid = (date: string) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        return dateRegex.test(date);
    }
    const isTimeValid = (time: string) => {
        const timeRegex = /^\d{2}:\d{2}$/;
        return timeRegex.test(time);
    }
    if (!isDateValid(date)) {
        return NextResponse.json({ message: 'Invalid date format. Use YYYY-MM-DD.' }, { status: 400 });
    }
    if (!isTimeValid(time)) {
        return NextResponse.json({ message: 'Invalid time format. Use HH:MM.' }, { status: 400 });
    }

    try {
        await connectToDatabase();
        const existingEvent = await Marathon.findOne({name, date, time, description, location, price});
        if (existingEvent){
            return NextResponse.json({ message: 'Event already exists' }, { status: 400 });
        }
        const newEvent = new Marathon({ name, date, time, location, description, num_, price });
        await newEvent.save();
        return NextResponse.json({ message: 'Event created successfully' }, { status: 201 });
    }
    catch(error){
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}