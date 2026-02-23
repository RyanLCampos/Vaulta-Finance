export const transactionByPeriod = (transactions = [], period = "daily") => {
  if (!transactions.length) return [];

  let grouped = {};

  transactions.forEach((t) => {
    const dateObj = new Date(t.date);
    let key = "";
    let display = "";

    switch (period) {
      case "daily":
        key = dateObj.toISOString().split("T")[0];
        display = dateObj.toLocaleDateString("pt-BR");
        break;

      case "weekly":
        const onejan = new Date(dateObj.getFullYear(), 0, 1);
        const weekNumber = Math.ceil(
          ((dateObj - onejan) / 86400000 + onejan.getDay() + 1) / 7,
        );
        key = `${dateObj.getFullYear()}-W${weekNumber}`;
        display = `Semana ${weekNumber}`;
        break;

      case "monthly":
        key = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}`;
        display = dateObj.toLocaleString("pt-BR", {
          month: "short",
          year: "numeric",
        });
        break;

      case "yearByYear":
        key = dateObj.getFullYear();
        display = key.toString();
        break;

      default:
        key = t.id;
        display = dateObj.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });
    }

    if (!grouped[key]) grouped[key] = { saldo: 0, transactions: [], display };

    const signedAmount =
      t.type === "INCOME" ? Number(t.amount) : -Number(t.amount);
    grouped[key].saldo += signedAmount;
    grouped[key].transactions.push(t);
  });

  let cumulativeSaldo = 0;
  return Object.values(grouped)
    .sort(
      (a, b) =>
        new Date(a.transactions[0].date) - new Date(b.transactions[0].date),
    )
    .map((g) => {
      cumulativeSaldo += g.saldo;
      return {
        date: g.display,
        saldo: cumulativeSaldo,
        transactions: g.transactions,
      };
    });
};

export const expensesByCategory = (transactions = [], categories = []) => {
  if (!transactions.length || !categories.length) return [];

  const categoriesMap = new Map();

  categories.forEach((category) => {
    categoriesMap.set(category.id, category.name);
  });

  const amountCategories = new Map();

  transactions.forEach((transaction) => {
    /*
      LÓGICA:

      1. Extrai categoryId e amount da transaction
      2. Busca o nome da categoria no categoriesMap
      3. Verifica se a categoria já existe no amountCategories
      4. Se existir, soma o amount ao valor atual
      5. Se não existir, cria uma nova entrada com name e amount
    */

    const categoryId = transaction.category.id;
    const amount = Number(transaction.amount);
    console.log("CATEGORIES MAP", categoriesMap);
    const name = categoriesMap.get(categoryId);
    const type = transaction.type; // mesmo da categoria

    if (!categoryId) return;

    const current = amountCategories.get(categoryId);

    if (current) {
      current.amount += amount;
    } else {
      amountCategories.set(categoryId, {
        name,
        amount,
        type,
      });
    }
  });

  return Array.from(amountCategories.values());
};
