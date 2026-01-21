import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../shared/database/prisma.js";

export async function login({ email, password }) {
  const user = await prisma.user.findUnique({
    where: { email, active: true },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}
