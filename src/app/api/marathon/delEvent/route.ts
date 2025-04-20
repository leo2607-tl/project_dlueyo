import Marathon from '@/models/marathon';
import connectToDatabase from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request){
    const {id} = await request.json();
    if (!id){
        return NextResponse.json({message: 'ID is required'}, {status: 400});
    }
    try{
        await connectToDatabase();
        const deleteEvent = await Marathon.findByIdAndDelete(id);
        if (!deleteEvent){
            return NextResponse.json({message: 'Event not found'}, {status: 404});
        }
        return NextResponse.json({message: "Event deleted successfully"}, {status: 200});
    }catch(error){
        console.error(error);
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}