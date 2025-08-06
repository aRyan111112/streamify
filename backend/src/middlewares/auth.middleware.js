import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized no token provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid token provided" })
        }

        const user = await User.findById(decoded.userId).select("-password");
        // console.log(user);

        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protect route", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}