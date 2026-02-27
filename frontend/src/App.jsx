import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './index.css'

export default function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    alert(`${product.name} added to cart! 🛒`)
  }

  const updateQuantity = (id, change) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ))
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link to="/" className="text-3xl font-extrabold text-emerald-800">
            UPAY<span className="text-emerald-600">Handmade</span>
          </Link>

          <div className="flex items-center space-x-10">
            <Link to="/" className="text-gray-700 hover:text-emerald-700 transition-colors">Home</Link>
            <Link to="/cart" className="text-gray-700 hover:text-emerald-700 transition-colors flex items-center">
              Cart
              {cart.length > 0 && (
                <span className="ml-2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} total={cartTotal} />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">UPAY Handmade</h3>
          <p className="text-lg mb-8">Empowering lives through sustainable crafts</p>
          <p className="text-sm">© {new Date().getFullYear()} UPAY NGO</p>
        </div>
      </footer>
    </div>
  )
}

// Home Page with more products
function Home({ addToCart }) {
  const products = [
    { id: 1, name: 'Eco Jute Tote Bag', price: 450, maker: 'Nagpur Artisans', tag: 'Best Seller', img: 'https://images.unsplash.com/photo-1599570-1b0b4a0c6b0d?w=800' },
    { id: 2, name: 'Embroidered Cotton Pouch', price: 320, maker: 'Pune Youth', tag: 'Limited', img: 'https://images.unsplash.com/photo-1584917865446-1a2d6c8d7b95?w=800' },
    { id: 3, name: 'Woven Bamboo Clutch', price: 580, maker: 'Maharashtra Craft', tag: 'New', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
    { id: 4, name: 'Hand-Knitted Scarf', price: 650, maker: 'Rural Women Group', tag: 'Winter Special', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
    { id: 5, name: 'Organic Cotton Shawl', price: 780, maker: 'Skill Center', tag: 'Premium', img: 'https://images.unsplash.com/photo-1584917865446-1a2d6c8d7b95?w=800' },
    { id: 6, name: 'Decorative Wall Hanging', price: 920, maker: 'Community Artisans', tag: 'Decor', img: 'https://images.unsplash.com/photo-1599570-1b0b4a0c6b0d?w=800' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-32 bg-gradient-to-br from-emerald-900 to-emerald-700 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-8">Handmade with Heart</h1>
          <p className="text-2xl mb-12">Empowering women & children through every purchase</p>
          <button className="bg-white text-emerald-900 font-bold text-xl px-12 py-5 rounded-full shadow-2xl hover:bg-gray-100 transform hover:scale-105 transition">
            Explore Collection
          </button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Our Handcrafted Collection</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {products.map(product => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-4"
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
                  <span className="text-3xl font-bold text-emerald-700">₹{product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

// Cart Page
function CartPage({ cart, updateQuantity, removeFromCart, total }) {
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-20 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Your Cart is Empty</h2>
        <p className="text-xl text-gray-600 mb-12">Looks like you haven't added anything yet.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-emerald-700 text-white font-bold text-xl px-12 py-6 rounded-full shadow-xl hover:bg-emerald-800"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="pt-40 pb-20 max-w-6xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Your Shopping Cart</h2>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        {cart.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-6 last:border-b-0">
            <div className="flex items-center space-x-6">
              <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                <p className="text-gray-600">{item.maker}</p>
                <p className="text-emerald-700 font-bold mt-2">₹{item.price}</p>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-10 h-10 bg-gray-200 rounded-full text-xl font-bold hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-xl font-medium w-10 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-10 h-10 bg-gray-200 rounded-full text-xl font-bold hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-2xl shadow-xl">
        <div>
          <p className="text-xl text-gray-600">Subtotal</p>
          <p className="text-4xl font-bold text-emerald-700">₹{total.toFixed(2)}</p>
        </div>
        <button className="mt-6 md:mt-0 bg-emerald-700 text-white font-bold text-xl px-16 py-6 rounded-full shadow-xl hover:bg-emerald-800 transform hover:scale-105 transition-all">
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}