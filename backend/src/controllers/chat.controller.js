import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
    try {
        const token = generateStreamToken(req.user.id);
        console.log("I am token here")
        res.status(200).json({ token });

    } catch (error) {
        console.log("error in getStreamToken", error.message);
        res.status(500).json({message: "Internal server error"});
    }
    
}