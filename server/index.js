require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ChatOpenAI } = require("@langchain/openai");

const app = express();
app.use(cors());
app.use(express.json());

// LangChain + OpenAI instance
const chat = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo",
  temperature: 1.0
});

app.get("/joke", async (req, res) => {
  try {
    const firstName = req.query.firstName || "Someone";

  // Use LangChain message objects for prompt
//   const { HumanMessage, SystemMessage } = require("@langchain/core/messages");
//     const response = await chat.call([
//       new SystemMessage("You are a funny comedian."),
//       new HumanMessage(`Tell me a short joke about a person named ${firstName}.`)
//     ]);

    // res.json({ joke: response.content });
    res.json({ joke: "Why did the chicken cross the road? To get to the other side!" });
  } catch (error) {
    console.error("Error generating joke:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start server
app.listen(3000, () => {
  console.log("✅ Server is running on http://localhost:3000");
});