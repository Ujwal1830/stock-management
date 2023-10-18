import Inventory from "@/models/inventory";
import { connectToDB } from "@/utils/database";


export const GET = async (req, res) => {

    try {

        await connectToDB();
    const allProducts = await Inventory.find({});

    console.log(allProducts);
    return new Response(JSON.stringify({allProducts}), { status: 200 });
  } catch(error) {
    console.log(error);
  }
}

export const POST = async (request) => {

    let { slug, productQuantity, productPrice } = await request.json()
    try {
        await connectToDB();
    // Query for a movie that has the title 'Back to the Future'
    const newProduct = await Inventory.create({
        slug,
        productQuantity,
        productPrice,
    });
    await newProduct.save();

    console.log(newProduct);
    return new Response(JSON.stringify({ newProduct }), { status: 201 });
  }catch(error){
    return new Response(JSON.stringify("failed to create new product") ,{ status: 201 });
  }
}
