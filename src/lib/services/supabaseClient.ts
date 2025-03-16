
import { createClient } from '@supabase/supabase-js';
import { PlagiarismCheck, CheckResult, UserPlan, Payment } from '@/types/database';

// Після підключення до Supabase через інтерфейс Lovable, 
// ці значення будуть автоматично доступні
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Сервіс для роботи з історією перевірок
export const checkHistoryService = {
  // Отримання всіх перевірок користувача
  async getUserChecks(userId: string): Promise<PlagiarismCheck[]> {
    const { data, error } = await supabase
      .from('plagiarism_checks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Помилка отримання перевірок:', error);
      return [];
    }
    
    return data as PlagiarismCheck[];
  },

  // Отримання деталей конкретної перевірки
  async getCheckDetails(checkId: string): Promise<PlagiarismCheck | null> {
    const { data, error } = await supabase
      .from('plagiarism_checks')
      .select('*')
      .eq('id', checkId)
      .single();

    if (error) {
      console.error('Помилка отримання деталей перевірки:', error);
      return null;
    }
    
    return data as PlagiarismCheck;
  },

  // Отримання результатів перевірки
  async getCheckResults(checkId: string): Promise<CheckResult | null> {
    const { data, error } = await supabase
      .from('check_results')
      .select('*')
      .eq('check_id', checkId)
      .single();

    if (error) {
      console.error('Помилка отримання результатів перевірки:', error);
      return null;
    }
    
    return data as CheckResult;
  },

  // Створення нової перевірки
  async createCheck(userId: string, documentName: string, textContent: string): Promise<PlagiarismCheck | null> {
    const { data, error } = await supabase
      .from('plagiarism_checks')
      .insert([{
        user_id: userId,
        document_name: documentName,
        text_content: textContent,
        status: 'inQueue',
        score: 0,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Помилка створення перевірки:', error);
      return null;
    }
    
    return data as PlagiarismCheck;
  },

  // Видалення перевірки
  async deleteCheck(checkId: string): Promise<boolean> {
    const { error } = await supabase
      .from('plagiarism_checks')
      .delete()
      .eq('id', checkId);

    if (error) {
      console.error('Помилка видалення перевірки:', error);
      return false;
    }
    
    return true;
  }
};

// Сервіс для роботи з планами користувачів
export const userPlanService = {
  // Отримання плану користувача
  async getUserPlan(userId: string): Promise<UserPlan | null> {
    const { data, error } = await supabase
      .from('user_plans')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Помилка отримання плану користувача:', error);
      return null;
    }
    
    return data as UserPlan;
  },

  // Оновлення використаних перевірок
  async incrementChecksUsed(userId: string): Promise<boolean> {
    const { error } = await supabase.rpc('increment_checks_used', {
      user_id: userId
    });

    if (error) {
      console.error('Помилка оновлення кількості використаних перевірок:', error);
      return false;
    }
    
    return true;
  }
};

// Сервіс для роботи з платежами
export const paymentService = {
  // Отримання платежів користувача
  async getUserPayments(userId: string): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Помилка отримання платежів:', error);
      return [];
    }
    
    return data as Payment[];
  }
};
