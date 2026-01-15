"use client";

import React, { useMemo, useState } from "react";
import { X, Save, Clock, Calendar, MapPin, CloudSun, BadgeCheck } from "lucide-react";

export interface SessionDetailModalSession {
  date: string; // YYYY-MM-DD (local)
  sessionTime?: string;
  duration: number;
  timeOfDay: "sunrise" | "sunset" | "other";
  notes?: string;
  location?: { lat: number; lng: number };
  clientSessionId?: string;
  supabaseSessionId?: string;
  syncedToSupabase?: boolean;
}

interface SessionDetailModalProps {
  isOpen: boolean;
  session: SessionDetailModalSession | null;
  onClose: () => void;
  onSaveNotes: (notes: string) => Promise<void> | void;
}

export function SessionDetailModal({ isOpen, session, onClose, onSaveNotes }: SessionDetailModalProps) {
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const title = useMemo(() => {
    if (!session) return "Session";
    if (session.timeOfDay === "sunrise") return "Sunrise";
    if (session.timeOfDay === "sunset") return "Sunset";
    return "Practice";
  }, [session]);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  };

  const parseLocalDateKey = (dateKey: string) => {
    const [y, m, d] = dateKey.split("-").map((v) => parseInt(v, 10));
    if (!y || !m || !d) return new Date();
    return new Date(y, m - 1, d);
  };

  const formatSessionTime = (time?: string) => {
    if (!time) return "";
    if (/[AP]M/i.test(time)) return time;
    const match = time.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return time;
    const hours24 = parseInt(match[1], 10);
    const minutes = match[2];
    if (Number.isNaN(hours24)) return time;
    const isPM = hours24 >= 12;
    const hours12 = ((hours24 + 11) % 12) + 1;
    return `${hours12}:${minutes} ${isPM ? "PM" : "AM"}`;
  };

  // Reset notes when opening a different session
  React.useEffect(() => {
    if (!isOpen || !session) return;
    setNotes(session.notes || "");
  }, [isOpen, session?.clientSessionId, session?.supabaseSessionId, session?.date, session?.sessionTime]);

  if (!isOpen || !session) return null;

  const dateObj = parseLocalDateKey(session.date);
  const prettyDate = dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSaveNotes(notes);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-6">
      <div className="relative w-full max-w-md rounded-3xl p-[1px] bg-gradient-to-br from-yellow-400/30 via-white/10 to-orange-500/20 shadow-[0_16px_60px_rgba(0,0,0,0.75)]">
        <div className="relative overflow-hidden rounded-3xl bg-black/70 backdrop-blur-xl border border-white/10">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-yellow-400/20 via-orange-400/10 to-transparent blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-orange-500/15 via-yellow-400/10 to-transparent blur-3xl" />
          </div>
          <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-semibold tracking-wide text-lg">{title} Session</h2>
              <p className="text-white/60 text-sm">{prettyDate}{session.sessionTime ? ` • ${formatSessionTime(session.sessionTime)}` : ""}</p>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2 text-white/70 text-xs mb-1">
                <Clock className="w-3.5 h-3.5" />
                Duration
              </div>
              <div className="text-yellow-300 font-semibold">{formatTime(session.duration)}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2 text-white/70 text-xs mb-1">
                <Calendar className="w-3.5 h-3.5" />
                Date
              </div>
              <div className="text-white font-semibold">{prettyDate}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2 text-white/70 text-xs mb-1">
                <MapPin className="w-3.5 h-3.5" />
                Location
              </div>
              <div className="text-white/80 text-sm">
                {session.location ? `${session.location.lat.toFixed(3)}, ${session.location.lng.toFixed(3)}` : "—"}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2 text-white/70 text-xs mb-1">
                <CloudSun className="w-3.5 h-3.5" />
                Synced
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <BadgeCheck className={`w-4 h-4 ${session.syncedToSupabase ? "text-green-400" : "text-white/30"}`} />
                <span className={session.syncedToSupabase ? "text-green-400 font-semibold" : "text-white/50"}>
                  {session.syncedToSupabase ? "Saved" : "Pending"}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white/80 text-sm mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes…"
              rows={4}
              maxLength={500}
              className="w-full bg-black/45 border border-yellow-400/35 rounded-2xl p-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            />
            <div className="text-right text-xs text-white/50 mt-1">{notes.length}/500</div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_10px_30px_rgba(255,165,0,0.18)]"
            >
              {saving ? "Saving…" : (
                <>
                  <Save className="w-4 h-4" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}


