import Tennis from "@/models/tennis";
import connectoDatabase from "@/lib/mongodb";
import {NextRequest, NextResponse} from "next/server";

export async function PATCH(req: NextRequest){
    const {id, name, date, time, description, location, price, num_} = await req.json();

    if (!id){
        return NextResponse.json({message: "Event ID is required"}, {status: 400});
    }
    if (!name || !date || !time || !description || !location || !price || !num_){
        return NextResponse.json({message: "All fields are required"}, {status: 400});
    }
    if (price < 1000) {
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
        await connectoDatabase();

        const updateEvent = await Tennis.findByIdAndUpdate(
            id,
            {name, date, time, description, location, price, num_},
            {new: true}
        );
        if (!updateEvent){
            return NextResponse.json({message: "Event not found"}, {status: 404});
        }
        return NextResponse.json({message:"Event updated successfully", event: updateEvent});
    }catch(error){
        console.error(error);
        return NextResponse.json({message: "Something went wrong"}, {status: 500});
    }
}