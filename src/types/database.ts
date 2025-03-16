
// Визначення типів для таблиць бази даних

// Таблиця користувачів (буде автоматично створена Supabase Auth)
export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

// Таблиця перевірок на плагіат
export interface PlagiarismCheck {
  id: string;
  user_id: string;
  document_name: string;
  text_content: string;
  created_at: string;
  status: 'completed' | 'inQueue' | 'unavailable' | 'failed';
  score: number;
  position?: number;
}

// Таблиця результатів перевірки
export interface CheckResult {
  id: string;
  check_id: string;
  score: number;
  matches: CheckMatch[];
  external_sources: ExternalSource[];
}

// Тип для знайдених збігів
export interface CheckMatch {
  id: string;
  text: string;
  start_index: number;
  end_index: number;
  match_percentage: number;
  source: string;
  source_url?: string;
}

// Тип для зовнішніх джерел
export interface ExternalSource {
  id: string;
  name: string;
  url: string;
  type: string;
  similarity: number;
}

// Таблиця користувацьких планів
export interface UserPlan {
  id: string;
  user_id: string;
  plan_type: 'free' | 'premium' | 'pro';
  checks_limit: number;
  checks_used: number;
  valid_until: string;
}

// Таблиця платежів
export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  created_at: string;
  description: string;
  payment_method?: string;
}
