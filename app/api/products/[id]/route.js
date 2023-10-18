import Inventory from "@/models/inventory";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const product = await Inventory.findOne({
      _id: params.id,
    });

    console.log(product);
    return new Response(JSON.stringify({ product }), { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const PATCH = async(req, { params }) =>{

    // cosnt {  } = req.json();
    try {
        await connectToDB();

        const product = await Inventory.findOne({
            _id: params.id,
        });
        if(!product){
            return new Response("Slug not found", { status: 404 });
        }
        
        // products.slug = 
        product.save();
        return new Response(JSON.stringify("Slug updated successfully"), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify("Error updating slug"), { status: 500 });
    }
}
