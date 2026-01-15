"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, Download, Search, Calendar, Clock, Flame } from "lucide-react";
import { localStorage, type PracticeSession } from "../lib/storage";
import {
  listSungazingSessions,
  updateSungazingSessionNotesById,
  type SungazingSessionRow,
} from "../lib/supabase/sungazingSessions";
import { SessionDetailModal, type SessionDetailModalSession } from "./SessionDetailModal";

type RangeFilter = "today" | "7d" | "30d" | "all";

export function SessionHistoryScreen({ onBack }: { onBack: () => void }) {
  const [isMounted, setIsMounted] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentProgress, setCurrentProgress] = useState<any>(null);
  const [supabaseSessions, setSupabaseSessions] = useState<SungazingSessionRow[]>([]);
  const [supabaseLoading, setSupabaseLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [range, setRange] = useState<RangeFilter>("all");

  const [selectedSession, setSelectedSession] = useState<SessionDetailModalSession | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") setIsMounted(true);
  }, []);

  // Refresh when sessions are added/updated
  useEffect(() => {
    if (typeof window === "undefined" || !isMounted) return;
    const handler = () => setRefreshKey((v) => v + 1);
    window.addEventListener("sessionCompleted", handler);
    return () => window.removeEventListener("sessionCompleted", handler);
  }, [isMounted]);

  const toLocalDateKey = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const parseLocalDateKey = (dateKey: string) => {
    const [y, m, d] = dateKey.split("-").map((v) => parseInt(v, 10));
    if (!y || !m || !d) return new Date();
    return new Date(y, m - 1, d);
  };

  const formatDate = (dateKey: string) => {
    const date = parseLocalDateKey(dateKey);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
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

  // Local progress
  useEffect(() => {
    if (typeof window === "undefined" || !isMounted) return;
    try {
      const userProgress = localStorage.getUserProgress();
      if (!userProgress || !Array.isArray(userProgress.practiceHistory)) {
        setCurrentProgress({
          currentDay: 1,
          totalPractices: 0,
          currentStreak: 0,
          longestStreak: 0,
          lastPracticeDate: null,
          practiceHistory: [],
        });
      } else {
        setCurrentProgress(userProgress);
      }
    } catch {
      setCurrentProgress({
        currentDay: 1,
        totalPractices: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastPracticeDate: null,
        practiceHistory: [],
      });
    }
  }, [isMounted, refreshKey]);

  // Supabase sessions (best-effort)
  useEffect(() => {
    if (typeof window === "undefined" || !isMounted) return;
    let cancelled = false;
    const run = async () => {
      try {
        setSupabaseLoading(true);
        const rows = await listSungazingSessions({ limit: 500 });
        if (!cancelled) setSupabaseSessions(rows);
      } catch {
        // ignore
      } finally {
        if (!cancelled) setSupabaseLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [isMounted, refreshKey]);

  const supabaseAsPracticeSessions = useMemo<PracticeSession[]>(() => {
    return (supabaseSessions || []).map((s) => {
      const dt = new Date(s.session_date);
      const dateKey = toLocalDateKey(dt);
      const sessionTime =
        s.session_time || `${String(dt.getHours()).padStart(2, "0")}:${String(dt.getMinutes()).padStart(2, "0")}`;

      return {
        clientSessionId: s.client_session_id ?? undefined,
        supabaseSessionId: s.id,
        syncedToSupabase: true,
        date: dateKey,
        duration: s.duration_seconds,
        timeOfDay: (s.session_type === "practice" ? "other" : s.session_type) as PracticeSession["timeOfDay"],
        sessionTime,
        location:
          s.location_lat != null && s.location_lng != null ? { lat: s.location_lat, lng: s.location_lng } : undefined,
        notes: s.notes ?? undefined,
      };
    });
  }, [supabaseSessions]);

  const mergedSessionsAll = useMemo<PracticeSession[]>(() => {
    const local = (currentProgress?.practiceHistory || []) as PracticeSession[];
    const merged: PracticeSession[] = [];
    const seen = new Set<string>();

    const stableKey = (s: PracticeSession) => `stable:${s.date}:${s.sessionTime || ""}:${s.duration}:${s.timeOfDay}`;

    for (const s of supabaseAsPracticeSessions) {
      const primaryKey = s.clientSessionId || `supabase:${s.supabaseSessionId}`;
      if (seen.has(stableKey(s))) continue;
      seen.add(primaryKey);
      seen.add(stableKey(s));
      merged.push(s);
    }

    for (const s of local) {
      const normalizedDate = (() => {
        try {
          const dt = new Date(`${s.date}T${s.sessionTime || "00:00"}:00`);
          return toLocalDateKey(dt);
        } catch {
          return s.date;
        }
      })();

      const normalized: PracticeSession = { ...s, date: normalizedDate };
      const primaryKey =
        normalized.clientSessionId ||
        `local:${normalized.date}:${normalized.sessionTime || ""}:${normalized.duration}:${normalized.timeOfDay}`;
      if (seen.has(primaryKey) || seen.has(stableKey(normalized))) continue;
      seen.add(primaryKey);
      seen.add(stableKey(normalized));
      merged.push(normalized);
    }

    merged.sort((a, b) => {
      const ad = new Date(`${a.date}T${a.sessionTime || "00:00"}:00`).getTime();
      const bd = new Date(`${b.date}T${b.sessionTime || "00:00"}:00`).getTime();
      return bd - ad;
    });

    const final: PracticeSession[] = [];
    const finalSeen = new Set<string>();
    for (const s of merged) {
      const k = stableKey(s);
      if (finalSeen.has(k)) continue;
      finalSeen.add(k);
      final.push(s);
    }
    return final;
  }, [currentProgress?.practiceHistory, supabaseAsPracticeSessions]);

  const filtered = useMemo(() => {
    let list = mergedSessionsAll;

    // Range filter
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const cutoff = (() => {
      if (range === "today") return startOfToday;
      if (range === "7d") return new Date(startOfToday.getTime() - 6 * 24 * 60 * 60 * 1000);
      if (range === "30d") return new Date(startOfToday.getTime() - 29 * 24 * 60 * 60 * 1000);
      return null;
    })();
    if (cutoff) {
      list = list.filter((s) => parseLocalDateKey(s.date).getTime() >= cutoff.getTime());
    }

    // Search
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((s) => {
        const hay = [
          s.notes || "",
          s.timeOfDay || "",
          s.sessionTime || "",
          s.date || "",
          formatDate(s.date),
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    }

    return list;
  }, [mergedSessionsAll, range, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, PracticeSession[]>();
    for (const s of filtered) {
      const arr = map.get(s.date);
      if (arr) arr.push(s);
      else map.set(s.date, [s]);
    }
    const keys = Array.from(map.keys()).sort((a, b) => parseLocalDateKey(b).getTime() - parseLocalDateKey(a).getTime());
    return keys.map((k) => ({ date: k, label: formatDate(k), sessions: map.get(k)! }));
  }, [filtered]);

  const exportCsv = () => {
    const header = ["date", "label", "time", "duration_seconds", "time_of_day", "notes", "synced"].join(",");
    const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const rows = filtered.map((s) =>
      [
        esc(s.date),
        esc(formatDate(s.date)),
        esc(s.sessionTime || ""),
        String(s.duration),
        esc(s.timeOfDay || ""),
        esc(s.notes || ""),
        esc(String(!!s.syncedToSupabase)),
      ].join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sun44-session-history-${toLocalDateKey(new Date())}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-800 via-orange-700 to-orange-600 text-white">
      <div className="px-6 pt-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl p-[1px] bg-gradient-to-br from-yellow-400/20 via-white/10 to-orange-500/20 hover:from-yellow-400/30 hover:to-orange-500/30 transition-all"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/35 border border-white/10 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <ChevronLeft className="w-5 h-5 text-white/90" />
            </div>
          </button>

          <div className="text-center flex-1">
            <h1 className="text-white font-semibold tracking-wide text-lg">Session History</h1>
            <p className="text-white/40 text-xs tracking-wider uppercase">{filtered.length} sessions</p>
          </div>

          <button
            type="button"
            onClick={exportCsv}
            className="rounded-xl p-[1px] bg-gradient-to-br from-yellow-400/20 via-white/10 to-orange-500/20 hover:from-yellow-400/30 hover:to-orange-500/30 transition-all"
          >
            <div className="h-10 px-3 flex items-center gap-2 rounded-xl bg-black/35 border border-white/10 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] text-white/90 text-sm">
              <Download className="w-4 h-4" />
              CSV
            </div>
          </button>
        </div>

        {/* Controls */}
        <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.3)] mb-5">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes, dates, times…"
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-black/35 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/25"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {([
              ["today", "Today"],
              ["7d", "7D"],
              ["30d", "30D"],
              ["all", "All"],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setRange(key)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all ${
                  range === key
                    ? "bg-gradient-to-br from-yellow-400/25 to-orange-400/20 border-yellow-400/35 text-yellow-200 shadow-[0_0_14px_rgba(255,215,0,0.16)]"
                    : "bg-white/5 border-white/10 text-white/70 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}

            {supabaseLoading && <span className="text-white/40 text-xs ml-auto">Syncing…</span>}
          </div>
        </div>

        {/* Groups */}
        {grouped.length === 0 ? (
          <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)] text-center">
            <p className="text-white/70 text-sm">No sessions match your filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {grouped.map((g) => (
              <div key={g.date}>
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="flex items-center gap-2 text-white/80 text-sm font-semibold">
                    <Calendar className="w-4 h-4 text-yellow-200/80" />
                    {g.label}
                  </div>
                  <div className="text-white/40 text-xs">{g.sessions.length}</div>
                </div>

                <div className="space-y-3">
                  {g.sessions.map((session, idx) => (
                    <button
                      key={`${g.date}-${idx}-${session.sessionTime || ""}`}
                      type="button"
                      onClick={() => {
                        setSelectedSession(session as any);
                        setDetailsOpen(true);
                      }}
                      className="w-full text-left rounded-2xl p-[1px] bg-gradient-to-br from-yellow-400/20 via-white/5 to-orange-500/15 hover:from-yellow-400/30 hover:to-orange-500/25 transition-all duration-300 group"
                    >
                      <div className="rounded-2xl bg-black/35 backdrop-blur-md border border-white/10 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="text-white font-semibold text-sm tracking-wide">Practice</span>
                              <span className="text-white/40 text-xs">•</span>
                              {session.sessionTime && (
                                <span className="text-white/70 text-xs flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatSessionTime(session.sessionTime)}
                                </span>
                              )}
                              <span className="text-white/40 text-xs">•</span>
                              <span className="text-yellow-200/90 text-xs font-medium">{formatDuration(session.duration)}</span>
                              {!!session.syncedToSupabase && (
                                <>
                                  <span className="text-white/30 text-xs">•</span>
                                  <span className="text-green-400/80 text-xs">Saved</span>
                                </>
                              )}
                            </div>
                            {session.notes && <div className="text-white/55 text-xs truncate">{session.notes}</div>}
                          </div>
                          <Flame className="w-4 h-4 text-orange-400/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <SessionDetailModal
        isOpen={detailsOpen}
        session={selectedSession}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedSession(null);
        }}
        onSaveNotes={async (notes) => {
          const s = selectedSession;
          if (!s) return;
          const trimmed = notes.trim();

          if (s.clientSessionId) {
            localStorage.updatePracticeSession(s.clientSessionId, { notes: trimmed || undefined });
          }

          if (s.supabaseSessionId) {
            await updateSungazingSessionNotesById(s.supabaseSessionId, trimmed || null);
          }

          try {
            window.dispatchEvent(new Event("sessionCompleted"));
          } catch {}
        }}
      />
    </div>
  );
}


