const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const connectDB = require('./db');
const Message = require('./Models/Message');
const Rating = require('./Models/Rating');

// Connect to MongoDB
connectDB();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Define routes for different pages
app.get('/home-page', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/home_page.html'));
});

app.get('/about-us', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/About_Us.html'));
});

app.get('/contact-us', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/Contact_Us.html'));
});

app.get('/destination', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/Destination.html'));
});

app.get('/current-traffic', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/current-Traffic.html'));
});

// Route to handle form submission for destination
app.post('/destination', (req, res) => {
    const { destination } = req.body;
    console.log(`Received destination: ${destination}`);
    // Process the destination data (e.g., integrate with mapping service)
    res.json({ success: true, message: `Destination ${destination} received` });
});

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();
        console.log(`Received message from ${name} (${email}) - Subject: ${subject} - Message: ${message}`);
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.post('/submit-rating', async (req, res) => {
    const { rating, reasoning } = req.body;
    try {
        const newRating = new Rating({ rating, reasoning });
        await newRating.save();
        console.log(`Received rating: ${rating} - Reasoning: ${reasoning}`);
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving rating:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
