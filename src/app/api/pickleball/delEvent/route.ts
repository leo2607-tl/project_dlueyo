import connectToDatabase from "@/lib/mongodb";
import PickerBall from "@/models/pickleball";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json(); 

  if (!id) {
    return NextResponse.json({ message: "Event ID is required" }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const deletedEvent = await PickerBall.findByIdAndDelete(id);

    if (!deletedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
