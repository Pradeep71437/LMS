const jwt = require("jsonwebtoken")
const userschema = require("../models/userschema")

async function newcorsesAuth(req, res, next) {
    let token;
    
    // First check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }
    
    // If no token in header, check body
    if (!token && req.body.token) {
        token = req.body.token;
    }
    
    if (!token) {
        return res.status(401).json({ message: "Please login to your account" });
    }
    
    try {
        const decoded = jwt.verify(token, "process.env.SECRET-KEY");
        const user = await userschema.findById(decoded.id).select("-password");
        
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = newcorsesAuth