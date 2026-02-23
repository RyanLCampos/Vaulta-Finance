import * as UserService from "./user.service.js";

export async function createUser(req, res) {
  try {
    const user = await UserService.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
}

export async function findUserById(req, res) {
  const { id } = req.params;

  const user = await UserService.findById(Number(id));

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json(user);
}

export async function updateUser(req, res) {
  const { id } = req.params;

  const { name, email, password } = req.body;

  // Garante que o usuário só atualize o próprio perfil
  if (parseInt(id) !== req.userId) {
    return res.status(403).json({ message: "Access denied" });
  }

  const passwordChanged = !!password;

  try {
    const updatedUser = await UserService.updateUser(Number(id), {
      name, email, password
    });

    if(passwordChanged) {
      return res.json({
        message: "Password changed. Please log in again."
      })
    }

    return res.json(updatedUser);
  } catch (err) {
    if(err.code === "P2002") {
      return res.status(400).json({ message: "Email already in use"})
    }
    return res.status(500).json({ message: "Internal Error"})
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;

  if(Number(id) !== req.userId) {
    return res.status(403).json({ message: "Access denied"});
  }

  try {
    await UserService.deleteUser(Number(id));

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: "Internal error"});
  }
}