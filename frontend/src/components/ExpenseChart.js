import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ExpenseChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-xl shadow-xl p-4 border border-slate-100">
          <p className="text-sm text-[#64748B] mb-1">{payload[0].payload.date}</p>
          <p className="text-lg font-bold text-[#0F172A] tabular-nums">
            ₹{payload[0].value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm" data-testid="expense-chart">
      <h3 className="text-xl font-heading font-semibold text-[#0F172A] mb-6">Daily Spending</h3>
      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-[#64748B]">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="date"
              stroke="#64748B"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#64748B"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ fill: '#6366F1', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default ExpenseChart;