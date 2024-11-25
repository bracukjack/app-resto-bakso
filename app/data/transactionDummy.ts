const transactionData = [
  {
    id: "txn1",
    customerName: "Sophia Williams",
    transactionNumber: "TXN001",
    transactionDate: "2024-11-23",
    products: [
      { name: "Bakso Ayam", qty: 3, price: 30000 },
      { name: "Pangsit Goreng", qty: 2, price: 30000 },
    ],
    deliveryMethod: "Take Away",
    address: "Jalan Raya No. 45, Denpasar, Bali",
    promoCode: "FREESHIP",
    paymentMethod: "Transfer",
    totalAmount: 180000,
    status: "accepted",
  },
  {
    id: "txn2",
    customerName: "Sophia Williams",
    transactionNumber: "TXN002",
    transactionDate: "2024-11-23",
    products: [
      { name: "Bakso Sapi", qty: 2, price: 45000 },
      { name: "Bakso Mercon", qty: 4, price: 50000 },
    ],
    deliveryMethod: "Delivery",
    address: "Jalan Merdeka No. 10, Ubud, Bali",
    promoCode: "FREESHIP",
    paymentMethod: "Cash",
    totalAmount: 350000,
    status: "new",
  },
  {
    id: "txn3",
    customerName: "Michael Brown",
    transactionNumber: "TXN003",
    transactionDate: "2024-11-22",
    products: [
      { name: "Bakso Mercon", qty: 3, price: 50000 },
      { name: "Pangsit Goreng", qty: 1, price: 30000 },
    ],
    deliveryMethod: "Take Away",
    address: "",
    promoCode: "",
    paymentMethod: "Transfer",
    totalAmount: 180000,
    status: "rejected",
  },
  {
    id: "txn4",
    customerName: "Emily Davis",
    transactionNumber: "TXN004",
    transactionDate: "2024-11-21",
    products: [
      { name: "Bakso Ayam", qty: 5, price: 30000 },
      { name: "Bakso Sapi", qty: 2, price: 45000 },
    ],
    deliveryMethod: "Delivery",
    address: "Jalan Pantai No. 15, Kuta, Bali",
    promoCode: "FREESHIP",
    paymentMethod: "Cash",
    totalAmount: 255000,
    status: "accepted",
  },
  {
    id: "txn5",
    customerName: "Sophia Williams",
    transactionNumber: "TXN005",
    transactionDate: "2024-11-20",
    products: [
      { name: "Bakso Ayam", qty: 4, price: 30000 },
      { name: "Bakso Sapi", qty: 3, price: 45000 },
    ],
    deliveryMethod: "Delivery",
    address: "Jalan Raya No. 80, Seminyak, Bali",
    promoCode: "FREESHIP",
    paymentMethod: "Cash",
    totalAmount: 330000,
    status: "completed",
  },
  {
    id: "txn6",
    customerName: "Lucas Johnson",
    transactionNumber: "TXN006",
    transactionDate: "2024-11-19",
    products: [
      { name: "Bakso Mercon", qty: 2, price: 50000 },
      { name: "Pangsit Goreng", qty: 3, price: 30000 },
    ],
    deliveryMethod: "Take Away",
    address: "Jalan Legian No. 60, Legian, Bali",
    promoCode: "",
    paymentMethod: "Transfer",
    totalAmount: 230000,
    status: "complain",
  },
];

export default transactionData;