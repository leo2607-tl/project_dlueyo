import Marathon from "@/models/marathon";
import connectToDatabase from '@/lib/mongodb';
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(request: Request){
    const {id, name, description, date, time, location, price, num_} = await request.json();
    
    if (!id || !name || !description || !date || !time || !location || !price || !num_) {
        return NextResponse.json({message: "Missing required fields"}, {status: 400});
    }
    if (!id){
        return NextResponse.json({message: "Event ID is required"}, {status: 400});
    }
    if (price < 0) {
        return NextResponse.json({ message: "Price must be a positive number" }, { status: 400 });
    }
    const isDateValid = (date: string) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        return dateRegex.test(date);
    }
    if (!isDateValid(date)) {
        return NextResponse.json({ message: "Invalid date format" }, { status: 400 });
    }
    const isTimeValid = (time: string) => {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return timeRegex.test(time);
    }
    if (!isTimeValid(time)) {
        return NextResponse.json({ message: "Invalid time format" }, { status: 400 });
    }
    try {
        await connectToDatabase();;
        const updateEvent = await Marathon.findByIdAndUpdate(
            id, {name, description, date, time, location, price, num_}, {new: true}
        );
        if (!updateEvent){
            return NextResponse.json({message: "Event not found"}, {status: 404});
        }
        return NextResponse.json({message: "Event updated successfully", event: updateEvent}, {status: 200});
    }catch(error){
        console.error(error);
        return NextResponse.json({message: "Internal server error"}, {status: 500})
    };
}