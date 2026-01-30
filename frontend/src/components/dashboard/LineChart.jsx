import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

const COLORS = {
    primary: "#317a6a",
    secondary: "#64748b",
}

export default function DashboardLineChart({ data }) {

    const formatCurrency = (value) =>
        new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
    return (
        <div className="cards rounded-lg p-4 shadow-sm h-[280px]">
            <h3 className="text-base tracking-wide text-gray-500 mb-3">
                Fluxo Financeiro
            </h3>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ bottom: 35, right: 40 }}>
                    <XAxis
                        dataKey="date"
                        tickMargin={20}
                        tick={{ fontSize: 14, fill: COLORS.secondary }}
                    />

                    <YAxis
                        tick={{ fontSize: 11, fill: COLORS.secondary }}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#317a6a34",
                            border: "1px solid #e5e7eb",
                            borderRadius: 6,
                            fontSize: 12,
                        }}
                        formatter={(_, __, { payload }) => [
                            <>
                                <div>
                                     <strong>Transação:{" "}</strong>
                                    <span
                                        style={{
                                            color: payload.type === "INCOME" ? "#16a34a" : "#dc2626",
                                        }}
                                    >
                                        {payload.type === "INCOME" ? "+" : "-"} {formatCurrency(payload.rawAmount)}
                                    </span>
                                </div>
                                <div>
                                    <strong>Saldo acumulado:</strong> {formatCurrency(payload.saldo)}
                                </div>
                            </>,
                        ]}
                    />

                    <Line
                        type="monotone"
                        dataKey="saldo"
                        stroke={COLORS.primary}
                        strokeWidth={2}
                        dot
                        activeDot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
