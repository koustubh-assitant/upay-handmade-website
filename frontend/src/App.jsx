import { useState, useEffect, useMemo } from 'react'
import { Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom'

// --- 1. DATA & ASSETS ---
const PRODUCTS_BACKUP = [
  { id: 1, name: 'Eco Jute Tote Bag', price: 450, category: 'Bags', tag: 'Natural Fiber', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800', maker: 'Meera', center: 'Nagpur', impact: '2 days of school', journey: ['Harvested in Nagpur', 'Sun-dried for 48hrs', 'Stitched by Meera', 'Quality Checked'] },
  { id: 2, name: 'Cotton Pouch', price: 320, category: 'Accessories', tag: 'Plant Dyed', img: 'https://images.unsplash.com/photo-1594913785162-e6785b42fbb1?q=80&w=800', maker: 'Sunita', center: 'Pune', impact: '1 health checkup', journey: ['Organic Cotton Sourced', 'Marigold Dyeing', 'Hand-sewn by Sunita', 'Eco-packed'] },
  { id: 3, name: 'Bamboo Clutch', price: 580, category: 'Bags', tag: 'Hand-Woven', img: 'https://images.unsplash.com/photo-1617103023988-f6a739327263?q=80&w=800', maker: 'Rajni', center: 'Delhi', impact: '3 school meals', journey: ['Sustainable Bamboo Cut', 'Hand Splitting', 'Woven by Rajni', 'Polished with Beeswax'] },
];

const LOGO_URL = "https://upay.org.in/wp-content/uploads/2021/05/UPAY-Logo-Small.png";

// --- 2. MAIN APP COMPONENT ---
export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)
  const [currency, setCurrency] = useState({ code: 'INR', symbol: '₹', rate: 1 })
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [extraDonation, setExtraDonation] = useState(100)
  
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error, using backup:", err);
        setProducts(PRODUCTS_BACKUP);
        setLoading(false);
      });
  }, []);

  const toggleCurrency = () => {
    currency.code === 'INR' 
      ? setCurrency({ code: 'USD', symbol: '$', rate: 0.012 }) 
      : setCurrency({ code: 'INR', symbol: '₹', rate: 1 })
  }

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      (activeCategory === 'All' || p.category === activeCategory) &&
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [products, searchTerm, activeCategory])

  const addToCart = (p) => {
    const ex = cart.find(i => i.id === p.id)
    ex ? setCart(cart.map(i => i.id === p.id ? {...i, quantity: i.quantity + 1} : i)) : setCart([...cart, {...p, quantity: 1}])
  }

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#1B3B32] font-sans flex flex-col">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-[#1B3B32]/95 backdrop-blur-md text-[#F5F2ED] z-50 py-4 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-6">
          <Link to="/" className="flex items-center gap-4">
            <img src={LOGO_URL} alt="UPAY" className="h-10 w-auto brightness-0 invert" />
            <span className="text-2xl font-serif font-bold tracking-widest hidden lg:block uppercase">UPAY</span>
          </Link>
          <div className="hidden md:flex flex-1 max-w-sm bg-white/10 rounded-full px-4 items-center border border-white/10">
            <input type="text" placeholder="Explore collection..." className="bg-transparent border-none text-sm w-full py-2 focus:ring-0 placeholder-white/40 text-white" onChange={(e)=>setSearchTerm(e.target.value)} />
          </div>
          <div className="flex items-center gap-6 uppercase tracking-widest text-[10px] font-bold">
            <Link to="/impact" className="hover:text-emerald-400 transition">Our Impact</Link>
            <button onClick={toggleCurrency} className="border border-white/20 px-3 py-1 rounded-full hover:bg-white hover:text-[#1B3B32] transition">{currency.code}</button>
            {user ? <Link to="/dashboard" className="text-emerald-400">Profile</Link> : <Link to="/login">Login</Link>}
            <Link to="/cart" className="bg-[#785139] px-6 py-2 rounded-full shadow-lg">Basket ({cart.reduce((s,i)=>s+i.quantity,0)})</Link>
          </div>
        </div>
      </nav>

      <div className="flex-grow pt-24">
        <Routes>
          <Route path="/" element={<Home products={filteredProducts} setActiveCategory={setActiveCategory} activeCategory={activeCategory} currency={currency} loading={loading} addToCart={addToCart} />} />
          <Route path="/impact" element={<ImpactPage currency={currency} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} currency={currency} allProducts={products} />} />
          <Route path="/cart" element={<CartPage cart={cart} currency={currency} donation={extraDonation} setDonation={setExtraDonation} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
        </Routes>
      </div>

      {/* FOOTER SECTION */}
      <footer className="bg-[#0F261F] text-[#F5F2ED]/70 py-24 mt-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          {/* NGO Information Block */}
          <div className="grid md:grid-cols-2 gap-16 mb-20 pb-16 border-b border-white/5">
            <div>
              <h2 className="text-white text-4xl font-serif italic mb-6">About UPAY</h2>
              <p className="text-lg leading-relaxed mb-6">
                Underprivileged Advancement by Youth (UPAY) is a non-profit organization established in 2010. 
                We aim to provide quality education and skill development to children and women living in 
                marginalized communities across India. 
              </p>
              <p className="text-lg leading-relaxed">
                Our "Reach & Teach" program brings classrooms to the streets, ensuring that no child 
                is left behind due to their socio-economic status. By purchasing from this boutique, 
                you directly fund these educational centers and provide fair wages to our rural artisans.
              </p>
            </div>
            <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 h-fit">
              <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-[0.3em] mb-6">Mission & Vision</h3>
              <ul className="space-y-4">
                <li className="flex gap-4"><span className="text-emerald-500">●</span> Eliminating illiteracy in street children.</li>
                <li className="flex gap-4"><span className="text-emerald-500">●</span> Empowering women through vocational training.</li>
                <li className="flex gap-4"><span className="text-emerald-500">●</span> Creating sustainable livelihoods in rural clusters.</li>
              </ul>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid md:grid-cols-4 gap-16 border-b border-white/5 pb-16">
            <div className="md:col-span-2">
              <img src={LOGO_URL} alt="UPAY" className="h-12 w-auto mb-6 brightness-0 invert opacity-80" />
              <p className="text-xl italic opacity-80 mb-10 max-w-sm">Crafting dignity, one stitch at a time.</p>
              <div className="flex gap-4">
                 <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[10px] uppercase font-bold tracking-widest border border-white/10 px-4 py-2 rounded-full hover:bg-[#785139] transition-all">Instagram</a>
                 <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-[10px] uppercase font-bold tracking-widest border border-white/10 px-4 py-2 rounded-full hover:bg-[#785139] transition-all">Facebook</a>
                 <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-[10px] uppercase font-bold tracking-widest border border-white/10 px-4 py-2 rounded-full hover:bg-[#785139] transition-all">Twitter</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Navigation</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/" className="hover:text-emerald-400 transition">Shop Boutique</Link></li>
                <li><Link to="/impact" className="hover:text-emerald-400 transition">Impact Stories</Link></li>
                <li><a href="https://upay.org.in/about-us/" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">Our History</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Support</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><a href="https://upay.org.in/donate" target="_blank" rel="noreferrer" className="text-emerald-400 underline underline-offset-8 hover:text-emerald-300">Donate Directly</a></li>
                <li><a href="mailto:info@upay.org.in" className="hover:text-emerald-400 transition">Volunteer with Us</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-12 opacity-50 text-[10px] tracking-[0.4em] uppercase">© {new Date().getFullYear()} UPAY NGO | NGO Registered: 2010</div>
        </div>
      </footer>
    </div>
  )
}

// --- 3. PAGE COMPONENTS ---

function Home({ products, setActiveCategory, activeCategory, currency, loading, addToCart }) {
  if (loading) return <p className="text-center text-2xl py-20 font-serif italic">Loading masterpieces...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 mb-20">
      <header className="py-20 text-center">
        <h1 className="text-7xl md:text-8xl font-serif italic mb-6">The Boutique</h1>
        <p className="text-xl font-serif text-[#785139]">Empowering rural hands, enriching global homes.</p>
      </header>

      <div className="flex gap-4 overflow-x-auto no-scrollbar mb-16 py-4 justify-center">
        {['All', 'Bags', 'Accessories', 'Home'].map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-10 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${activeCategory === cat ? 'bg-[#1B3B32] text-white shadow-xl' : 'bg-white text-stone-400'}`}>{cat}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {products.map(p => (
          <div key={p.id} className="group flex flex-col items-center">
            <Link to={`/product/${p.id}`} className="w-full">
              <div className="aspect-[3/4] rounded-t-full rounded-b-2xl overflow-hidden shadow-2xl mb-8 bg-emerald-50">
                <img src={p.img || 'https://via.placeholder.com/800x1000?text=Handcrafted'} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              </div>
            </Link>
            <h3 className="text-3xl font-serif mb-2">{p.name}</h3>
            <p className="text-stone-500 mb-4 text-sm uppercase tracking-widest">{p.maker}</p>
            <div className="flex flex-col items-center gap-4">
              <p className="text-[#785139] font-bold text-xl">{currency.symbol}{(p.price * currency.rate).toFixed(2)}</p>
              <button onClick={() => addToCart(p)} className="bg-emerald-800 text-white px-8 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#785139] transition-colors">Add to Basket</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ImpactPage({ currency }) {
  const [calcDonation, setCalcDonation] = useState(1000);
  const handleDownload = () => {
    const reportText = "UPAY IMPACT 2024: 12k students taught, 450+ artisans empowered.";
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'UPAY_Report_2024.txt'; a.click();
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-6xl font-serif italic mb-20 text-center">Our Impact</h2>
      <section className="bg-[#1B3B32] text-white rounded-[80px] p-12 md:p-20 mb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-serif mb-8 italic text-emerald-200">Impact Multiplier</h3>
          <input type="range" min="100" max="10000" step="100" value={calcDonation} onChange={(e)=>setCalcDonation(e.target.value)} className="w-full h-2 bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-[#785139] mb-12" />
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white/5 p-10 rounded-[40px] border border-white/10">
              <p className="text-4xl font-serif mb-2">{currency.symbol}{(calcDonation * currency.rate).toFixed(0)}</p>
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-emerald-400">Contribution</p>
            </div>
            <div className="bg-white/5 p-10 rounded-[40px] border border-white/10">
              <p className="text-4xl font-serif mb-2">{Math.floor(calcDonation / 150)} Kits</p>
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-emerald-400">School Kits</p>
            </div>
            <div className="bg-white/5 p-10 rounded-[40px] border border-white/10">
              <p className="text-4xl font-serif mb-2">{Math.floor(calcDonation / 50)} Meals</p>
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-emerald-400">Child Nutrition</p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center">
        <button onClick={handleDownload} className="bg-[#785139] text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#1B3B32] transition-all shadow-2xl">Download 2024 Transparency Report</button>
      </div>
    </div>
  )
}

function ProductDetail({ addToCart, currency, allProducts }) {
  const { id } = useParams()
  const p = allProducts.find(item => item.id === parseInt(id)) || PRODUCTS_BACKUP.find(item => item.id === parseInt(id))
  if (!p) return <div className="p-20 text-center">Product not found.</div>
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-20">
      <div className="space-y-12">
        <img src={p.img} alt={p.name} className="aspect-[4/5] object-cover rounded-t-full rounded-b-3xl shadow-2xl" />
        <div className="bg-white p-12 rounded-[50px] shadow-sm border border-stone-100">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-[#785139]">Trace the Thread (Artisan Journey)</h4>
          <div className="relative border-l-2 border-emerald-100 ml-4 space-y-12">
            {(p.journey || ['Ethically sourced']).map((step, i, arr) => (
              <div key={i} className="relative pl-12">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-lg"></div>
                <p className={`text-xl font-serif ${i === arr.length - 1 ? 'text-[#1B3B32] font-bold' : 'text-stone-300 italic'}`}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-12 lg:sticky lg:top-40 h-fit">
        <h1 className="text-7xl font-serif leading-none">{p.name}</h1>
        <p className="text-5xl font-serif text-[#785139]">{currency.symbol}{(p.price * currency.rate).toFixed(2)}</p>
        <div className="bg-[#1B3B32] text-emerald-200 p-8 rounded-3xl text-sm font-bold uppercase tracking-widest shadow-xl">🌿 Impact: {p.impact || 'Direct Artisan Support'}</div>
        <button onClick={() => addToCart(p)} className="w-full bg-[#785139] text-white py-8 rounded-full font-serif italic text-3xl shadow-2xl hover:bg-[#1B3B32] transition-all">Add to Basket</button>
      </div>
    </div>
  )
}

function CartPage({ cart, currency, donation, setDonation }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0)
  const total = subtotal + donation;
  const totalKits = Math.floor(total / 150);
  const totalMeals = Math.floor(total / 50);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 relative">
      <div className="grid lg:grid-cols-3 gap-20">
        <div className="lg:col-span-2 space-y-12">
          <h2 className="text-6xl font-serif mb-12 italic">Impact Basket</h2>
          {cart.length === 0 ? (
            <div className="bg-white p-20 rounded-[50px] text-center border border-dashed border-stone-300">
              <p className="text-2xl font-serif italic text-stone-400">Your basket is empty.</p>
              <Link to="/" className="mt-6 inline-block text-[#785139] font-bold underline">Go Shopping</Link>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="flex gap-10 items-center bg-white p-10 rounded-[50px] shadow-sm">
              <img src={item.img} alt={item.name} className="w-28 h-28 object-cover rounded-2xl" />
              <div className="flex-1 font-serif text-3xl">{item.name} (x{item.quantity})</div>
              <p className="text-[#785139] font-bold text-2xl">{currency.symbol}{(item.price * currency.rate).toFixed(2)}</p>
            </div>
          ))}
          <div className="bg-[#0F261F] text-white p-12 rounded-[60px] shadow-2xl">
            <h4 className="text-3xl font-serif mb-8 italic">Gift a Little Extra?</h4>
            <input type="range" min="0" max="2000" step="100" value={donation} onChange={(e)=>setDonation(parseInt(e.target.value))} className="w-full mb-8 accent-[#785139]" />
            <p className="text-5xl font-serif text-emerald-400">{currency.symbol}{(donation * currency.rate).toFixed(0)}</p>
          </div>
        </div>
        <div className="bg-white p-16 rounded-[60px] h-fit sticky top-40 shadow-2xl border border-stone-100">
          <h3 className="text-3xl font-serif mb-10 italic text-stone-400">Summary</h3>
          <div className="space-y-6 text-xl mb-12">
            <div className="flex justify-between"><span>Subtotal</span><span>{currency.symbol}{(subtotal * currency.rate).toFixed(2)}</span></div>
            <div className="flex justify-between text-emerald-600 font-bold italic"><span>Gift</span><span>{currency.symbol}{(donation * currency.rate).toFixed(2)}</span></div>
            <hr />
            <div className="flex justify-between text-5xl font-serif font-bold text-[#1B3B32]"><span>Total</span><span>{currency.symbol}{(total * currency.rate).toFixed(0)}</span></div>
          </div>
          <button onClick={() => cart.length > 0 && setShowSuccess(true)} className="w-full bg-[#1B3B32] text-white py-8 rounded-full font-serif italic text-3xl hover:bg-[#785139] transition-all">Checkout</button>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#1B3B32]/95 backdrop-blur-xl" onClick={() => setShowSuccess(false)}></div>
          <div className="relative bg-[#F5F2ED] w-full max-w-2xl p-16 rounded-[80px] shadow-2xl text-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 text-white text-4xl shadow-lg">✓</div>
            <h2 className="text-6xl font-serif italic mb-6 text-[#1B3B32]">Namaste!</h2>
            <p className="text-xl font-serif text-stone-500 mb-12">Your support has provided:</p>
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-10 rounded-[40px] border border-stone-200">
                <p className="text-5xl font-serif mb-2 text-[#1B3B32]">{totalKits}</p>
                <p className="text-[10px] uppercase font-bold tracking-[0.4em] opacity-40">School Kits</p>
              </div>
              <div className="bg-white p-10 rounded-[40px] border border-stone-200">
                <p className="text-5xl font-serif mb-2 text-[#1B3B32]">{totalMeals}</p>
                <p className="text-[10px] uppercase font-bold tracking-[0.4em] opacity-40">Warm Meals</p>
              </div>
            </div>
            <button onClick={() => setShowSuccess(false)} className="bg-[#1B3B32] text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs">Return to Boutique</button>
          </div>
        </div>
      )}
    </div>
  )
}

function LoginPage({ setUser }) {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <form onSubmit={(e) => { e.preventDefault(); setUser({name: 'Supporter', impactPoints: 2400}); navigate('/dashboard') }} className="bg-white p-20 rounded-[70px] shadow-2xl w-full max-w-xl text-center">
        <h2 className="text-5xl font-serif mb-12 italic">Sign In</h2>
        <input type="email" placeholder="Email" className="w-full bg-[#F5F2ED] border-none rounded-3xl px-8 py-6 text-xl mb-6" required />
        <input type="password" placeholder="Password" className="w-full bg-[#F5F2ED] border-none rounded-3xl px-8 py-6 text-xl mb-12" required />
        <button className="w-full bg-[#1B3B32] text-white py-6 rounded-full font-serif italic text-2xl shadow-xl hover:bg-[#785139] transition-all">Welcome Back</button>
      </form>
    </div>
  )
}

function Dashboard({ user, setUser }) {
  const navigate = useNavigate()
  if (!user) return null
  return (
    <div className="max-w-6xl mx-auto px-6 py-40">
      <div className="bg-white p-20 rounded-[70px] shadow-2xl text-center relative overflow-hidden">
        <h1 className="text-7xl font-serif italic mb-12 text-[#1B3B32]">Profile</h1>
        <div className="bg-[#F5F2ED] p-16 rounded-[50px] border border-stone-100">
            <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-[#785139] mb-4">Your Lifetime Impact Minutes</p>
            <p className="text-9xl font-serif text-[#1B3B32]">{user.impactPoints}</p>
        </div>
        <button onClick={() => { setUser(null); navigate('/') }} className="mt-12 text-red-400 font-bold uppercase tracking-widest text-[10px] underline">Logout Account</button>
      </div>
    </div>
  )
}