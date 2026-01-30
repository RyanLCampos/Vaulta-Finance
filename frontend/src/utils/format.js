export const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export const calculateTotals = (accounts = [], transactions = []) => {
  const saldoTotal = accounts.reduce((acc, conta) => acc + Number(conta.balance), 0);
  const despesas = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, t) => acc + Number(t.amount), 0);
  const ganhos = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, t) => acc + Number(t.amount), 0);
  const ultimaTransacao = transactions.length ? transactions[0] : null;

  return { saldoTotal, despesas, ganhos, ultimaTransacao };
};
