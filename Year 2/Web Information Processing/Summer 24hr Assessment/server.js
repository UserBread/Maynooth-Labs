//Importing libraries
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')

//Importing models for mongoose
const Landlord = require('./models/landlord_details.js');
const Tenant = require('./models/tenant_details.js');
const Contract = require('./models/tenant-landlord_contracts.js');

const app = express();
app.use(express.json());
app.use(cors());

//Connecting to mongoDB 
mongoose.connect("enter your mongoDB connection string here", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully Conencted to the Database');
        app.listen(3000, () => {
            console.log('Server is running on port 3000\n');
        });
    })
    .catch(() => {
        console.log('Failed to Connect to the Database\n');
    });

//Creating using ExpressJS
app.post('/api/landlord', async (req, res) => {
    try {
        const landlord = await Landlord.create(req.body);
        console.log('Landlord Successfully Created');
        res.status(200).json(landlord);
    } catch {
        res.status(500);
    }
});
app.post('/api/tenant', async (req, res) => {
    try {
        const tenant = await Tenant.create(req.body);
        console.log('Tenant Successfully Created');
        res.status(200).json(tenant);
    } catch {
        res.status(500);
    }
});
app.post('/api/contract', async (req, res) => {
    try {
        const contract = await Contract.create(req.body);
        console.log('Contract Successfully Created');
        res.status(200).json(contract);
    } catch {
        res.status(500);
    }
});

//Retrieving using ExpressJS
app.get('/api/landlord', async (req, res) => {
    try {
        const landlord = await Landlord.find();
        console.log('Landlord Successfully Retrieved');
        res.status(200).json(landlord);
    } catch {
        res.status(500);
    }
});
app.get('/api/tenant', async (req, res) => {
    try {
        const tenant = await Tenant.find();
        console.log('Tenant Successfully Retrieved');
        res.status(200).json(tenant);
    } catch {
        res.status(500);
    }
});
app.get('/api/contract', async (req, res) => {
    try {
        const contract = await Contract.find();
        console.log('Contract Successfully Retrieved');
        res.status(200).json(contract);
    } catch {
        res.status(500);
    }
});

//Updating using ExpressJS
//Using the email address as the unique identifier
app.put('/api/landlord', async (req, res) => {
    try {
        const landlord = await Landlord.findOneAndUpdate({ emailAddress: req.body.emailAddress }, req.body, { new: true });
        console.log('Landlord Successfully Updated');
        res.status(200).json(landlord);
    } catch {
        res.status(500);
    }
});
app.put('/api/tenant', async (req, res) => {
    try {
        const tenant = await Tenant.findOneAndUpdate({ emailAddress: req.body.emailAddress }, req.body, { new: true });
        console.log('Tenant Successfully Updated');
        res.status(200).json(tenant);
    } catch {
        res.status(500);
    }
});
app.put('/api/contract', async (req, res) => {
    try {
        const contract = await Contract.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true });
        console.log('Contract Successfully Updated');
        res.status(200).json(contract);
    } catch {
        res.status(500);
    }
});

//Deleting using ExpressJS
//Using the email address as the unique identifier
app.delete('/api/landlord', async (req, res) => {
    try {
        const landlord = await Landlord.findOneAndDelete({ emailAddress: req.body.emailAddress });
        console.log('Landlord Successfully Deleted');
        res.status(200).json(landlord);
    } catch {
        res.status(500);
    }
});
app.delete('/api/tenant', async (req, res) => {
    try {
        const tenant = await Tenant.findOneAndDelete({ emailAddress: req.body.emailAddress });
        console.log('Tenant Successfully Deleted');
        res.status(200).json(tenant);
    } catch {
        res.status(500);
    }
});
app.delete('/api/contract', async (req, res) => {
    try {
        const contract = await Contract.findByIdAndDelete({ _id: req.body._id }, req.body, { new: true });
        console.log('Contract Successfully Deleted');
        res.status(200).json(contract);
    } catch {
        res.status(500);
    }
});