"use client";

import { createClient } from "./client";
import type { PracticeSession } from "../storage";

export type SungazingSessionType = "sunrise" | "sunset" | "practice";

export interface SungazingSessionUpsertInput {
  clientSessionId: string;
  sessionType: SungazingSessionType;
  durationSeconds: number;
  plannedDurationSeconds?: number | null;
  completed?: boolean;
  sessionTime?: string | null;
  sessionDate?: string | null; // ISO
  locationLat?: number | null;
  locationLng?: number | null;
  notes?: string | null;
}

export async function upsertSungazingSession(input: SungazingSessionUpsertInput): Promise<{ id: string } | null> {
  const supabase = createClient();
  if (!supabase) return null;

  const { data: authData, error: authError } = await supabase.auth.getUser();
  const user = authData?.user ?? null;
  if (authError || !user) return null;

  const { data, error } = await supabase
    .from("sungazing_sessions")
    .upsert(
      {
        client_session_id: input.clientSessionId,
        user_id: user.id,
        session_date: input.sessionDate ?? new Date().toISOString(),
        session_type: input.sessionType,
        duration_seconds: input.durationSeconds,
        planned_duration_seconds: input.plannedDurationSeconds ?? null,
        completed: input.completed ?? true,
        location_lat: input.locationLat ?? null,
        location_lng: input.locationLng ?? null,
        notes: input.notes ?? null,
        session_time: input.sessionTime ?? null,
      },
      { onConflict: "client_session_id" }
    )
    .select("id")
    .single();

  if (error || !data?.id) {
    // Don't throw (avoid unhandled promise rejections); caller will handle retries.
    return null;
  }

  return { id: data.id as string };
}

export async function updateSungazingSessionNotes(clientSessionId: string, notes: string | null): Promise<boolean> {
  const supabase = createClient();
  if (!supabase) return false;

  const { data: authData, error: authError } = await supabase.auth.getUser();
  const user = authData?.user ?? null;
  if (authError || !user) return false;

  const { error } = await supabase
    .from("sungazing_sessions")
    .update({ notes: notes, updated_at: new Date().toISOString() })
    .eq("client_session_id", clientSessionId)
    .eq("user_id", user.id);

  return !error;
}

export async function updateSungazingSessionNotesById(sessionId: string, notes: string | null): Promise<boolean> {
  const supabase = createClient();
  if (!supabase) return false;

  const { data: authData, error: authError } = await supabase.auth.getUser();
  const user = authData?.user ?? null;
  if (authError || !user) return false;

  const { error } = await supabase
    .from("sungazing_sessions")
    .update({ notes: notes, updated_at: new Date().toISOString() })
    .eq("id", sessionId)
    .eq("user_id", user.id);

  return !error;
}

export interface SungazingSessionRow {
  id: string;
  client_session_id: string | null;
  session_date: string;
  session_type: SungazingSessionType;
  duration_seconds: number;
  planned_duration_seconds: number | null;
  completed: boolean;
  location_lat: number | null;
  location_lng: number | null;
  notes: string | null;
  session_time: string | null;
}

export async function listSungazingSessions(params?: {
  limit?: number;
  since?: string; // ISO
}): Promise<SungazingSessionRow[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const { data: authData, error: authError } = await supabase.auth.getUser();
  const user = authData?.user ?? null;
  if (authError || !user) return [];

  let query = supabase
    .from("sungazing_sessions")
    .select(
      "id, client_session_id, session_date, session_type, duration_seconds, planned_duration_seconds, completed, location_lat, location_lng, notes, session_time"
    )
    .eq("user_id", user.id)
    .order("session_date", { ascending: false });

  if (params?.since) {
    query = query.gte("session_date", params.since);
  }
  if (params?.limit) {
    query = query.limit(params.limit);
  } else {
    query = query.limit(200);
  }

  const { data, error } = await query;
  if (error || !data) return [];
  return data as SungazingSessionRow[];
}

export function mapPracticeTimeOfDayToSessionType(timeOfDay: PracticeSession["timeOfDay"]): SungazingSessionType {
  if (timeOfDay === "sunrise") return "sunrise";
  if (timeOfDay === "sunset") return "sunset";
  return "practice";
}


