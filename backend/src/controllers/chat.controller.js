import { generateStreamToken } from "../lib/stream.js";

export default function getStreamToken(req, res) {
    try{
        const token = generateStreamToken(req.user.id);
        if(!token){
            return res.status(500).json({ message: "Error generating Stream token" });
        }
        res.status(200).json({ token });
    } catch(error){
        console.error("Error getting Stream token:", error);
        res.status(500).json({ message: "Error getting Stream token", error });
    }
}