import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, Tag } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const RecentExpenses = ({ month, onUpdate }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentExpenses();
  }, [month]);

  const fetchRecentExpenses = async () => {
    try {
      // Calculate date range
      const [year, monthNum] = month.split('-');
      const startDate = `${year}-${monthNum}-01`;
      let endDate;
      if (parseInt(monthNum) === 12) {
        endDate = `${parseInt(year) + 1}-01-01`;
      } else {
        endDate = `${year}-${(parseInt(monthNum) + 1).toString().padStart(2, '0')}-01`;
      }

      const response = await axios.get(`/expenses?start_date=${startDate}&end_date=${endDate}`);
      setExpenses(response.data.slice(0, 5)); // Get only 5 most recent
    } catch (error) {
      toast.error('Failed to fetch recent expenses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm" data-testid="recent-expenses">
      <h3 className="text-xl font-heading font-semibold text-[#0F172A] mb-6">Recent Expenses</h3>
      {expenses.length === 0 ? (
        <div className="text-center py-8 text-[#64748B]">
          No expenses for this month yet
        </div>
      ) : (
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              data-testid={`recent-expense-${expense.id}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Tag className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-[#0F172A]">{expense.description}</p>
                  <div className="flex items-center gap-3 text-sm text-[#64748B] mt-1">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {expense.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(expense.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-lg font-bold text-[#0F172A] tabular-nums">
                ₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentExpenses;