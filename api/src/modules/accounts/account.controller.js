import * as AccountService from "./account.service.js";

export async function createAccount(req, res) {
  try {
    const { name, type, balance } = req.body;

    const account = await AccountService.create({
      name,
      type,
      balance,
      userId: req.userId,
    });

    return res.status(201).json(account);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
}

export async function findAllAccounts(req, res) {
  const accounts = await AccountService.findAllByUser(req.userId);
  return res.json(accounts);
}

export async function findAccountById(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const account = await AccountService.findById(Number(id), userId);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.json(account);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

export async function updateAccount(req, res) {
  const { id } = req.params;

  const { name, type, balance } = req.body;

  try {
    const updatedAccount = await AccountService.updateAccount(
      Number(id),
      req.userId,
      { name, type, balance },
    );

    return res.status(200).json(updatedAccount);
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.status(400).json({ message: "Unable to update account" });
  }
}

export async function deleteAccount(req, res) {
  const { id } = req.params;

  try {
    const deletedAccount = await AccountService.deleteAccount(
      Number(id),
      req.userId,
    );

    return res.json(deletedAccount);
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.status(400).json({ message: "Unable to delete account" });
  }
}
