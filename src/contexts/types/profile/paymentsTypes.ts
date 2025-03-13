
// Payments section types
export type ProfilePaymentsTypes = {
  payments: {
    title: string;
    paymentHistory?: string;
    paymentHistoryDesc?: string;
    invoiceId?: string;
    date?: string;
    amount?: string;
    status?: {
      completed: string;
      pending: string;
      failed: string;
    } | string; // Allow both object and string for backwards compatibility
    noHistory?: string;
    comingSoon?: string;
    billingInfo?: string;
    billingInfoDesc?: string;
    creditCard?: string;
    cardNumber?: string;
    cardholderName?: string;
    expiration?: string;
    cvv?: string;
    billingAddress?: string;
    country?: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    zip?: string;
    updateCard?: string;
    transactionHistory?: string;
    transactionStatus?: {
      completed: string;
      pending: string;
      failed: string;
    };
    noTransactions?: string;
  };
};
