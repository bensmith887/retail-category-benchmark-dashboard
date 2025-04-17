
// Sample data for the hierarchical tree view
export const assortmentData = [
  {
    id: "electronics",
    name: "Electronics",
    competitor: "Your Brand",
    count: 1250,
    children: [
      {
        id: "electronics-computers",
        name: "Computers",
        competitor: "Your Brand",
        count: 450,
        children: [
          {
            id: "electronics-laptops",
            name: "Laptops",
            competitor: "Your Brand",
            count: 120
          },
          {
            id: "electronics-desktops",
            name: "Desktops",
            competitor: "Your Brand",
            count: 85
          },
          {
            id: "electronics-peripherals",
            name: "Peripherals",
            competitor: "Your Brand",
            count: 245
          }
        ]
      },
      {
        id: "electronics-phones",
        name: "Phones & Accessories",
        competitor: "Amazon",
        count: 380,
        children: [
          {
            id: "electronics-smartphones",
            name: "Smartphones",
            competitor: "Amazon",
            count: 180
          },
          {
            id: "electronics-cases",
            name: "Cases",
            competitor: "Amazon",
            count: 120
          },
          {
            id: "electronics-chargers",
            name: "Chargers",
            competitor: "Amazon",
            count: 80
          }
        ]
      },
      {
        id: "electronics-tv",
        name: "TV & Home Cinema",
        competitor: "Walmart",
        count: 420,
        children: [
          {
            id: "electronics-tvs",
            name: "TVs",
            competitor: "Walmart",
            count: 150
          },
          {
            id: "electronics-speakers",
            name: "Speakers",
            competitor: "Walmart",
            count: 120
          },
          {
            id: "electronics-streaming",
            name: "Streaming Devices",
            competitor: "Walmart",
            count: 75
          }
        ]
      }
    ]
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen",
    competitor: "Your Brand",
    count: 950,
    children: [
      {
        id: "home-appliances",
        name: "Appliances",
        competitor: "Your Brand",
        count: 340,
        children: [
          {
            id: "home-large-appliances",
            name: "Large Appliances",
            competitor: "Your Brand",
            count: 120
          },
          {
            id: "home-small-appliances",
            name: "Small Appliances",
            competitor: "Your Brand",
            count: 220
          }
        ]
      },
      {
        id: "home-furniture",
        name: "Furniture",
        competitor: "Target",
        count: 280,
        children: [
          {
            id: "home-living-room",
            name: "Living Room",
            competitor: "Target",
            count: 95
          },
          {
            id: "home-dining-room",
            name: "Dining Room",
            competitor: "Target",
            count: 75
          },
          {
            id: "home-bedroom",
            name: "Bedroom",
            competitor: "Target",
            count: 110
          }
        ]
      },
      {
        id: "home-kitchenware",
        name: "Kitchenware",
        competitor: "eBay",
        count: 330,
        children: [
          {
            id: "home-cookware",
            name: "Cookware",
            competitor: "eBay",
            count: 130
          },
          {
            id: "home-dinnerware",
            name: "Dinnerware",
            competitor: "eBay",
            count: 100
          },
          {
            id: "home-cutlery",
            name: "Cutlery",
            competitor: "eBay",
            count: 100
          }
        ]
      }
    ]
  },
  {
    id: "clothing",
    name: "Clothing",
    competitor: "Your Brand",
    count: 1750,
    children: [
      {
        id: "clothing-mens",
        name: "Men's",
        competitor: "Your Brand",
        count: 650,
        children: [
          {
            id: "clothing-mens-tops",
            name: "Tops",
            competitor: "Your Brand",
            count: 250
          },
          {
            id: "clothing-mens-bottoms",
            name: "Bottoms",
            competitor: "Your Brand",
            count: 200
          },
          {
            id: "clothing-mens-outerwear",
            name: "Outerwear",
            competitor: "Your Brand",
            count: 200
          }
        ]
      },
      {
        id: "clothing-womens",
        name: "Women's",
        competitor: "Amazon",
        count: 820,
        children: [
          {
            id: "clothing-womens-tops",
            name: "Tops",
            competitor: "Amazon",
            count: 300
          },
          {
            id: "clothing-womens-bottoms",
            name: "Bottoms",
            competitor: "Amazon",
            count: 280
          },
          {
            id: "clothing-womens-dresses",
            name: "Dresses",
            competitor: "Amazon",
            count: 240
          }
        ]
      },
      {
        id: "clothing-kids",
        name: "Kids",
        competitor: "Walmart",
        count: 280,
        children: [
          {
            id: "clothing-kids-boys",
            name: "Boys",
            competitor: "Walmart",
            count: 140
          },
          {
            id: "clothing-kids-girls",
            name: "Girls",
            competitor: "Walmart",
            count: 140
          }
        ]
      }
    ]
  }
];
