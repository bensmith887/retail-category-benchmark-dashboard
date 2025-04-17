
// Define data types for benchmark data
interface PriceTier {
  entry: number;
  mid: number;
  premium: number;
}

interface Competitor {
  name: string;
  productCount: number;
  priceTiers: PriceTier;
}

interface Subcategory {
  id: string;
  name: string;
  productCount: number;
  priceTiers: PriceTier;
  competitors: Competitor[];
}

interface Category {
  id: string;
  name: string;
  productCount: number;
  subcategories: Subcategory[];
}

interface BenchmarkData {
  competitors: { name: string }[];
  categories: Category[];
}

// Sample data for product benchmarking
export const benchmarkData: BenchmarkData = {
  competitors: [
    { name: "Amazon" },
    { name: "Walmart" },
    { name: "Target" },
    { name: "Best Buy" },
    { name: "Home Depot" }
  ],
  categories: [
    {
      id: "electronics",
      name: "Electronics",
      productCount: 2450,
      subcategories: [
        {
          id: "smartphones",
          name: "Smartphones",
          productCount: 325,
          priceTiers: {
            entry: 75,
            mid: 150,
            premium: 100
          },
          competitors: [
            {
              name: "Amazon",
              productCount: 487,
              priceTiers: {
                entry: 120,
                mid: 217,
                premium: 150
              }
            },
            {
              name: "Walmart",
              productCount: 213,
              priceTiers: {
                entry: 103,
                mid: 85,
                premium: 25
              }
            },
            {
              name: "Target",
              productCount: 168,
              priceTiers: {
                entry: 89,
                mid: 64,
                premium: 15
              }
            },
            {
              name: "Best Buy",
              productCount: 275,
              priceTiers: {
                entry: 65,
                mid: 130,
                premium: 80
              }
            }
          ]
        },
        {
          id: "laptops",
          name: "Laptops & Computers",
          productCount: 420,
          priceTiers: {
            entry: 105,
            mid: 210,
            premium: 105
          },
          competitors: [
            {
              name: "Amazon",
              productCount: 625,
              priceTiers: {
                entry: 175,
                mid: 320,
                premium: 130
              }
            },
            {
              name: "Walmart",
              productCount: 187,
              priceTiers: {
                entry: 112,
                mid: 65,
                premium: 10
              }
            },
            {
              name: "Target",
              productCount: 98,
              priceTiers: {
                entry: 58,
                mid: 40,
                premium: 0
              }
            },
            {
              name: "Best Buy",
              productCount: 450,
              priceTiers: {
                entry: 110,
                mid: 215,
                premium: 125
              }
            }
          ]
        },
        {
          id: "audio",
          name: "Audio & Headphones",
          productCount: 278,
          priceTiers: {
            entry: 98,
            mid: 130,
            premium: 50
          },
          competitors: [
            {
              name: "Amazon",
              productCount: 410,
              priceTiers: {
                entry: 180,
                mid: 160,
                premium: 70
              }
            },
            {
              name: "Walmart",
              productCount: 150,
              priceTiers: {
                entry: 110,
                mid: 35,
                premium: 5
              }
            },
            {
              name: "Target",
              productCount: 120,
              priceTiers: {
                entry: 75,
                mid: 42,
                premium: 3
              }
            },
            {
              name: "Best Buy",
              productCount: 235,
              priceTiers: {
                entry: 80,
                mid: 115,
                premium: 40
              }
            }
          ]
        }
      ]
    },
    {
      id: "home",
      name: "Home & Kitchen",
      productCount: 3150,
      subcategories: [
        {
          id: "appliances",
          name: "Kitchen Appliances",
          productCount: 420,
          priceTiers: {
            entry: 165,
            mid: 210,
            premium: 45
          },
          competitors: [
            {
              name: "Amazon",
              productCount: 580,
              priceTiers: {
                entry: 285,
                mid: 240,
                premium: 55
              }
            },
            {
              name: "Walmart",
              productCount: 310,
              priceTiers: {
                entry: 220,
                mid: 80,
                premium: 10
              }
            },
            {
              name: "Target",
              productCount: 245,
              priceTiers: {
                entry: 180,
                mid: 60,
                premium: 5
              }
            },
            {
              name: "Home Depot",
              productCount: 180,
              priceTiers: {
                entry: 75,
                mid: 85,
                premium: 20
              }
            }
          ]
        },
        {
          id: "furniture",
          name: "Furniture",
          productCount: 680,
          priceTiers: {
            entry: 250,
            mid: 350,
            premium: 80
          },
          competitors: [
            {
              name: "Amazon",
              productCount: 950,
              priceTiers: {
                entry: 420,
                mid: 370,
                premium: 160
              }
            },
            {
              name: "Walmart",
              productCount: 520,
              priceTiers: {
                entry: 400,
                mid: 110,
                premium: 10
              }
            },
            {
              name: "Target",
              productCount: 490,
              priceTiers: {
                entry: 310,
                mid: 165,
                premium: 15
              }
            },
            {
              name: "Home Depot",
              productCount: 120,
              priceTiers: {
                entry: 55,
                mid: 45,
                premium: 20
              }
            }
          ]
        }
      ]
    },
    {
      id: "clothing",
      name: "Clothing & Accessories",
      productCount: 4200,
      subcategories: [
        {
          id: "mens",
          name: "Men's Clothing",
          productCount: 1250,
          priceTiers: {
            entry: 650,
            mid: 450,
            premium: 150
          },
          competitors: [
            {
              name: "Amazon",
              productCount: 2100,
              priceTiers: {
                entry: 1200,
                mid: 700,
                premium: 200
              }
            },
            {
              name: "Walmart",
              productCount: 950,
              priceTiers: {
                entry: 800,
                mid: 130,
                premium: 20
              }
            },
            {
              name: "Target",
              productCount: 780,
              priceTiers: {
                entry: 560,
                mid: 200,
                premium: 20
              }
            }
          ]
        },
        {
          id: "womens",
          name: "Women's Clothing",
          productCount: 1850,
          priceTiers: {
            entry: 750,
            mid: 850,
            premium: 250
          },
          competitors: [
            {
              name: "Amazon",
              productCount: 3200,
              priceTiers: {
                entry: 1600,
                mid: 1200,
                premium: 400
              }
            },
            {
              name: "Walmart",
              productCount: 1100,
              priceTiers: {
                entry: 900,
                mid: 180,
                premium: 20
              }
            },
            {
              name: "Target",
              productCount: 1350,
              priceTiers: {
                entry: 850,
                mid: 450,
                premium: 50
              }
            }
          ]
        }
      ]
    }
  ]
};
