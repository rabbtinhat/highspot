const express = require('express');
const { Client } = require('@notionhq/client');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Notion client
const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

// Notion database ID
const databaseId = process.env.NOTION_DATABASE_ID;

// API endpoint to handle form submissions
app.post('/api/notion-signup', async (req, res) => {
    try {
        const { name, email, phone, experience, goals, plan, date } = req.body;
        
        // Create a new page in the Notion database
        const response = await notion.pages.create({
            parent: {
                database_id: databaseId,
            },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: name,
                            },
                        },
                    ],
                },
                Email: {
                    email: email,
                },
                Phone: {
                    rich_text: [
                        {
                            text: {
                                content: phone,
                            },
                        },
                    ],
                },
                Experience: {
                    select: {
                        name: experience,
                    },
                },
                Goals: {
                    rich_text: [
                        {
                            text: {
                                content: goals,
                            },
                        },
                    ],
                },
                Plan: {
                    select: {
                        name: plan,
                    },
                },
                "Sign Up Date": {
                    date: {
                        start: date,
                    },
                },
                Status: {
                    select: {
                        name: "New Lead",
                    },
                },
            },
        });
        
        res.status(200).json({ 
            success: true, 
            message: 'Data successfully submitted to Notion',
            id: response.id
        });
    } catch (error) {
        console.error('Error submitting to Notion:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to submit data to Notion',
            error: error.message
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 