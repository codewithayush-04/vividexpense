import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import axios from 'axios';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;
      
      const response = await axios.post(endpoint, payload);
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
      onLogin(response.data.token, response.data.user);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-5xl font-heading font-bold text-[#0F172A] mb-3 tracking-tight">
              VividSpend
            </h1>
            <p className="text-lg text-[#64748B]">
              {isLogin ? 'Welcome back! Sign in to continue.' : 'Create your account to get started.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" data-testid="auth-form">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-[#0F172A] font-medium mb-2 block">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] w-5 h-5" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-12 h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary transition-all"
                    required
                    data-testid="name-input"
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-[#0F172A] font-medium mb-2 block">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-12 h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary transition-all"
                  required
                  data-testid="email-input"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-[#0F172A] font-medium mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] w-5 h-5" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-12 h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary transition-all"
                  required
                  data-testid="password-input"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white rounded-full h-12 font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              data-testid="auth-submit-button"
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#64748B] hover:text-primary transition-colors"
              data-testid="toggle-auth-mode"
            >
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <span className="font-semibold text-primary">
                {isLogin ? 'Sign up' : 'Sign in'}
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Right side - Hero Image */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex flex-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 items-center justify-center p-8"
      >
        <div className="text-center text-white">
          <img
            src="https://images.unsplash.com/photo-1646015047570-891526ba5259?crop=entropy&cs=srgb&fm=jpg&q=85"
            alt="Abstract 3D shapes"
            className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl mb-8"
          />
          <h2 className="text-4xl font-heading font-bold mb-4">Track Every Rupee</h2>
          <p className="text-xl opacity-90">Your personal finance companion</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;