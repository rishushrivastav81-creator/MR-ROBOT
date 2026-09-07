import { AnswersMap } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const visitorStorageKey = 'mr_robot_visitor_id';

const getVisitorId = (): string => {
  const existing = localStorage.getItem(visitorStorageKey);
  if (existing) return existing;

  const visitorId = crypto.randomUUID();
  localStorage.setItem(visitorStorageKey, visitorId);
  return visitorId;
};

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const submitRemoteResponse = async (
  answers: AnswersMap,
  exactMoment: string,
  latestQuestionId?: string,
  latestAnswer?: string
): Promise<void> => {
  if (!isConfigured || !latestQuestionId || !latestAnswer) return;

  try {
    await fetch(`${supabaseUrl}/rest/v1/response_events`, {
      method: 'POST',
      headers: {
        apikey: supabaseAnonKey!,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        visitor_id: getVisitorId(),
        question_id: latestQuestionId,
        answer: latestAnswer,
        answers,
        exact_moment: exactMoment || null,
      }),
    });
  } catch (error) {
    console.error('Unable to submit response to the developer log:', error);
  }
};

export const submitRemoteMoment = async (
  answers: AnswersMap,
  exactMoment: string
): Promise<void> => {
  if (!isConfigured || !exactMoment.trim()) return;

  try {
    await fetch(`${supabaseUrl}/rest/v1/response_events`, {
      method: 'POST',
      headers: {
        apikey: supabaseAnonKey!,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        visitor_id: getVisitorId(),
        question_id: 'exact_moment',
        answer: exactMoment.trim(),
        answers,
        exact_moment: exactMoment.trim(),
      }),
    });
  } catch (error) {
    console.error('Unable to submit exact moment to the developer log:', error);
  }
};