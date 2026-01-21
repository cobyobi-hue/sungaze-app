"use client";

import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, FileText, Shield, HelpCircle, Bug, Mail } from 'lucide-react';
import { ScreenShell } from '../ui/ScreenShell';

interface LegalScreenProps {
  onBack: () => void;
}

interface LegalItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  url?: string;
  action?: () => void;
}

export function LegalScreen({ onBack }: LegalScreenProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const [viewerTitle, setViewerTitle] = useState<string>('');

  const legalItems: LegalItem[] = [
    {
      id: 'privacy',
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your data',
      icon: <Shield className="w-5 h-5" />,
      url: 'https://sungaze.app/privacy-policy'
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      description: 'Terms of service and user agreement',
      icon: <FileText className="w-5 h-5" />,
      url: 'https://sungaze.app/terms-of-service'
    },
    {
      id: 'help',
      title: 'Help & Support',
      description: 'Get help with your account and app features',
      icon: <HelpCircle className="w-5 h-5" />,
      action: () => handleHelpSupport()
    },
    {
      id: 'bug',
      title: 'Report a Bug',
      description: 'Report issues or unexpected behavior',
      icon: <Bug className="w-5 h-5" />,
      action: () => handleReportBug()
    }
  ];

  const openInAppViewer = (title: string, url: string) => {
    setViewerTitle(title);
    setViewerUrl(url);
    setViewerOpen(true);
  };

  const handleOpenLink = async (item: LegalItem) => {
    if (item.url) {
      setLoading(item.id);
      try {
        // Policy fix: open in-app instead of external browser
        openInAppViewer(item.title, item.url);
      } catch (error) {
        console.error('Error opening link:', error);
      } finally {
        setTimeout(() => setLoading(null), 200);
      }
    } else if (item.action) {
      item.action();
    }
  };

  const handleHelpSupport = () => {
    console.log('Opening help & support');
    // In a real app, you would open a help screen or contact form
  };

  const handleReportBug = () => {
    console.log('Opening bug report');
    // In a real app, you would open a bug report form
  };

  const renderLegalItem = (item: LegalItem) => (
    <button
      key={item.id}
      onClick={() => handleOpenLink(item)}
      className="w-full flex items-center justify-between py-4 px-2 hover:bg-white/5 rounded-lg transition-colors"
      disabled={loading === item.id}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
          {item.icon}
        </div>
        <div className="text-left">
          <h3 className="text-body-md text-white font-medium">{item.title}</h3>
          <p className="text-body-sm text-white/60">{item.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {loading === item.id ? (
          <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          <ExternalLink className="w-4 h-4 text-white/40" />
        )}
      </div>
    </button>
  );

  return (
    <ScreenShell>
      {/* In-app legal viewer modal */}
      {viewerOpen && viewerUrl && (
        <div className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm">
          <div className="absolute inset-0 max-w-3xl mx-auto bg-black/90 border-x border-white/10">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="text-white font-semibold truncate pr-3">{viewerTitle}</div>
              <button
                type="button"
                onClick={() => {
                  setViewerOpen(false);
                  setViewerUrl(null);
                }}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white"
              >
                Close
              </button>
            </div>
            <iframe
              src={viewerUrl}
              title={viewerTitle}
              className="w-full h-[calc(100vh-52px)]"
            />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <h1 className="text-xl text-white font-semibold">Legal & Support</h1>
        </div>

        {/* Legal Items */}
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 p-4 mb-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
          <div className="space-y-1">
            {legalItems.map((item, index) => (
              <div key={item.id}>
                {renderLegalItem(item)}
                {index < legalItems.length - 1 && (
                  <div className="border-t border-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <Mail className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-body-md text-white font-medium mb-2">
                Contact Us
              </h3>
              <p className="text-body-sm text-white/60 leading-relaxed mb-4">
                Need immediate assistance? Reach out to our support team.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-body-sm text-white/60">Email:</span>
                  <span className="text-body-sm text-blue-400">support@sungaze.app</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-body-sm text-white/60">Response time:</span>
                  <span className="text-body-sm text-white">Within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App Version */}
        <div className="mt-6 text-center">
          <p className="text-body-sm text-white/40">
            Sungaze App v1.0.0
          </p>
          <p className="text-body-sm text-white/40">
            © 2024 Sungaze. All rights reserved.
          </p>
        </div>
      </div>
    </ScreenShell>
  );
}
