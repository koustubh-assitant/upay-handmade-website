import './index.css'

export default function App() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Eco Jute Tote Bag',
      price: '₹450',
      maker: 'Artisans from Nagpur center',
      img: 'https://images.unsplash.com/photo-1599570-1b0b4a0c6b0d?w=800&auto=format&fit=crop&q=80',
      tag: 'Best Seller',
    },
    {
      id: 2,
      name: 'Hand-Embroidered Pouch',
      price: '₹320',
      maker: 'Youth skill group Pune',
      img: 'https://images.unsplash.com/photo-1584917865446-1a2d6c8d7b95?w=800&auto=format&fit=crop&q=80',
      tag: 'Limited Edition',
    },
    {
      id: 3,
      name: 'Woven Bamboo Clutch',
      price: '₹580',
      maker: 'Maharashtra craft program',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
      tag: 'New Arrival',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans antialiased">
      {/* Navbar - Glass effect */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-3xl font-extrabold text-emerald-800 tracking-tight">
            UPAY
            <span className="text-emerald-600">Handmade</span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {['Home', 'Shop', 'Stories', 'Impact', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-emerald-700 font-medium transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <button className="md:hidden text-3xl text-emerald-800">☰</button>
        </div>
      </nav>

      {/* Hero - Bigger, bolder, cinematic */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-emerald-800/80 to-emerald-700/70 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600')] bg-cover bg-center opacity-20 z-0"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tight drop-shadow-2xl animate-fade-in">
            Handmade with Soul
          </h1>
          <p className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto font-light opacity-90 drop-shadow-lg">
            Every stitch, every weave — a story of empowerment, education, and hope
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-emerald-900 font-bold text-xl px-14 py-6 rounded-full shadow-2xl hover:shadow-3xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-300">
              Discover Collection
            </button>
            <button className="border-2 border-white text-white font-bold text-xl px-14 py-6 rounded-full hover:bg-white hover:text-emerald-900 transition-all duration-300 backdrop-blur-sm">
              See Our Impact
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products – Glassmorphism cards */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-20 text-gray-900 tracking-tight">
            Crafted with Care
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/30 hover:border-emerald-300/50 transition-all duration-500 hover:shadow-emerald-500/20 hover:-translate-y-6"
              >
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 bg-emerald-700 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg transform group-hover:scale-110 transition">
                    {product.tag}
                  </div>
                </div>

                <div className="p-8 relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    {product.maker}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-4xl font-extrabold text-emerald-700">
                      {product.price}
                    </span>
                    <button className="bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 transition transform hover:scale-105 shadow-lg">
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
      <section className="py-32 bg-gradient-to-br from-emerald-50 to-emerald-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black text-emerald-900 mb-10">
            Your Purchase Changes Lives
          </h2>
          <p className="text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            100% of proceeds go toward education, vocational training, and community upliftment for underprivileged women and children in Maharashtra.
          </p>
          <button className="bg-emerald-700 text-white font-bold text-2xl px-16 py-8 rounded-full shadow-2xl hover:bg-emerald-800 transform hover:scale-105 transition-all duration-300">
            Shop & Support Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-gray-950 to-gray-900 text-gray-300 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-white mb-8 tracking-wide">UPAY Handmade</h3>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Crafting hope, one handmade piece at a time.
          </p>
          <p className="text-sm opacity-70">
            © {new Date().getFullYear()} UPAY NGO – Empowering Communities in Maharashtra
          </p>
        </div>
      </footer>
    </div>
  )
}
