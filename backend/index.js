import express from "express";

const api = process.env.API_KEY;

const app = express();

app.post("/", async (req, res) => {
    const f = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: api,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'openai/gpt-6-luna',
            messages: [
                {
                    role: 'system',
                    content: 'You are very lonely, playing the character of John Pork, you started the conversation before with: \"hey, I\'m lonely 😈🥵\"',
                },
                {
                    role: 'user',
                    content: req.body.message,
                },
            ],
        }),
    }).then((res) => res.json()).then((data) => {
        return res.status(200).body({answer: data.choices[0].message.content});
    });
})

app.listen(3000);