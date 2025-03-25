const mongoose = require('mongoose');
const Item = require('./models/item');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/express-demo');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
}
// Create
const createItem = async (itemData) => {
  const item = new Item(itemData);
  await item.save();
  console.log('Item created:', item);
};

// Read
const readItems = async () => {
  const items = await Item.find();
  console.log('Items:', items);
};

// Update
const updateItem = async (id, updatedData) => {
  const item = await Item.findByIdAndUpdate(id, updatedData, { new: true });
  console.log('Item updated:', item);
};

// Delete
const deleteItem = async (id) => {
  await Item.findByIdAndDelete(id);
  console.log('Item deleted');
};

async function main () {
  await connectDB();
  await createItem({ name: 'item1' , quantity: 10 , price: 40 });
  // await readItems();
  // await updateItem('67e27d724580c221ac592c3b', { name: 'item3' });
  // await deleteItem('67e27d724580c221ac592c3b');
}

main();


module.exports = {
  connectDB,
  createItem,
  readItems,
  updateItem,
  deleteItem
};