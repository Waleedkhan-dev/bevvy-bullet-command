import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-background grid-pattern'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center glass-card p-12'
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className='mb-6'
        >
          <Rocket className='w-20 h-20 text-primary mx-auto glow-cyan' />
        </motion.div>
        <h1 className='mb-4 text-6xl font-mono font-bold text-foreground'>
          4<span className='text-primary'>0</span>4
        </h1>
        <p className='mb-8 text-xl text-muted-foreground'>
          Mission control lost contact with this page
        </p>
        <Button
          asChild
          size='lg'
          className='bg-primary hover:bg-primary/90 text-primary-foreground'
        >
          <Link to='/'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Return to Dashboard
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
