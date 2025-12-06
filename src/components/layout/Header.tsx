import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, User, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export function Header() {
  const [countdown, setCountdown] = useState({
    days: 47,
    hours: 6,
    minutes: 23,
    seconds: 42,
  });

  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    Cookies.remove('session');
    navigate('/login');
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <header className='h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-40'>
      {/* Left: Breadcrumbs */}
      <div className='flex items-center gap-2 text-sm'>
        <span className='text-muted-foreground'>Dashboard</span>
        <span className='text-muted-foreground'>/</span>
        <span className='text-foreground font-medium'>Overview</span>
      </div>

      {/* Center: Search */}
      <div className='flex-1 max-w-md mx-8'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
          <Input
            placeholder='Search workflows, metrics...'
            className='pl-10 pr-16 bg-muted border-none h-10'
          />
          <div className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground'>
            <Command className='w-3 h-3' />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right: Actions & Countdown */}
      <div className='flex items-center gap-6'>
        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex items-center gap-3 glass-card px-4 py-2'
        >
          <span className='text-xs text-muted-foreground uppercase tracking-wider'>
            Launch in
          </span>
          <div className='flex items-center gap-1 font-mono text-sm'>
            <span className='text-primary font-bold glow-cyan'>
              {formatNumber(countdown.days)}
            </span>
            <span className='text-muted-foreground'>:</span>
            <span className='text-foreground'>
              {formatNumber(countdown.hours)}
            </span>
            <span className='text-muted-foreground'>:</span>
            <span className='text-foreground'>
              {formatNumber(countdown.minutes)}
            </span>
            <span className='text-muted-foreground'>:</span>
            <span className='text-foreground'>
              {formatNumber(countdown.seconds)}
            </span>
          </div>
        </motion.div>

        {/* Notifications */}
        <Button variant='ghost' size='icon' className='relative'>
          <Bell className='w-5 h-5 text-muted-foreground' />
          <span className='absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] font-bold flex items-center justify-center'>
            3
          </span>
        </Button>

        {/* Profile */}
        <Button onClick={() => setOpen(!open)} variant='ghost' size='icon'>
          <User className='w-5 h-5 text-muted-foreground' />
        </Button>
        {open && (
          <div className='absolute right-0 mt-24 w-20 bg-white border rounded-md shadow-lg z-50'>
            <Button
              onClick={handleLogout}
              className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
