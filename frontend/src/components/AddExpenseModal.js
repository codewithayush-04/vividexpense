import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import axios from 'axios';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Education', 'Other'];

const AddExpenseModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().slice(0, 10),
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/expenses', {
        ...formData,
        amount: parseFloat(formData.amount),
      });
      toast.success('Expense added successfully');
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
        data-testid="add-expense-modal"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-heading font-bold text-[#0F172A]">Add Expense</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            data-testid="close-modal-button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="amount" className="text-[#0F172A] font-medium mb-2 block">
              Amount (₹)
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white text-2xl font-bold tabular-nums"
              required
              data-testid="amount-input"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-[#0F172A] font-medium mb-2 block">
              Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })} required>
              <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-slate-50" data-testid="category-select">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="text-[#0F172A] font-medium mb-2 block">
              Description
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="What did you spend on?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
              required
              data-testid="description-input"
            />
          </div>

          <div>
            <Label htmlFor="date" className="text-[#0F172A] font-medium mb-2 block">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
              required
              data-testid="date-input"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 rounded-full border-slate-200 hover:bg-slate-50"
              data-testid="cancel-button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 h-12 bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg hover:shadow-xl transition-all"
              data-testid="submit-expense-button"
            >
              {loading ? 'Adding...' : 'Add Expense'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddExpenseModal;