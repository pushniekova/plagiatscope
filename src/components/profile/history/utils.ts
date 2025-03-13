
export const getStatusVariant = (status: string) => {
  switch (status) {
    case 'completed': return 'default';
    case 'inQueue': return 'outline';
    case 'unavailable': return 'destructive';
    default: return 'secondary';
  }
};

export const getStatusText = (t: (key: string, replacements?: Record<string, any>) => string, status: string, position?: number) => {
  switch (status) {
    case 'completed':
      return t('profile.history.status.completed');
    case 'inQueue':
      return position 
        ? t('profile.history.status.inQueue', { position }) 
        : t('profile.history.status.inQueue', { position: '-' });
    case 'unavailable':
      return t('profile.history.status.unavailable');
    default:
      return status;
  }
};

export const getRiskLevel = (score: number) => {
  if (score < 20) return 'low';
  if (score < 40) return 'medium';
  return 'high';
};

export const findHistoryItemById = (items: any[], id: string) => {
  return items.find(item => item.id === id);
};
