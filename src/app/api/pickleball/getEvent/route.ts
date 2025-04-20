import PickerBall from "@/models/pickleball";
import connectToDatabase from "@/lib/mongodb";

export async function GET() {
  try {
    await connectToDatabase();
    const events = await PickerBall.find({});

    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
