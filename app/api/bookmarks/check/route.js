import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic'

export const POST = async (request) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();
        const { propertyId } = await request.json();

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 });
        }

        const { userId } = sessionUser;
        const user = await User.findOne({ _id: userId })

        let isBookmarked = user.bookmarks.includes(propertyId)
        console.log(isBookmarked)

        return new Response(JSON.stringify({ isBookmarked }), { status: 200 });

    } catch (error) {
        console.log(error)
        return new Response('Failed to add property', { status: 500 });
    }
};