import * as TransactionService from "./transaction.service.js";

export async function createTransaction(req, res) {
  const { description, amount, type, date, categoryId } = req.body;
  const { accountId } = req.params;

  try {
    const transaction = await TransactionService.createTransaction(
      description,
      amount,
      type,
      date,
      Number(accountId),
      Number(categoryId),
      req.userId,
    );

    return res.status(201).json(transaction);
  } catch (err) {
    return res.status(400).json({
      message: err.message || "Unable to create transaction",
    });
  }
}

export async function findAllTransactions(req, res) {
  const { categoryId, type, startDate, endDate } = req.query;
  const { accountId } = req.params;

  try {
    const transactions = await TransactionService.findAllTransactions(
      Number(accountId),
      req.userId,
      {
        categoryId,
        type,
        startDate,
        endDate,
      },
    );

    return res.json(transactions);
  } catch (err) {
    return res.status(400).json({
      message: err.message || "Unable to fetch transactions",
    });
  }
}

export async function findTransactionById(req, res) {
  const { accountId, id } = req.params;

  try {
    const transaction = await TransactionService.findTransactionById(
      Number(id),
      Number(accountId),
      req.userId,
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.json(transaction);
  } catch (err) {
    return res.status(400).json({
      message: err.message || "Unable to fetch transaction",
    });
  }
}
