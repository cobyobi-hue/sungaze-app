"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Download, Users, Mail, Music, RefreshCw } from 'lucide-react';
import { resetOnboarding } from '../lib/consent';

interface FounderData {
  founderNumber: number;
  email: string;
  ritualEmail: string;
  purchaseDate: string;
  region: string;
  status: string;
}

interface FounderExportData {
  summary: {
    totalClaimed: number;
    remaining: number;
    maxFounders: number;
    isFullySubscribed: boolean;
  };
  founders: FounderData[];
}

export function FounderAdminPanel() {
  const [data, setData] = useState<FounderExportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const exportFounderData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/founders/stats', {
        method: 'POST', // POST method exports full data
      });
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setShowPanel(true);
      }
    } catch (error) {
      console.error('Failed to export founder data:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (!data) return;
    
    const csvContent = [
      // Headers
      'Founder Number,Email,Ritual Email,Purchase Date,Region,Status',
      // Data rows
      ...data.founders.map(f => 
        `${f.founderNumber},"${f.email}","${f.ritualEmail}","${f.purchaseDate}","${f.region}","${f.status}"`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sungaze-founders-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const emailsWithRitualAccess = data?.founders.filter(f => f.ritualEmail !== 'Not provided') || [];

  return (
    <div className="p-4">
      {/* Admin Trigger Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Button
          onClick={exportFounderData}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Users className="w-4 h-4 mr-2" />
          {loading ? 'Loading...' : 'View Founder Data'}
        </Button>
        
        <Button
          onClick={() => window.open('/admin/meditation-sounds', '_blank')}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Music className="w-4 h-4 mr-2" />
          Manage Meditation Sounds
        </Button>
        
        <Button
          onClick={resetOnboarding}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset Solar Oracle Onboarding
        </Button>
      </div>

      {/* Admin Panel */}
      {showPanel && data && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Founder Management</h2>
            <Button onClick={() => setShowPanel(false)} className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-3 py-1 text-sm">
              Close
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{data.summary.totalClaimed}</div>
              <div className="text-sm text-gray-600">Total Claimed</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{data.summary.remaining}</div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{emailsWithRitualAccess.length}</div>
              <div className="text-sm text-gray-600">Ritual Emails</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((data.summary.totalClaimed / data.summary.maxFounders) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-6">
            <Button onClick={downloadCSV} className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
            <Button
              onClick={() => {
                const emails = emailsWithRitualAccess.map(f => f.ritualEmail).join(', ');
                navigator.clipboard.writeText(emails);
                alert('Ritual emails copied to clipboard!');
              }}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Mail className="w-4 h-4 mr-2" />
              Copy Ritual Emails
            </Button>
          </div>

          {/* Founder List */}
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left">#</th>
                  <th className="px-3 py-2 text-left">Email</th>
                  <th className="px-3 py-2 text-left">Ritual Email</th>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left">Region</th>
                </tr>
              </thead>
              <tbody>
                {data.founders.map((founder) => (
                  <tr key={founder.founderNumber} className="border-t">
                    <td className="px-3 py-2 font-bold">#{founder.founderNumber}</td>
                    <td className="px-3 py-2">{founder.email}</td>
                    <td className="px-3 py-2">
                      {founder.ritualEmail === 'Not provided' ? (
                        <span className="text-gray-400">Not provided</span>
                      ) : (
                        <span className="text-green-600">{founder.ritualEmail}</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {new Date(founder.purchaseDate).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2 capitalize">{founder.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.summary.isFullySubscribed && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-bold text-red-800">🎉 All 444 Founder Spots Claimed!</h3>
              <p className="text-red-700 text-sm">
                The founding chapter is complete. Time to begin the global ritual.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}