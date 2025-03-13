
import { CheckHistoryItem } from './types';

export const sampleHistoryData: CheckHistoryItem[] = [
  {
    id: 'check-001',
    date: '2024-03-15T14:30:00',
    documentName: 'родина Розові.docx',
    status: 'completed',
    score: 78
  },
  {
    id: 'check-002',
    date: '2024-03-10T11:15:00',
    documentName: 'Гендерні відмінності професій.docx',
    status: 'completed',
    score: 8
  },
  {
    id: 'check-003',
    date: '2024-02-28T09:20:00',
    documentName: 'Аналіза особливих банкроту.docx',
    status: 'inQueue',
    position: 12,
    score: 0
  },
  {
    id: 'check-004',
    date: '2024-02-20T16:45:00',
    documentName: 'Документ без назви (1).docx',
    status: 'unavailable',
    score: 0
  },
  {
    id: 'check-005',
    date: '2024-02-15T08:15:00',
    documentName: 'Документ без назви (2).docx',
    status: 'unavailable',
    score: 0
  }
];
