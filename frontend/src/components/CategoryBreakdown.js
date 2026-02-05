import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6'];

const CategoryBreakdown = ({ categories }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-xl shadow-xl p-4 border border-slate-100">
          <p className="text-sm text-[#64748B] mb-1">{payload[0].name}</p>
          <p className="text-lg font-bold text-[#0F172A] tabular-nums">
            ₹{payload[0].value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-[#64748B]">{payload[0].payload.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm h-full" data-testid="category-breakdown">
      <h3 className="text-xl font-heading font-semibold text-[#0F172A] mb-6">Top Categories</h3>
      {categories.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-[#64748B]">
          No data available
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="amount"
                nameKey="category"
              >
                {categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-3">
            {categories.map((cat, index) => (
              <div key={cat.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-[#64748B]">{cat.category}</span>
                </div>
                <span className="text-sm font-semibold text-[#0F172A] tabular-nums">
                  ₹{cat.amount.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

export default CategoryBreakdown;