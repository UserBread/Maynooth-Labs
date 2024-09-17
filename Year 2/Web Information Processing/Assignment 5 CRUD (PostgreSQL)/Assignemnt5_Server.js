
//Importing libraries
const mongoose = require('mongoose');
const express = require('express');
const readline = require('node:readline');
const cors = require('cors')

//Importing models for mongoose
const User = require('./models/personal_details.model');
const Item = require('./models/item_details.model');
const Order = require('./models/order_details.model');

//Connecting to mongoDB 
mongoose.connect("Input mongoDB connection string")
.then(() => {
    console.log('Successfully Conencted to the Database');
    app.listen(3000, () => {
        console.log('Server is running on port 3000\n');
    });
})
.catch(() => {
    console.log('Failed to Connect to the Database\n');   
});

//Console Section
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//Function for readline question that will return the input of user
async function getUserInput(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

//Timeout so that the readline will come after the server connected messages
setTimeout(async () => {
    const askOperation = await getUserInput(`What CRUD operation would you like to do?\nC to Create\nR to Retrieve\nU to Update\nD to Delete\n`);
    switch (askOperation.toUpperCase()) {
        case 'C': 
            const createQuestion = await getUserInput('What would you like to create? (enter the number)\n1. User\n2. Item\n3. Order\n'); 
            switch (createQuestion) {
                case '1': createUserData(); break;
                case '2': createItemData(); break;
                case '3': createOrderData(); break;
                default: console.log('Invalid Operation');
            }
            break;
        case 'R': 
            const retrieveQuestion = await getUserInput('What would you like to retrieve? (enter the number)\n1. User\n2. Item\n3. Order\n'); 
            switch (retrieveQuestion) {
                case '1': retrieveUserData(); break;
                case '2': retrieveItemData(); break;
                case '3': retrieveOrderData(); break;
                default: console.log('Invalid Operation');
            }
            break;
        case 'U': 
            const updateQuestion = await getUserInput('What would you like to update? (enter the number)\n1. User\n2. Item\n3. Order\n'); 
            switch (updateQuestion) {
                case '1': updateUserData(); break;
                case '2': updateItemData(); break;
                case '3': updateOrderData(); break;
                default: console.log('Invalid Operation');
            }
            break;
        case 'D': 
            const deleteQuestion = await getUserInput('What would you like to delete? (enter the number)\n1. User\n2. Item\n3. Order\n'); 
            switch (deleteQuestion) {
                case '1': deleteUserData(); break;
                case '2': deleteItemData(); break;
                case '3': deleteOrderData(); break;
                default: console.log('Invalid Operation');
            }
            break;
        default: 
            console.log('Invalid Operation');
    }
}, 1000);

//Create Section of CRUD API
async function createUserData() {
    const userData = {
        title: await getUserInput('Enter your title: '),
        firstName: await getUserInput('Enter your first name(s) '),
        surname: await getUserInput('Enter your surname '),
        mobileNumber: await getUserInput('Enter your mobile number '),
        emailAddress: await getUserInput('Enter your email address '),
        homeDetails: {
            addressLine1: await getUserInput('Enter your home address line 1 '),
            addressLine2 : await getUserInput('Enter your home address line 2 '),
            town: await getUserInput('Enter your home town '),
            countycity: await getUserInput('Enter your home county/city '),
            eircode: await getUserInput('Enter your home eircode '),
        },
        shippingDetails: {
            addressLine1: await getUserInput('Enter your shipping address line 1 '),
            addressLine2 : await getUserInput('Enter your shipping address line 2 '),
            town: await getUserInput('Enter your shipping town '),
            countycity: await getUserInput('Enter your shipping county/city '),
            eircode: await getUserInput('Enter your shipping eircode '),
        }
    };
    await User.create(userData);
    console.log('User was successfully created');
}
async function createItemData() {
    const itemData = {
        manufacturer: await getUserInput('Enter the manufacturer: '),
        model: await getUserInput('Enter the model: '),
        price: await getUserInput('Enter the price: ')
    };
    await Item.create(itemData);
    console.log('Item was successfully created');
}
async function createOrderData() {
    const email = await getUserInput('Enter your email: ');
    const orderData = {
        userEmail: email,
        items: []
    }
    await askPurchase(orderData);
    await Order.create(orderData);
    console.log('Order was successfully created');
}
async function askPurchase(orderData) {
    const purchaseQuestion = await getUserInput('Would you like to buy a phone? (Y/N)\n');
    if (purchaseQuestion.toUpperCase() == 'Y') {
        await retrieveAllItems();
        console.log('Above are all the items in our database');
        const manufacturer = await getUserInput('Enter manufacturer of the item you would like to purchase: ');
        const model = await getUserInput('Enter the model of the item you would like to purchase: ');
        
        const items = await Item.find({manufacturer:manufacturer, model:model});  
        const item = items[0]
        orderData.items.push(item);

        return askPurchase(orderData);
    }
}
//Retrieve Section of CRUD API
async function retrieveUserData() {
    const email = await getUserInput('Enter email address: ');
    const user = await User.find({emailAddress:email});
    
    printUser(user);
}
async function retrieveAllItems() {
    const items = await Item.find();
    printItem(items);
}
async function retrieveItemData() {
    const manufacturer = await getUserInput('Enter the manufacturer ');
    const model = await getUserInput('Enter model ');
    const item = await Item.find({manufacturer:manufacturer, model:model});

    printItem(item);
}
async function retrieveOrderData() {
    const email = await getUserInput('Enter your email address to view all your orders: ');

    const orders = await Order.find({userEmail:email});
    printOrder(orders);
}

//Formatted prints
function printUser(userData) {
    console.log(`-------------------------------------
Personal Information
    Title: ${userData[0].title}
    First Name: ${userData[0].firstName}
    Surname: ${userData[0].surname}
    Mobile Number: ${userData[0].mobileNumber}
    Email Address ${userData[0].emailAddress}
    `);

    console.log(`Home Details
    Address Line 1: ${userData[0].homeDetails.addressLine1}
    Address Line 2: ${userData[0].homeDetails.addressLine2}
    Town: ${userData[0].homeDetails.town}
    County/City: ${userData[0].homeDetails.countycity}
    Eircode: ${userData[0].homeDetails.eircode}
    `);

    console.log(`Shipping Details
    Address Line 1: ${userData[0].shippingDetails.addressLine1}
    Address Line 2: ${userData[0].shippingDetails.addressLine2}
    Town: ${userData[0].shippingDetails.town}
    County/City: ${userData[0].shippingDetails.countycity}
    Eircode: ${userData[0].shippingDetails.eircode}
-------------------------------------`);
}
function printItem(itemData) {
    console.log(`-----------------------Phones-----------------------`);
    for (let i = 0; i < itemData.length; i++) {
        console.log(`Manufacturer: ${itemData[i].manufacturer}, Model: ${itemData[i].model}, Price: ${itemData[i].price}`);
    };
    console.log(`----------------------------------------------------`);
}
function printOrder(orderData) {
    orderData.forEach((purchase, index) => {
        console.log(`-----------------------Order ${index+1}-----------------------`);
        console.log(`Email Address: ${purchase.userEmail}`);
        purchase.items.forEach((item, i) => {
            if (item === null) console.log('Item does not Exist');
            else console.log(`${i+1}. Manufacturer: ${item.manufacturer}, Model: ${item.model}, Price: ${item.price}`);
        });
        console.log(`-----------------------------------------------------`);
    });
}

//Update Section of CRUD API
async function updateUserData() {
    const email = await getUserInput('Enter email address of user you would like to update: ');
    const toUpdate = await getUserInput('What would you like to update? (enter the number)\n1. Personal Information\n2. Home Addres\n3. Shipping Address\n');
    switch (toUpdate) {
        case '1': updatePersonalData(email); break;
        case '2': updateAddress(email, 'homeDetails'); break;
        case '3': updateAddress(email, 'shippingDetails'); break;
        default: console.log('Invalid Input');
    }
}
async function updatePersonalData(email) {
    const newUserData = {
        mobileNumber: await getUserInput('Enter new mobile number: '),
        emailAddress: await getUserInput('Enter new email address: '),
        title: await getUserInput('Enter new title ')
    }

    const user = await User.findOneAndUpdate({emailAddress:email}, newUserData);
    if (!user) console.log('User not found');
    else console.log('User was updated');
}
async function updateAddress(email, addressType) {
    const newUserData = {
        addressLine1: await getUserInput('Enter new address line 1: '),
        addressLine2: await getUserInput('Enter new address line 2: '),
        town: await getUserInput('Enter new town: '),
        countycity: await getUserInput('Enter new county/city: '),
        eircode: await getUserInput('Enter new eircode: ')
    }
    let update = {};
    update[addressType] = newUserData;

    const user = await User.findOneAndUpdate({emailAddress:email}, update);
    if (!user) console.log('User not found');
    else console.log('User was updated');
}
async function updateItemData() {
    const manufacturer = await getUserInput('Enter the manufacturer: ');
    const model = await getUserInput('Enter the model: ');

    const newItemData = {
        manufacturer: await getUserInput('Enter the new manufacturer: '),
        model: await getUserInput('Enter new model: '),
        price: await getUserInput('Enter new price: ')
    }
    const item = await Item.findOneAndUpdate({manufacturer:manufacturer, model:model}, newItemData);
    
    if (!item) console.log('Item not found');
    else console.log('Item was updated');
}
async function updateOrderData() {
    //Shows user their orders
    await retrieveOrderData();

    //Gets the specific order they want to change
    const id = await getUserInput('Enter the id of the order you want to change: ');
    const updateQuestion = await getUserInput('What would you like to update? (Enter a number)\n1. Email Address\n2. Item\n');
    if (updateQuestion == 1) {
        const newEmail = await getUserInput('Enter your new email: ');
        await Order.findByIdAndUpdate(id, {userEmail:newEmail});
    }
    else if (updateQuestion == 2) {
        //Item number is array index hence the -1 at the end
        const itemNumber = await getUserInput('Enter the which item you would like to update (Enter a number): ') - 1;
        await retrieveAllItems();
        console.log('Above are all the items in our database');
        const newItemData = {
            manufacturer: await getUserInput('Enter new manufacturer: '),
            model: await getUserInput('Enter new model: '),
            price: await getUserInput('Enter new price: ')
        }
        await Order.findOneAndUpdate({_id:id},{$set: { [`items.${itemNumber}`] : newItemData}});
    }
    else { 
        console.log('Invalid Operation');
        return;
    }
    const updatedOrder = await Order.findOne({_id:id});
    if (!updatedOrder) console.log('Order was updated');
    else console.log('ORder not found');
}

//Delete Section of CRUD API
async function deleteUserData() {
    const email = await getUserInput('Enter email address of the user you would like to delete: ');
    const mobile = await getUserInput('Enter mobile number: ');
    const name = await getUserInput('Enter first name: ');
    await User.findOneAndDelete({firstName: name, mobileNumber: mobile, emailAddress:email});
    console.log('User was deleted');
}
async function deleteItemData() {
    const manufacturer = await getUserInput('Enter the manufacturer you want to delete: ');
    const model = await getUserInput('Enter model that you want to delete: ');
    await Item.findOneAndDelete({manufacturer:manufacturer, model:model});
    console.log('Item was deleted');
}
async function deleteOrderData() {
    await retrieveOrderData();

    const id = await getUserInput('Enter the id of the order you want to delete: ');
    await Order.findByIdAndDelete(id);
    console.log('Order was deleted');
}

//Express Section
const app = express();
app.use(cors());
app.use(express.json());

//Create section of CRUD API
app.post('/api/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        console.log('User Created!');
        res.status(200).json(user);
    } catch (error) {
        res.status(500);
    }
});
app.post('/api/items', async (req, res) => {
    try {
        const item = await Item.create(req.body);
        console.log('Item Created!');
        res.status(200).json(item);
    } catch (error) {
        res.status(500);
    }
});

//Retrieve section of CRUD API
app.get('/api/users', async (req, res) => {
    try {
        const user = await User.find(req.body);
        res.status(200).json(user);
    } catch (error){
        res.status(500);
    }
});
app.get('/api/items', async (req, res) => {
    try {
        const item = await Item.find(req.body);
        res.status(200).json(item);
    } catch (error){
        res.status(500);
    }
});

//TODO: Update section of CRUD API

//TODO: Delete section of CRUD API