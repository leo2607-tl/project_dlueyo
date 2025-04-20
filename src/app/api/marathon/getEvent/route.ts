import Marathon from '@/models/marathon';
import connectToDatabase from '@/lib/mongodb';

export async function GET(){
    try{
        await connectToDatabase();
        const events = await Marathon.find({});
        return new Response(JSON.stringify(events), {status: 200})
    }catch(error){
        console.error(error);
        return new Response('Failed to fetch events', {status: 500})
    }
}