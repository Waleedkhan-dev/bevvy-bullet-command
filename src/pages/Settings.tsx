import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';
import {
  Settings,
  CreditCard,
  Bot,
  Database,
  Save,
  Target,
  Key,
} from 'lucide-react';

// --- Types based on "Bevvy Bullet" Architecture ---
interface CampaignSettings {
  campaignName: string;
  publicGoal: number; // $30,000
  targetGoal: number; // $100,000
  launchDate: string;
}

interface IntegrationSettings {
  stripePublicKey: string;
  stripeSecretKey: string;
  openaiApiKey: string;
  sendgridApiKey: string;
  supabaseUrl: string;
}

interface AIBrandSettings {
  toneOfVoice: string; // "Professional", "Exciting", etc.
  visualStyle: string; // For DALL-E/Midjourney prompts
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'integrations' | 'ai'>(
    'general'
  );
  const [isSaving, setIsSaving] = useState(false);

  // Mock Initial Data based on PDF Requirements
  const [campaignData, setCampaignData] = useState<CampaignSettings>({
    campaignName: 'Bevvy Bullet Kickstarter',
    publicGoal: 30000,
    targetGoal: 100000,
    launchDate: '2025-12-01',
  });

  const [integrationData, setIntegrationData] = useState<IntegrationSettings>({
    stripePublicKey: 'pk_test_...',
    stripeSecretKey: 'sk_test_...',
    openaiApiKey: 'sk-proj-...',
    sendgridApiKey: 'SG....',
    supabaseUrl: 'https://xyz.supabase.co',
  });

  const [aiData, setAiData] = useState<AIBrandSettings>({
    toneOfVoice: 'Innovative, Urgent, and Community-Focused',
    visualStyle:
      'Cyberpunk aesthetic, high contrast, neon lighting, product focused',
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <AppLayout>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='mb-8'
      >
        <h1 className='text-3xl font-mono font-bold text-foreground mb-2'>
          System <span className='text-primary glow-cyan'>Configuration</span>
        </h1>
        <p className='text-muted-foreground'>
          Manage your Phase 1 Foundation keys, goals, and AI parameters.
        </p>
      </motion.div>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className='w-full lg:w-64 flex flex-col gap-2'
        >
          <NavButton
            active={activeTab === 'general'}
            onClick={() => setActiveTab('general')}
            icon={<Target size={18} />}
            label='Campaign Goals'
          />
          <NavButton
            active={activeTab === 'integrations'}
            onClick={() => setActiveTab('integrations')}
            icon={<Key size={18} />}
            label='API Integrations'
          />
          <NavButton
            active={activeTab === 'ai'}
            onClick={() => setActiveTab('ai')}
            icon={<Bot size={18} />}
            label='AI Engine Config'
          />
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className='flex-1 glass-card p-8 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md'
        >
          {/* --- TAB: GENERAL CAMPAIGN SETTINGS --- */}
          {activeTab === 'general' && (
            <div className='space-y-6'>
              <div className='flex items-center gap-3 mb-6 border-b border-white/10 pb-4'>
                <Target className='text-primary' />
                <h2 className='text-xl font-semibold text-foreground'>
                  Campaign Targets
                </h2>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <InputGroup
                  label='Campaign Name'
                  value={campaignData.campaignName}
                  onChange={(v) =>
                    setCampaignData({ ...campaignData, campaignName: v })
                  }
                />
                <InputGroup
                  label='Launch Date'
                  type='date'
                  value={campaignData.launchDate}
                  onChange={(v) =>
                    setCampaignData({ ...campaignData, launchDate: v })
                  }
                />
                <InputGroup
                  label='Public Goal ($)'
                  type='number'
                  value={campaignData.publicGoal.toString()}
                  onChange={(v) =>
                    setCampaignData({
                      ...campaignData,
                      publicGoal: parseInt(v),
                    })
                  }
                />
                <InputGroup
                  label='Internal Target ($)'
                  type='number'
                  value={campaignData.targetGoal.toString()}
                  onChange={(v) =>
                    setCampaignData({
                      ...campaignData,
                      targetGoal: parseInt(v),
                    })
                  }
                />
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className='space-y-6'>
              <div className='flex items-center gap-3 mb-6 border-b border-white/10 pb-4'>
                <CreditCard className='text-primary' />
                <h2 className='text-xl font-semibold text-foreground'>
                  External Services (Phase 1)
                </h2>
              </div>

              <div className='space-y-4'>
                <h3 className='text-sm font-mono text-primary/80 uppercase'>
                  Stripe ($1 VIP Flow)
                </h3>
                <div className='grid grid-cols-1 gap-4'>
                  <InputGroup
                    label='Stripe Public Key'
                    type='password'
                    value={integrationData.stripePublicKey}
                    onChange={(v) =>
                      setIntegrationData({
                        ...integrationData,
                        stripePublicKey: v,
                      })
                    }
                  />
                  <InputGroup
                    label='Stripe Secret Key'
                    type='password'
                    value={integrationData.stripeSecretKey}
                    onChange={(v) =>
                      setIntegrationData({
                        ...integrationData,
                        stripeSecretKey: v,
                      })
                    }
                  />
                </div>

                <div className='h-px bg-white/10 my-4' />

                <h3 className='text-sm font-mono text-primary/80 uppercase'>
                  AI & Database
                </h3>
                <div className='grid grid-cols-1 gap-4'>
                  <InputGroup
                    label='OpenAI API Key (GPT-4/DALL-E)'
                    type='password'
                    value={integrationData.openaiApiKey}
                    onChange={(v) =>
                      setIntegrationData({
                        ...integrationData,
                        openaiApiKey: v,
                      })
                    }
                  />
                  <InputGroup
                    label='Supabase URL'
                    value={integrationData.supabaseUrl}
                    onChange={(v) =>
                      setIntegrationData({ ...integrationData, supabaseUrl: v })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className='space-y-6'>
              <div className='flex items-center gap-3 mb-6 border-b border-white/10 pb-4'>
                <Bot className='text-primary' />
                <h2 className='text-xl font-semibold text-foreground'>
                  AI Content Engine
                </h2>
              </div>

              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-muted-foreground mb-2'>
                    Brand Tone of Voice
                  </label>
                  <textarea
                    className='w-full h-24 bg-black/20 border border-white/10 rounded-lg p-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none'
                    value={aiData.toneOfVoice}
                    onChange={(e) =>
                      setAiData({ ...aiData, toneOfVoice: e.target.value })
                    }
                  />
                  <p className='text-xs text-muted-foreground mt-1'>
                    Used by GPT-4 for caption generation.
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-muted-foreground mb-2'>
                    Visual Style Guidelines
                  </label>
                  <textarea
                    className='w-full h-24 bg-black/20 border border-white/10 rounded-lg p-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none'
                    value={aiData.visualStyle}
                    onChange={(e) =>
                      setAiData({ ...aiData, visualStyle: e.target.value })
                    }
                  />
                  <p className='text-xs text-muted-foreground mt-1'>
                    Used by DALL-E/Midjourney for image generation.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className='mt-8 pt-6 border-t border-white/10 flex justify-end'>
            <button
              onClick={handleSave}
              className='flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all active:scale-95'
            >
              <Save size={18} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}

// --- Helper Components ---

function NavButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-primary/20 text-primary border border-primary/30'
          : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function InputGroup({
  label,
  type = 'text',
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-medium text-muted-foreground'>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors'
      />
    </div>
  );
}
