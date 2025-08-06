import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET_KEY;

if(!apiKey || !apiSecret) {
    console.error("Stream api key or secret is missing");
}

// To communicate with the stream
const streamClient = StreamChat.getInstance(apiKey, apiSecret);

// This method is used to create User in Stream, and if the user already exists it update it
export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.error("Error upserting user", error);
    }
}

export const generateStreamToken = async (userId) => {
    try {
        // ensure userId is a string
        const userIdStr = userId.toString();

        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.log("error generating stream token", error);
    }
    
}