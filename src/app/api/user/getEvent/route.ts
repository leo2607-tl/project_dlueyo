import User from "@/models/user";
import connectToDatabase from "@/lib/mongodb";

export async function GET (){
    try {
        await connectToDatabase();
        const users = await User.find({});
        return new Response(JSON.stringify(users), {status: 200});
    } catch(error){
        console.log(error);
        return new Response("Something went wrong", {status: 500});
    }
}