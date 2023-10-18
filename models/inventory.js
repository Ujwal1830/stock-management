import { Schema, model, models } from "mongoose";

const InventorySchema = new Schema({
    slug: {
        type: String,
        require: [true, 'Slug is required!'],
    },
    productQuantity: {
        type: Number,
        require: [true, 'Product Quantity is required!'],
    },
    productPrice: {
        type: Number,
        require: [true, 'Product Price is required!'],
    }
});

const Inventory = models.Inventory || model('Inventory', InventorySchema);

export default Inventory;