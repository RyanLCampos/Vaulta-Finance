import { Pie, PieChart, Cell, Tooltip } from 'recharts';

export default function DashboardPieChart({ data, isAnimationActive = true }) {

    if (!data || data.length === 0) return null;

    const chartData = data.map((item, index) => ({
        ...item,
        fill: item.type === "EXPENSE" ? "#ef4444" : "#22c55e",
    }));


    return (
        <PieChart width={300} height={300}>
            <text
                x="50%"
                y="48%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#45a352"
                fontSize={18}
                fontWeight={600}
            >
                Categorias
            </text>

            <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#64748b"
                fontSize={14}
            >
                Transações
            </text>

            <Pie
                data={chartData}
                dataKey="amount"
                nameKey="name"
                innerRadius="80%"
                outerRadius="100%"
                cornerRadius="10%"
                paddingAngle={5}
                isAnimationActive={isAnimationActive}
            >

            </Pie>


            <Tooltip content={<CustomTooltip />} />
        </PieChart>
    );
}

function CustomTooltip({ active, payload }) {
    if (!active || !payload || payload.length === 0) return null;

    const { name, value, fill, payload: data } = payload[0];

    const isExpense = data.type === "EXPENSE";

    return (
        <div
            style={{
                background: '#1F3D2B',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#F5F5F5',
                boxShadow: '0 6px 16px rgba(0,0,0,0.35)',
                fontSize: '14px',
                minWidth: '120px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '6px',
                }}
            >
                <span
                    style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: fill,
                        marginRight: '8px',
                    }}
                />
                <strong>{name}</strong>
            </div>

            <div style={{ opacity: 0.85 }}>
                {isExpense ? "-" : ""}
                {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(value)}
            </div>
        </div>
    );
}