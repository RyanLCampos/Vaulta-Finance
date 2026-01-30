import { useEffect, useState, useMemo } from "react"
import api from "../api/api.js"

/* COMPONENTS */
import DashboardLineChart from "../components/dashboard/LineChart"

/* UTILS */
import { formatCurrency, calculateTotals } from "../utils/format.js"
import { transactionByPeriod } from "../utils/dashboard.js"

export default function Dashboard() {
    const [accounts, setAccounts] = useState([])
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [period, setPeriod] = useState("daily")

    useEffect(() => {
        async function fetchData() {
            try {
                const [accountRes, transactionRes] = await Promise.all([
                    api.get("/accounts"),
                    api.get("/transactions"),
                ])

                setAccounts(accountRes.data)
                setTransactions(transactionRes.data)
            } catch (err) {
                console.error("Erro ao buscar dados:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, []);

    const { saldoTotal, despesas, ganhos, ultimaTransacao } = calculateTotals(accounts, transactions);

    const saldoPorData = useMemo(() => transactionByPeriod(transactions, period), [transactions, period]);

    if (loading) return <div className="text-center mt-10">Carregando...</div>;

    return (
        <div className="flex flex-col gap-6">
            {/* ================= DESKTOP ================= */}
            <div className="hidden md:flex flex-row gap-4 mb-6 w-[90%] mx-auto">
                <div className="flex-1 p-4 cards rounded-lg shadow-lg">
                    <p className="text-gray-500 text-sm">Saldo Total</p>
                    <h2 className="text-primary text-2xl font-semibold mt-1">
                        {formatCurrency(saldoTotal)}
                    </h2>
                    <p className="text-sm mt-1">
                        {ultimaTransacao ? (
                            <span className={ultimaTransacao.type === "INCOME" ? "text-green-500" : "text-red-500"}>
                                {ultimaTransacao.type === "INCOME" ? "+" : "-"} {formatCurrency(ultimaTransacao.amount)}
                            </span>
                        ) : (
                            <span className="text-gray-500">{formatCurrency(0)}</span>
                        )}
                    </p>
                </div>

                <div className="flex-1 p-4 cards rounded-lg shadow-lg">
                    <p className="text-gray-500 text-sm">Despesas</p>
                    <h2 className="text-primary text-2xl font-semibold mt-1">{formatCurrency(despesas)}</h2>
                </div>

                <div className="flex-1 p-4 cards rounded-lg shadow-lg">
                    <p className="text-gray-500 text-sm">Ganhos</p>
                    <h2 className="text-primary text-2xl font-semibold mt-1">{formatCurrency(ganhos)}</h2>
                </div>
            </div>

            {/* ================= MOBILE ================= */}
            <div className="flex md:hidden flex-col gap-4 mb-6 w-[90%] mx-auto">
                {/* Saldo Total */}
                <div className="w-full p-4 cards rounded-lg shadow-lg">
                    <p className="text-gray-500 text-sm">Saldo Total</p>
                    <h2 className="text-primary text-lg font-semibold mt-1">{formatCurrency(saldoTotal)}</h2>
                    <p className="text-sm mt-1">
                        {ultimaTransacao ? (
                            <span className={ultimaTransacao.type === "INCOME" ? "text-green-500" : "text-red-500"}>
                                {ultimaTransacao.type === "INCOME" ? "+" : "-"} {formatCurrency(ultimaTransacao.amount)}
                            </span>
                        ) : (
                            <span className="text-gray-500">{formatCurrency(0)}</span>
                        )}
                    </p>
                </div>

                {/* Despesas + Ganhos */}
                <div className="flex gap-4">
                    <div className="w-1/2 p-4 cards rounded-lg shadow-lg">
                        <p className="text-gray-500 text-sm">Despesas</p>
                        <h2 className="text-primary text-lg font-semibold mt-1">{formatCurrency(despesas)}</h2>
                    </div>

                    <div className="w-1/2 p-4 cards rounded-lg shadow-lg">
                        <p className="text-gray-500 text-sm">Ganhos</p>
                        <h2 className="text-primary text-lg font-semibold mt-1">{formatCurrency(ganhos)}</h2>
                    </div>
                </div>
            </div>

            {/* ================= FILTROS DE PERÍODO ================= */}
            <div className="flex gap-2 w-[90%] mx-auto mb-4 flex-wrap">
                {[
                    { key: "daily", label: "Diario" },
                    { key: "weekly", label: "Semanal" },
                    { key: "monthly", label: "Mensal" },
                    { key: "yearByYear", label: "Anual" },
                ].map((p) => (
                    <button
                        key={p.key}
                        onClick={() => setPeriod(p.key)}
                        className={`
                            px-4 py-2 text-sm md:text-base
                            rounded-lg font-medium transition-all duration-300 ease-in-out
                            ${period === p.key
                                ? "bg-white text-primary shadow-md"
                                : "text-white hover:bg-white hover:text-primary"}
            `}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            {/* ================= LINE CHART ================= */}
            <div className="w-[90%] mx-auto shadow-lg">
                <DashboardLineChart
                    data={saldoPorData.map((d) => ({
                        date: d.date,
                        saldo: d.saldo,
                        description: d.transactions.map((t) => t.description).join(", "),
                        type: d.transactions.length ? d.transactions[0].type : "INCOME",
                        rawAmount: d.transactions.reduce((acc, t) => acc + Number(t.amount), 0),
                    }))}
                    period={period}
                />
            </div>
        </div>
    )
}
