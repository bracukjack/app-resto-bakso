export interface Transaction {
  id: number
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  transactionNumber: string
  transactionDate: string
  products: Product[]
  deliveryMethod: string
  delivery: string
  deliveryCost: number
  paymentMethod: string
  promo: boolean
  buktiUploadPromoUrl: any
  status: string
  totalAmount: number
  totalAmountAfterDelivery: number
  totalAmountAfterPromo: number
  buktiPembayaranUrl: any
}

export interface Product {
  id: number
  name: string
  qty: number
  price: number
  subtotal: number
}