// utils/formatCurrency.ts
export const formatRupiah = (amount: number): string => {
    const formattedAmount = Math.floor(amount).toLocaleString('id-ID');
      return `RP. ${formattedAmount}`;
  };
  