import { useEffect, useState, useMemo } from "react";
import api from "../api/api.js";

/* COMPONENTS */
import DashboardLineChart from "../components/dashboard/LineChart";
import DashboardPieChart from "../components/dashboard/PieChart.jsx";
import PeriodSelector from "../components/dashboard/PeriodSelector.jsx";
import AccountSelector from "../components/dashboard/AccountSelector";

/* UTILS */
import { formatCurrency, calculateTotals } from "../utils/format.js";
import { expensesByCategory, transactionByPeriod } from "../utils/dashboard.js";

export default function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("daily");
  const [selectedAccountId, setSelectedAccountId] = useState(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const accountRes = await api.get("/accounts");
        setAccounts(accountRes.data);

        if (accountRes.data.length > 0) {
          setSelectedAccountId(accountRes.data[0].id);
        }

        const categoriesRes = await api.get(
          `/accounts/${accountRes.data[0].id}/categories`
        );
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setCategories([]);
  }, [selectedAccountId]);


  useEffect(() => {
    async function fetchCategoriesByAccount() {
      if (!selectedAccountId) return;

      try {
        const res = await api.get(
          `/accounts/${selectedAccountId}/categories`
        );
        setCategories(res.data);
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
        setCategories([]);
      }
    }

    fetchCategoriesByAccount();
  }, [selectedAccountId]);

  useEffect(() => {
    async function fetchTransactions() {
      if (!selectedAccountId) return;

      setLoading(true);
      try {
        const res = await api.get(
          `/accounts/${selectedAccountId}/transactions`
        );
        setTransactions(res.data);
      } catch (err) {
        console.error("Erro ao buscar transações:", err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [selectedAccountId]);

  const selectedAccount = useMemo(
    () => accounts.find((a) => a.id === selectedAccountId),
    [accounts, selectedAccountId]
  );

  const { despesas, ganhos, ultimaTransacao } = useMemo(() => {
    if (!selectedAccount) {
      return { despesas: 0, ganhos: 0, ultimaTransacao: null };
    }
    return calculateTotals([selectedAccount], transactions);
  }, [selectedAccount, transactions]);

  const saldoPorData = useMemo(
    () => transactionByPeriod(transactions, period),
    [transactions, period]
  );

  const despesaPorCategoria = useMemo(() => {
    if (!transactions.length || !categories.length) return [];
    return expensesByCategory(transactions, categories);
  }, [transactions, categories]);

  if (loading) {
    return <div className="text-center mt-10">Carregando...</div>;
  }

  return (
    <div className="flex flex-col gap-6 pb-10">
      <AccountSelector
        selectedAccount={selectedAccountId}
        setSelectedAccount={setSelectedAccountId}
        accounts={accounts.map((a) => ({
          value: a.id,
          label: a.name,
        }))}
      />

      {/* MOBILE */}
      <div className="w-[90%] mx-auto md:hidden grid grid-cols-2 gap-4">
        <div className="p-4 cards rounded-lg shadow-lg col-span-2">
          <p className="text-gray-500 text-xs">
            Saldo • {selectedAccount?.name}
          </p>
          <h2 className="text-primary text-base font-semibold">
            {formatCurrency(selectedAccount?.balance || 0)}
          </h2>
          <p className="text-xs mt-1">
            {ultimaTransacao ? (
              <span
                className={
                  ultimaTransacao.type === "INCOME"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {ultimaTransacao.type === "INCOME" ? "+" : "-"}{" "}
                {formatCurrency(ultimaTransacao.amount)}
              </span>
            ) : (
              <span className="text-gray-500">
                {formatCurrency(0)}
              </span>
            )}
          </p>
        </div>

        <div className="p-4 cards rounded-lg shadow-lg">
          <p className="text-gray-500 text-xs">Despesas</p>
          <h2 className="text-primary text-base font-semibold">
            {formatCurrency(despesas)}
          </h2>
        </div>

        <div className="p-4 cards rounded-lg shadow-lg">
          <p className="text-gray-500 text-xs">Ganhos</p>
          <h2 className="text-primary text-base font-semibold">
            {formatCurrency(ganhos)}
          </h2>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="w-[90%] mx-auto hidden md:grid grid-cols-3 gap-4">
        <div className="p-4 cards rounded-lg shadow-lg">
          <p className="text-gray-500 text-sm">
            Saldo • {selectedAccount?.name}
          </p>
          <h2 className="text-primary text-xl font-semibold">
            {formatCurrency(selectedAccount?.balance || 0)}
          </h2>
        </div>

        <div className="p-4 cards rounded-lg shadow-lg">
          <p className="text-gray-500 text-sm">Despesas</p>
          <h2 className="text-primary text-xl font-semibold">
            {formatCurrency(despesas)}
          </h2>
        </div>

        <div className="p-4 cards rounded-lg shadow-lg">
          <p className="text-gray-500 text-sm">Ganhos</p>
          <h2 className="text-primary text-xl font-semibold">
            {formatCurrency(ganhos)}
          </h2>
        </div>
      </div>

      <PeriodSelector period={period} setPeriod={setPeriod} />

      <div className="w-[90%] mx-auto shadow-lg">
        <DashboardLineChart
          data={saldoPorData.map((d) => ({
            date: d.date,
            saldo: d.saldo,
            description: d.transactions
              .map((t) => t.description)
              .join(", "),
            type: d.transactions[0]?.type || "INCOME",
            rawAmount: d.transactions.reduce(
              (acc, t) => acc + Number(t.amount),
              0
            ),
          }))}
          period={period}
        />
      </div>

      <div className="w-[90%] mx-auto flex gap-6 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:snap-none lg:grid-cols-3">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="flex justify-center p-4 cards rounded-lg shadow-lg min-w-[90%] snap-center md:min-w-0"
          >
            <DashboardPieChart
              data={despesaPorCategoria.map((c) => ({
                name: c.name,
                amount: c.amount,
                type: c.type,
              }))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
