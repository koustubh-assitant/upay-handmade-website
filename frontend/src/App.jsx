import { useState } from 'react'
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import './index.css'

export default function App() {
  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartCount(prev => prev + 1)
    setCartItems(prev => [...prev, product])
    alert(`${product.name} added to cart! 🛒`) // Simple toast
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar with Cart Count */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link to="/" className="text-3xl font-extrabold text-emerald-800">
            UPAY<span className="text-emerald-600">Handmade</span>
          </Link>

          <div className="flex items-center space-x-10">
            <Link to="/" className="text-gray-700 hover:text-emerald-700 font-medium transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-emerald-700 font-medium transition-colors">
              Shop
            </Link>
            <div className="relative">
              <button className="text-gray-700 hover:text-emerald-700 font-medium transition-colors flex items-center">
                Cart
                <span className="ml-2 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">UPAY Handmade</h3>
          <p className="text-lg mb-8">Empowering women & children through crafts</p>
          <p className="text-sm">© {new Date().getFullYear()} UPAY NGO</p>
        </div>
      </footer>
    </div>
  )
}

// Home Page Component
function Home({ addToCart }) {
  const products = [
    { id: 1, name: 'Eco Jute Tote Bag', price: '₹450', maker: 'Nagpur Artisans', tag: 'Best Seller', img: 'https://images.unsplash.com/photo-1599570-1b0b4a0c6b0d?w=800' },
    { id: 2, name: 'Embroidered Pouch', price: '₹320', maker: 'Pune Youth', tag: 'Limited', img: 'https://images.unsplash.com/photo-1584917865446-1a2d6c8d7b95?w=800' },
    { id: 3, name: 'Woven Bamboo Clutch', price: '₹580', maker: 'Maharashtra Craft', tag: 'New', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-32 bg-gradient-to-br from-emerald-900 to-emerald-700 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-8">Handmade with Purpose</h1>
          <p className="text-2xl mb-12">Empowering lives through sustainable crafts</p>
          <button className="bg-white text-emerald-900 font-bold text-xl px-12 py-5 rounded-full shadow-2xl hover:bg-gray-100 transform hover:scale-105 transition">
            Explore Collection
          </button>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Featured Products</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {products.map(product => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-4 cursor-pointer"
            >
              <div className="h-80 overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {product.name}
                  </h3>
                  <span className="bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {product.tag}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{product.maker}</p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-emerald-700">{product.price}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault() // prevent navigation
                      addToCart(product)
                    }}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

// Product Detail Page
function ProductDetail({ addToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()

  // Fake product data (in real app, fetch from backend)
  const product = {
    id,
    name: 'Eco Jute Tote Bag',
    price: '₹450',
    maker: 'Women artisans from Nagpur center',
    description: 'Durable, eco-friendly jute tote with hand-stitched details. Perfect for daily use or gifting. 100% proceeds support education programs.',
    img: 'https://images.unsplash.com/photo-1599570-1b0b4a0c6b0d?w=1200',
    features: ['100% natural jute', 'Handcrafted', 'Spacious interior', 'Sustainable & reusable'],
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="text-emerald-700 hover:text-emerald-900 font-medium mb-12 flex items-center"
        >
          ← Back to Home
        </button>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">{product.name}</h1>
            <p className="text-4xl font-extrabold text-emerald-700 mb-8">{product.price}</p>
            <p className="text-gray-600 text-xl mb-10 leading-relaxed">{product.description}</p>

            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <ul className="space-y-3 text-gray-700">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center">
                    <span className="text-emerald-600 mr-3">✓</span> {feat}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-500 italic mb-12">Handcrafted by: {product.maker}</p>

            <button
              onClick={() => addToCart(product)}
              className="bg-emerald-700 text-white font-bold text-xl px-12 py-6 rounded-full shadow-xl hover:bg-emerald-800 transform hover:scale-105 transition-all duration-300 w-full md:w-auto"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}