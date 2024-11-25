const transactionRecap = [
    {
      id: "TRX001",
      date: 1700448000000, // Timestamp: 2024-11-20
      transaction_count: 3,
      transactions: [
        {
          product: require("../../assets/menu/baksoayam.jpg"),
          title: "Bakso Ayam",
          qty: 2,
          price: 30000
        },
        {
          product: require("../../assets/menu/baksosapi.jpg"),
          title: "Bakso Sapi",
          qty: 1,
          price: 45000
        },
        {
          product: require("../../assets/menu/baksomercon.jpg"),
          title: "Bakso Mercon",
          qty: 3,
          price: 50000
        }
      ],
      total: 290000,
      transfer_method: 200000,
      cash_method: 90000
    },
    {
      id: "TRX002",
      date: 1700534400000, // Timestamp: 2024-11-21
      transaction_count: 2,
      transactions: [
        {
          product: require("../../assets/menu/baksosapi.jpg"),
          title: "Bakso Sapi",
          qty: 1,
          price: 45000
        },
        {
          product: require("../../assets/menu/pangsit.jpg"),
          title: "Pangsit Goreng",
          qty: 5,
          price: 30000
        }
      ],
      total: 175000,
      transfer_method: 100000,
      cash_method: 75000
    },
    {
      id: "TRX003",
      date: 1700620800000, // Timestamp: 2024-11-22
      transaction_count: 4,
      transactions: [
        {
          product: require("../../assets/menu/baksoayam.jpg"),
          title: "Bakso Ayam",
          qty: 3,
          price: 30000
        },
        {
          product: require("../../assets/menu/baksosapi.jpg"),
          title: "Bakso Sapi",
          qty: 2,
          price: 45000
        },
        {
          product: require("../../assets/menu/baksomercon.jpg"),
          title: "Bakso Mercon",
          qty: 1,
          price: 50000
        },
        {
          product: require("../../assets/menu/pangsit.jpg"),
          title: "Pangsit Goreng",
          qty: 4,
          price: 30000
        }
      ],
      total: 475000,
      transfer_method: 300000,
      cash_method: 175000
    }
  ];
  
export default transactionRecap;  