import jwt from "jsonwebtoken";
import prisma from "../database/prisma.js";

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.userId,
        active: true,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    req.userId = decoded.userId;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
