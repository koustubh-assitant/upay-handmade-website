const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory products (no MongoDB needed for now)
let products = [
  {
    id: 1,
    name: "Eco Jute Tote Bag",
    price: 450,
    maker: "Nagpur Artisans",
    description: "Spacious natural jute bag with reinforced handles",
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "Embroidered Cotton Pouch",
    price: 320,
    maker: "Pune Youth",
    description: "Delicate hand embroidery on soft cotton",
    tag: "Limited"
  },
  {
    id: 3,
    name: "Woven Bamboo Clutch",
    price: 580,
    maker: "Maharashtra Craft",
    description: "Elegant bamboo weave with secure clasp",
    tag: "New"
  },
  {
    id: 4,
    name: "Reusable Hand-Painted Mask",
    price: 280,
    maker: "Rural Skill Group",
    description: "Breathable cotton mask with artistic design",
    tag: "Eco-Friendly"
  },
  {
    id: 5,
    name: "Hand-Knitted Wool Scarf",
    price: 720,
    maker: "Winter Craft Team",
    description: "Warm, soft wool blend – cozy & stylish",
    tag: "Winter Special"
  },
  {
    id: 6,
    name: "Organic Cotton Face Mask Set (3 pcs)",
    price: 350,
    maker: "Creative Youth",
    description: "Breathable, washable masks with adjustable loops",
    tag: "Health & Eco"
  }
];

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Add new product (for admin)
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`UPAY Backend running on http://localhost:${PORT}`);
  console.log(`Products API: http://localhost:${PORT}/api/products`);
});