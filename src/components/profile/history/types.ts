
export interface CheckHistoryItem {
  id: string;
  date: string;
  documentName: string;
  status: 'completed' | 'inQueue' | 'unavailable' | 'failed';
  score: number;
  position?: number;
}
