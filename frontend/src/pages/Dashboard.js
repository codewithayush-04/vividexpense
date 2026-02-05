import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, TrendingDown, Wallet, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';
import AddExpenseModal from '@/components/AddExpenseModal';
import ExpenseChart from '@/components/ExpenseChart';
import CategoryBreakdown from '@/components/CategoryBreakdown';
import RecentExpenses from '@/components/RecentExpenses';

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    fetchSummary();
  }, [currentMonth]);

  const fetchSummary = async () => {
    try {
      const response = await axios.get(`/expenses/summary/monthly?month=${currentMonth}`);
      setSummary(response.data);
    } catch (error) {
      toast.error('Failed to fetch summary');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    try {
      const response = await axios.get(`/expenses/export/${format}?month=${currentMonth}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `expenses_${currentMonth}.${format === 'pdf' ? 'pdf' : 'xlsx'}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(`Exported to ${format.toUpperCase()}`);
    } catch (error) {
      toast.error('Export failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
      data-testid="dashboard"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#0F172A] tracking-tight">
            Dashboard
          </h1>
          <p className="text-[#64748B] mt-1">Track your expenses and manage your budget</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button
            onClick={() => handleExport('pdf')}
            variant="outline"
            className="rounded-full border-slate-200 hover:bg-slate-50"
            data-testid="export-pdf-button"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button
            onClick={() => handleExport('excel')}
            variant="outline"
            className="rounded-full border-slate-200 hover:bg-slate-50"
            data-testid="export-excel-button"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            data-testid="add-expense-button"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Month Selector */}
      <Card className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-[#64748B]" />
          <input
            type="month"
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            data-testid="month-selector"
          />
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Card className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow" data-testid="total-expenses-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <TrendingDown className="w-5 h-5 text-error" />
            </div>
            <p className="text-[#64748B] text-sm mb-1">Total Expenses</p>
            <p className="text-3xl font-bold text-[#0F172A] font-body tabular-nums">
              ₹{summary?.total_expenses?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
            </p>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Card className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow" data-testid="total-transactions-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <p className="text-[#64748B] text-sm mb-1">Total Transactions</p>
            <p className="text-3xl font-bold text-[#0F172A] font-body tabular-nums">
              {summary?.total_count || 0}
            </p>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Card className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow" data-testid="average-expense-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
            <p className="text-[#64748B] text-sm mb-1">Average Per Day</p>
            <p className="text-3xl font-bold text-[#0F172A] font-body tabular-nums">
              ₹{summary ? (summary.total_expenses / (summary.daily_expenses.length || 1)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Charts Grid - Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Chart */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9">
          <ExpenseChart data={summary?.daily_expenses || []} />
        </div>

        {/* Category Breakdown */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <CategoryBreakdown categories={summary?.top_categories || []} />
        </div>
      </div>

      {/* Recent Expenses */}
      <RecentExpenses month={currentMonth} onUpdate={fetchSummary} />

      {/* Add Expense Modal */}
      {showAddModal && (
        <AddExpenseModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            fetchSummary();
            setShowAddModal(false);
          }}
        />
      )}
    </motion.div>
  );
};

export default Dashboard;