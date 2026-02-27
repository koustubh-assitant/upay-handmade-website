import { useState } from 'react'
import './index.css'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const featuredProducts = [
    { id: 1, name: 'Eco Jute Tote Bag', price: '₹450', maker: 'Nagpur Artisans', tag: 'Best Seller', img: 'https://images.unsplash.com/photo-1599570-1b0b4a0c6b0d?w=800&auto=format&fit=crop&q=80' },
    { id: 2, name: 'Embroidered Cotton Pouch', price: '₹320', maker: 'Pune Youth Group', tag: 'Limited', img: 'https://images.unsplash.com/photo-1584917865446-1a2d6c8d7b95?w=800&auto=format&fit=crop&q=80' },
    { id: 3, name: 'Woven Bamboo Clutch', price: '₹580', maker: 'Maharashtra Craft', tag: 'New', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-3xl font-extrabold text-emerald-800">
            UPAY<span className="text-emerald-600">Handmade</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {['Home', 'Shop', 'Stories', 'Impact', 'Contact'].map(item => (
              <a key={item} href="#" className="text-gray-700 hover:text-emerald-700 font-medium transition-colors duration-300 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden text-3xl text-emerald-800 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
            <div className="px-6 py-8 flex flex-col space-y-6 text-center text-lg font-medium">
              {['Home', 'Shop', 'Stories', 'Impact', 'Contact'].map(item => (
                <a key={item} href="#" className="text-gray-800 hover:text-emerald-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/95 via-emerald-900/90 to-emerald-800/85"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600')] bg-cover bg-center opacity-15"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight drop-shadow-2xl animate-fade-in-up">
            Crafted with Love & Purpose
          </h1>
          <p className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto font-light opacity-90 drop-shadow-lg animate-fade-in-up delay-200">
            Empowering women and children through sustainable handmade art — one purchase at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-300">
            <button className="bg-white text-emerald-900 font-bold text-xl px-14 py-6 rounded-full shadow-2xl hover:shadow-3xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-400">
              Shop Now
            </button>
            <button className="border-2 border-white/80 text-white font-bold text-xl px-14 py-6 rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-400">
              Our Stories
            </button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-20 text-gray-900 tracking-tight">
            Treasures from the Heart
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {featuredProducts.map(product => (
              <div
                key={product.id}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/30 hover:border-emerald-300/50 transition-all duration-500 hover:shadow-emerald-500/30 hover:-translate-y-8"
              >
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  {product.tag && (
                    <div className="absolute top-5 right-5 bg-emerald-700 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg transform group-hover:scale-110 transition">
                      {product.tag}
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    {product.maker}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-4xl font-extrabold text-emerald-700 drop-shadow">
                      {product.price}
                    </span>
                    <button className="bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 transition transform hover:scale-110 shadow-lg">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact CTA */}
      <section className="py-32 bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-emerald-900 mb-12">
            Change Lives with Every Purchase
          </h2>
          <p className="text-2xl text-gray-700 mb-14 max-w-4xl mx-auto leading-relaxed">
            100% of proceeds fund education, vocational training, and sustainable livelihoods for underprivileged women and children in Maharashtra.
          </p>
          <button className="bg-emerald-700 text-white font-bold text-2xl px-16 py-8 rounded-full shadow-2xl hover:bg-emerald-800 transform hover:scale-105 transition-all duration-400">
            Start Supporting Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-gray-950 to-gray-900 text-gray-300 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-white mb-8 tracking-wide">UPAY Handmade</h3>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Crafting hope, dignity, and opportunity — one handmade masterpiece at a time.
          </p>
          <div className="flex justify-center space-x-8 mb-10">
            <a href="#" className="text-3xl hover:text-emerald-400 transition">Instagram</a>
            <a href="#" className="text-3xl hover:text-emerald-400 transition">Facebook</a>
            <a href="#" className="text-3xl hover:text-emerald-400 transition">Contact</a>
          </div>
          <p className="text-sm opacity-70">
            © {new Date().getFullYear()} UPAY NGO – Made with ❤️ in Maharashtra
          </p>
        </div>
      </footer>
    </div>
  )
}