import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Workflows from './pages/Workflows';
import Social from './pages/Social';
import Email from './pages/Email';
import Community from './pages/Community';
import Influencers from './pages/Influencers';
import Content from './pages/Content';
import Finance from './pages/Finance';
import Kickstarter from './pages/Kickstarter';
import Testing from './pages/Testing';
import SettingsPage from './pages/Settings';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/workflows' element={<Workflows />} />
          <Route path='/social' element={<Social />} />
          <Route path='/email' element={<Email />} />
          <Route path='/community' element={<Community />} />
          <Route path='/influencers' element={<Influencers />} />
          <Route path='/content' element={<Content />} />
          <Route path='/finance' element={<Finance />} />
          <Route path='/kickstarter' element={<Kickstarter />} />
          <Route path='/testing' element={<Testing />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
