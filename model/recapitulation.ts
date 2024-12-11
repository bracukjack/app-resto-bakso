export interface Recapitulation {
  transaksi: Transaksi[]
  total: Total
}

export interface Transaksi {
  tanggal_transaksi: string
  total_pendapatan: number
  total_pesanan: number
}

export interface Total {
  total_pendapatan: number
  total_pesanan: number
}

export interface ProductRecapitulation {
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
