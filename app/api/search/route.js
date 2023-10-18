import Inventory from "@/models/inventory";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";


export const GET = async(request) => {
    const query = request.nextUrl.searchParams.get("query");
    const queryString = query ? query.toString() : ""; // Convert query to a normal variable
    const cleanedQueryString = queryString.replace(/["]+/g, ''); 
    try {
        await connectToDB();

        const products = await Inventory.aggregate([{
            $match: {
                $or: [
                  { slug: { $regex: cleanedQueryString, $options: "i" } }, // Case-insensitive regex search for name
                ]
            }
        }])
        console.log(products);
        // return NextResponse.json({status: 200, products});
        return new Response(JSON.stringify({products}), {status: 200});

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify("Error occured while searching"), {status: 500});
        
    }
}