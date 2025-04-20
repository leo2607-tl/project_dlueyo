import bcrypt from 'bcryptjs';
import {NextResponse} from 'next/server';
import Tennis from "@/models/tennis";
import connectToDatabase from "@/lib/mongodb";

export async function POST(request: Request) {
    const {name, date, time, location, description, price, num_} = await request.json();
    
    if (!name || !date || !time || !description || !location || !price || !num_) {
        return NextResponse.json({message: " All fields are required"}, {status:400})
    }
    if (price < 0) {
        return NextResponse.json({ message: "Price must be a positive number" }, { status: 400 });
    }
    const isDateValid = (date: string) =>{
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        return dateRegex.test(date);
    }
    if (!isDateValid(date)){
        return NextResponse.json({ message: "Invalid date format" }, { status: 400 });
    }
    const isTimeValid = (time: string) => {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return timeRegex.test(time);
    }
    if (!isTimeValid(time)){
        return NextResponse.json({ message: "Invalid time format" }, { status: 400 });
    }

    try {
        await connectToDatabase();
        const existingEvents = await Tennis.findOne({name, date, time, location, price});
        if (existingEvents) {
            return NextResponse.json({message: "Event already exist"}, {status:400});
        }
        const newEvent = new Tennis({
            name, date, time, description, location, price, num_
        });
        await newEvent.save();
        return NextResponse.json({ message: "Event created" }, { status: 201 });
    }catch(error){
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}