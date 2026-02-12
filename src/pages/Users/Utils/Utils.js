// توابع utility خالص که وابسته به state نیستند
export const calculateTotalTransactions = (transactions) => {
  if (!transactions || !Array.isArray(transactions)) return "۰";
  
  const total = transactions.reduce((total, transaction) => {
    const amount = typeof transaction.amount === "string"
      ? parseInt(transaction.amount.replace(/,/g, "")) || 0
      : transaction.amount || 0;
    return total + amount;
  }, 0);
  
  return total.toLocaleString("fa-IR");
};


export const formatTransactionCount = (count) => {
  return (count || 0).toLocaleString("fa-IR");
};


export const formatCurrency = (amount) => {
  return (amount || 0).toLocaleString("fa-IR");
};



export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fa-IR");
};

