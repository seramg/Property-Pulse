import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const GET = async (request) => {
    try {

        await connectDB()

        const properties = await Property.find({})
        return new Response(JSON.stringify(properties), { status: 200 })
    } catch (error) {
        console.log();
        return new Response('Something went wrong ', { status: 500 })

    }
}

export const POST = async (request) => {
    try {

        await connectDB();


        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User Id is required ', { status: 401 })
        }
        const { userId } = sessionUser;

        const formData = await request.formData();

        const amenities = formData.getAll('amenities');
        const images = formData.getAll('images')
            .filter((img) => img.name !== '');


        const propertyData = {
            name: formData.get('name'),
            type: formData.get('type'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode')
            },
            beds: parseInt(formData.get('beds')), // Convert to number
            baths: parseInt(formData.get('baths')), // Convert to number
            square_feet: parseInt(formData.get('square_feet')), // Convert to number
            amenities,
            rates: {
                nightly: formData.get('rates.nightly'),
                monthly: formData.get('rates.monthly'),
                weekly: formData.get('rates.weekly'),
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone')
            },
            // images,
            owner: userId
        };

        const newProperty = new Property(propertyData);
        await newProperty.save();
        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`)
    } catch (error) {
        console.log();
        return new Response('Something went wrong ', { status: 500 })

    }
}