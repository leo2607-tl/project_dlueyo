import Buy from "@/models/buy";
import connectToDatabase from "@/lib/mongodb";

export async function GET() {
    try {
        await connectToDatabase();

        const users = await Buy.find({});

        let totalRevenue = 0;
        let totalTicketsSold = 0;

        users.forEach(user => {
            totalRevenue += user.price_of_ticket * user.num_of_tickets;
            totalTicketsSold += user.num_of_tickets;
        });

        return new Response(
            JSON.stringify({
                users,
                totalRevenue,
                totalTicketsSold
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", { status: 500 });
    }
}
