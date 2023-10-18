import Inventory from "@/models/inventory";
import { connectToDB } from "@/utils/database";


export const POST = async(req, res) =>{

    try {
        const { action, slug, initialQuantity } = await req.json();
        console.log(action, slug, initialQuantity);
        await connectToDB();

        const newQuantity = action=="plus" ? (initialQuantity + 1) : (initialQuantity - 1);

        const updatedInventory = await Inventory.findOneAndUpdate(
            { slug: slug },
            { $set: {
                productQuantity: newQuantity
            } },
            { new: true }
        );
        if(!updatedInventory){
            return new Response("Slug not found", { status: 404 });
        }
        
        return new Response(JSON.stringify(`${updatedInventory.matchedCount} document(s) matched the filter, Updated ${updatedInventory.modifiedCount} document(s).`), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify("Error updating slug"), { status: 500 });
    }
}