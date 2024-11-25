// utils/dateUtils.ts

export function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
  
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if single digit
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-based index, add 1 for the actual month) and pad
    const year = date.getFullYear(); // Get the full year
  
    return `${day}-${month}-${year}`; // Return in the format: tanggal - Bulan - Tahun
  }
  