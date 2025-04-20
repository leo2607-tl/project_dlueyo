import Tennis from '@/models/tennis';
import connectToDatabase from '@/lib/mongodb';

export async function GET(){
    try{
        await connectToDatabase();
        const events = await Tennis.find({});

        return new Response(JSON.stringify(events), {status: 200})
    }
    catch(error){
        console.log(error);
        return new Response("Something went wrong", {status: 500})
    }
}