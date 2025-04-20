import connectToDatabase from "@/lib/mongodb";
import PickerBall from "@/models/pickleball";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { id, name, date, time, num_, location, description, price } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "Event ID is required" }, { status: 400 });
  }

  if (!name || !date || !time || !num_ || !location || !description || !price) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const updatedEvent = await PickerBall.findByIdAndUpdate(
      id, 
      { name, date, time, num_, location, description, price },
      { new: true }
    );

    if (!updatedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
  }
