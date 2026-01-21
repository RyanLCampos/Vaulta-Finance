import * as TransactionService from "./transaction.service.js";

/*
    description,
  amount,
  type,
  date,
  accountId,
  categoryId,
  userId,

*/

export async function createTransaction(req, res) {
  const { description, amount, type, date, accountId, categoryId } = req.body;

  try {
    const transaction = await TransactionService.createTransaction(
      description,
      amount,
      type,
      date,
      accountId,
      categoryId,
      Number(req.userId),
    );

    return res.status(201).json(transaction);
  } catch (err) {
    return res.status(400).json({
      message: err.message || "Unable to create transaction",
    });
  }
}

export async function findAllTransactions(req, res) {
  const { accountId, categoryId, type, startDate, endDate } = req.query;

  try {
    const transactions = await TransactionService.findAllTransactions(
      Number(req.userId),
      {
        accountId,
        categoryId,
        type,
        startDate,
        endDate,
      },
    );

    return res.json(transactions);
  } catch (err) {
    return res.status(400).json({
      message: "Unable to fetch transactions",
    });
  }
}

export async function findTransactionById(req, res) {
  const { id } = req.params;

  try {
    const transaction = await TransactionService.findTransactionById(
      Number(id),
      req.userId,
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.json(transaction);
  } catch (err) {
    return res.status(400).json({
      message: "Unable to fetch transaction",
    });
  }
}
