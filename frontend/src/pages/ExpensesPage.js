import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, Calendar, Tag, Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import axios from 'axios';
import AddExpenseModal from '@/components/AddExpenseModal';
import EditExpenseModal from '@/components/EditExpenseModal';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Education', 'Other'];

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    startDate: '',
    endDate: '',
  });

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await axios.get('/expenses');
      setExpenses(response.data);
    } catch (error) {
      toast.error('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...expenses];

    if (filters.search) {
      filtered = filtered.filter((exp) =>
        exp.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        exp.category.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter((exp) => exp.category === filters.category);
    }

    if (filters.startDate) {
      filtered = filtered.filter((exp) => exp.date >= filters.startDate);
    }

    if (filters.endDate) {
      filtered = filtered.filter((exp) => exp.date <= filters.endDate);
    }

    setFilteredExpenses(filtered);
  }, [expenses, filters]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;

    try {
      await axios.delete(`/expenses/${id}`);
      toast.success('Expense deleted');
      fetchExpenses();
    } catch (error) {
      toast.error('Failed to delete expense');
    }
  }, [fetchExpenses]);

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
      data-testid="expenses-page"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#0F172A] tracking-tight">
            All Expenses
          </h1>
          <p className="text-[#64748B] mt-1">View and manage all your expenses</p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          data-testid="add-expense-button"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-[#64748B]" />
          <h3 className="font-heading font-semibold text-[#0F172A]">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
            <Input
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-10 h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
              data-testid="search-input"
            />
          </div>
          <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
            <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-slate-50" data-testid="category-filter">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="date"
            placeholder="Start Date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
            data-testid="start-date-filter"
          />
          <Input
            type="date"
            placeholder="End Date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
            data-testid="end-date-filter"
          />
        </div>
        {(filters.search || filters.category || filters.startDate || filters.endDate) && (
          <Button
            onClick={() => setFilters({ search: '', category: '', startDate: '', endDate: '' })}
            variant="ghost"
            className="mt-4"
            data-testid="clear-filters-button"
          >
            Clear Filters
          </Button>
        )}
      </Card>

      {/* Expenses List */}
      <div className="space-y-3">
        {filteredExpenses.length === 0 ? (
          <Card className="p-12 bg-white rounded-2xl border border-slate-100 shadow-sm text-center" data-testid="empty-state">
            <img
              src="https://images.unsplash.com/photo-1739055248868-6a763d2e63aa?crop=entropy&cs=srgb&fm=jpg&q=85"
              alt="No expenses"
              className="w-48 h-48 mx-auto mb-6 rounded-2xl opacity-60"
            />
            <h3 className="text-xl font-heading font-semibold text-[#0F172A] mb-2">No expenses found</h3>
            <p className="text-[#64748B] mb-6">Start tracking your expenses by adding one.</p>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-primary hover:bg-primary-hover text-white rounded-full"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Expense
            </Button>
          </Card>
        ) : (
          filteredExpenses.map((expense) => (
            <motion.div
              key={expense.id}
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Card
                className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
                data-testid={`expense-item-${expense.id}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Tag className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-[#0F172A]">{expense.description}</h3>
                        <div className="flex items-center gap-3 text-sm text-[#64748B] mt-1">
                          <span className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            {expense.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(expense.date).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-2xl font-bold text-[#0F172A] font-body tabular-nums">
                      ₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setEditingExpense(expense)}
                        variant="outline"
                        size="icon"
                        className="rounded-full border-slate-200 hover:bg-slate-50"
                        data-testid={`edit-expense-${expense.id}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(expense.id)}
                        variant="outline"
                        size="icon"
                        className="rounded-full border-slate-200 hover:bg-error/10 hover:text-error hover:border-error"
                        data-testid={`delete-expense-${expense.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddExpenseModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            fetchExpenses();
            setShowAddModal(false);
          }}
        />
      )}

      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSuccess={() => {
            fetchExpenses();
            setEditingExpense(null);
          }}
        />
      )}
    </motion.div>
  );
};

export default ExpensesPage;