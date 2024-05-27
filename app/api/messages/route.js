import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic'

export const POST = async (request) => {
    try {
        await connectDB();

        const { name, email, phone, message, property, recipient } = await request.json();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify({message:'You must be logged in to send a message'}), { status: 401 });
        }

        const { user } = sessionUser;

        if (user.id === recipient) {
            return new Response(JSON.stringify({message:'Cannot send message to self'}),{status: 400});
        }

        const newMsg = new Message({
            sender: user.id,
            recipient,
            property,
            name,
            email,
            phone,
            body:message
        })

        await newMsg.save()
        return new Response(JSON.stringify({message:'MESAAGE SENT'}), { status: 200 });
    } catch (error) {
        return new Response("Something went wrong ", { status: 500 });
    }
};

