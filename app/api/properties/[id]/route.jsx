import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (request,{params}) => {
    try {

        await connectDB()

        const property = await Property.findById(params.id);
        if (!property) {
            return new Response(JSON.stringify(property), { status: 404 })
        }
        return new Response(JSON.stringify(property), { status: 200 })
    } catch (error) {
        console.log();
        return new Response('Something went wrong ', { status: 500 })

    }
}