export interface Recapitulation {
  transaksi: Transaksi[]
  total: Total
}

export interface Transaksi {
  tanggal_transaksi: string
  total_pendapatan: number
  total_pesanan: number
  total_cash?: number
  total_transfer?: number
}

export interface Total {
  total_pendapatan: number
  total_produk: number
  total_cash?: number
  total_transfer?: number
}

export interface Income {
  transaksi: Transaksi[]
  total: Total
}

export interface ProductRecapitulation {
  produk: Product[]
  total: Total
}

export interface RecapitulationDetail {
  tanggal_transaksi: string
  produk: Product[]
  total: TotalProduct
}

export interface Product {
  produk_id: number
  nama_produk: string
  harga: number
  total_produk: number
  total_pendapatan: number
}

export interface TotalProduct {
  total_produk: number
  total_pendapatan: number
}
