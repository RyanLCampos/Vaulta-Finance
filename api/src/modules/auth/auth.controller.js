import { login } from "./auth.service.js";

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const result = await login({
      email,
      password,
    });

    return res.json(result);
  } catch (err) {
    return res.status(401).json({
      message: err.message,
    });
  }
}
