import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Star, MessageCircle, Zap } from 'lucide-react';
import { CartProvider, useCart, type Product } from './context/CartContext';
import CartCheckout from './components/CartCheckout';
import ProductModal from './components/ProductModal';

// --- COMPONENTS ---

const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter animate-flicker">
            <span className="text-white">ID</span>
            <span className="text-neon-pink neon-text-pink ml-1">OLSHOP</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium text-sm tracking-widest uppercase">
          <a href="#home" className="hover:text-neon-pink transition-colors">Home</a>
          <a href="#shop" className="hover:text-neon-blue transition-colors">Shop</a>
          <a href="#flash-sale" className="hover:text-neon-pink transition-colors flex items-center gap-1"><Zap size={14} className="text-yellow-400"/> Sale</a>
          <a href="#new" className="hover:text-white text-gray-400 transition-colors">New Arrival</a>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:text-neon-pink transition-colors group">
            <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-neon-pink text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center neon-bg-pink">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark-surface border-b border-gray-800 p-4 flex flex-col gap-4">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="p-2 border-b border-gray-800">Home</a>
          <a href="#shop" onClick={() => setMobileMenuOpen(false)} className="p-2 border-b border-gray-800">Shop</a>
          <a href="#flash-sale" onClick={() => setMobileMenuOpen(false)} className="p-2 border-b border-gray-800 text-neon-pink">Flash Sale</a>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden gradient-bg min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-slide-up">
          <div className="inline-block px-3 py-1 border border-neon-blue text-neon-blue text-xs font-bold tracking-widest uppercase mb-6 rounded-full bg-blue-900/20 backdrop-blur-sm">
            Cyberpunk Collection 2025
          </div>
          <h1 className="text-5xl lg:text-7xl font-black uppercase leading-tight mb-6">
            Future <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-purple-500 neon-text-pink">Streetwear</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-md">
            Elevate your style with our premium, high-tech urban apparel. Designed for the bold.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#shop" className="px-8 py-4 bg-neon-pink text-white font-bold uppercase tracking-wider rounded-sm hover:bg-pink-600 transition-all neon-bg-pink hover:scale-105 active:scale-95">
              Shop Now
            </a>
            <a href="#new" className="px-8 py-4 border border-gray-600 text-white font-bold uppercase tracking-wider rounded-sm hover:border-white transition-all">
              Explore
            </a>
          </div>
        </div>
        
        <div className="relative hidden lg:block animate-float">
          <div className="absolute inset-0 bg-neon-blue blur-[100px] opacity-20 rounded-full"></div>
          <img 
            src="https://images.unsplash.com/photo-1617391764121-6548d8b2e35f?q=80&w=1964&auto=format&fit=crop" 
            alt="Cyberpunk Model" 
            className="relative z-10 w-full max-w-md mx-auto rounded-lg border border-gray-800 shadow-2xl"
          />
          {/* Floating badges */}
          <div className="absolute top-10 -left-10 bg-dark-surface border border-gray-700 p-3 rounded-lg shadow-xl flex items-center gap-3 z-20 backdrop-blur-md">
             <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500"><Star size={20}/></div>
             <div>
               <p className="text-xs text-gray-400">Premium Quality</p>
               <p className="font-bold">4.9/5 Rating</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => (
  <div className="bg-neon-pink text-white py-3 overflow-hidden whitespace-nowrap border-y border-pink-400 shadow-[0_0_15px_rgba(255,46,159,0.5)]">
    <div className="inline-block animate-marquee font-bold tracking-widest uppercase">
      ⚡ FLASH SALE UP TO 50% OFF ⚡ FREE SHIPPING ON ORDERS OVER RP 500.000 ⚡ NEW ARRIVALS EVERY WEEK ⚡ PREMIUM STREETWEAR ⚡ 
      FLASH SALE UP TO 50% OFF ⚡ FREE SHIPPING ON ORDERS OVER RP 500.000 ⚡ NEW ARRIVALS EVERY WEEK ⚡ PREMIUM STREETWEAR ⚡
    </div>
  </div>
);

const ProductCard = ({ product, onClick }: { product: Product, onClick: (p: Product) => void }) => {
  return (
    <div 
      className="group relative bg-dark-surface rounded-xl overflow-hidden border border-gray-800 hover:neon-border-blue transition-all duration-300 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(product)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.original_price > product.price && (
          <span className="bg-neon-pink text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
            -{Math.round((1 - product.price / product.original_price) * 100)}%
          </span>
        )}
        {product.is_new_arrival && (
          <span className="bg-neon-blue text-dark-bg text-xs font-bold px-2 py-1 rounded shadow-lg">
            NEW
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        {/* Overlay Add to Cart button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <button className="bg-white text-black font-bold py-3 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-neon-blue hover:text-white">
             Quick View
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{product.category}</div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-neon-blue transition-colors">{product.name}</h3>
        
        <div className="mt-auto">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} />
            ))}
            <span className="text-xs text-gray-400 ml-1">({product.rating})</span>
          </div>
          
          <div className="flex items-end gap-2">
            <span className="text-xl font-black text-white">Rp {product.price.toLocaleString('id-ID')}</span>
            {product.original_price > product.price && (
              <span className="text-sm text-gray-500 line-through mb-1">Rp {product.original_price.toLocaleString('id-ID')}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FlashSaleTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 30, s: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else {
          s = 59;
          if (m > 0) m--;
          else {
            m = 59;
            if (h > 0) h--;
          }
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
      <div className="bg-gray-800 text-white font-mono font-bold px-3 py-2 rounded">{pad(timeLeft.h)}</div>
      <span className="text-neon-pink font-bold">:</span>
      <div className="bg-gray-800 text-white font-mono font-bold px-3 py-2 rounded">{pad(timeLeft.m)}</div>
      <span className="text-neon-pink font-bold">:</span>
      <div className="bg-gray-800 text-white font-mono font-bold px-3 py-2 rounded text-neon-pink neon-border-pink">{pad(timeLeft.s)}</div>
    </div>
  );
};

const FloatingWhatsApp = () => (
  <a 
    href="https://wa.me/6281234567890?text=Halo%20ID%20OLSHOP,%20saya%20ingin%20bertanya..." 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:scale-110 transition-transform flex items-center justify-center animate-pulse-glow"
  >
    <MessageCircle size={28} />
  </a>
);

// --- MAIN APP ---

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ['All', "Men's Clothing", "Women's Clothing", "Accessories"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const flashSaleProducts = products.filter(p => p.original_price > p.price).slice(0, 4);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Hero />
        <Marquee />

        {/* Flash Sale Section */}
        {flashSaleProducts.length > 0 && (
          <section id="flash-sale" className="py-16 bg-dark-bg border-b border-gray-900">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
                <div className="flex items-center gap-4">
                  <Zap size={32} className="text-yellow-400 fill-yellow-400 animate-pulse" />
                  <h2 className="text-3xl font-black uppercase tracking-wider">Flash <span className="text-neon-pink neon-text-pink">Sale</span></h2>
                </div>
                <FlashSaleTimer />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {flashSaleProducts.map(product => (
                  <ProductCard key={product.id} product={product} onClick={setSelectedProduct} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Shop Section */}
        <section id="shop" className="py-20 relative">
          {/* Decorative background elements */}
          <div className="absolute top-40 left-0 w-64 h-64 bg-neon-pink rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
          <div className="absolute bottom-40 right-0 w-64 h-64 bg-neon-blue rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black uppercase tracking-wider mb-4">Our <span className="text-neon-blue neon-text-blue">Collection</span></h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Discover the latest trends in urban streetwear. Premium quality, futuristic designs.</p>
            </div>

            {/* Category Filter */}
            <div className="flex overflow-x-auto pb-4 mb-10 gap-3 justify-start md:justify-center hide-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-6 py-2 rounded-full border font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                      : 'border-gray-700 text-gray-400 hover:border-neon-blue hover:text-neon-blue'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-dark-surface rounded-xl aspect-[3/4] border border-gray-800"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <ProductCard product={product} onClick={setSelectedProduct} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-dark-surface border-t border-gray-800 pt-16 pb-8 mt-auto">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              <div className="md:col-span-2">
                <span className="text-3xl font-black tracking-tighter mb-4 block">
                  <span className="text-white">ID</span>
                  <span className="text-neon-pink neon-text-pink ml-1">OLSHOP</span>
                </span>
                <p className="text-gray-400 mb-6 max-w-sm">
                  Premium streetwear for the modern cyber-citizen. High quality materials, futuristic designs, worldwide shipping.
                </p>
                <div className="flex gap-4">
                  {/* Social icons placeholders */}
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-neon-pink transition-colors cursor-pointer">IG</div>
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-neon-blue transition-colors cursor-pointer">TT</div>
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">X</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4 uppercase tracking-wider">Quick Links</h4>
                <ul className="flex flex-col gap-2 text-gray-400">
                  <li><a href="#" className="hover:text-neon-pink transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-neon-pink transition-colors">Size Guide</a></li>
                  <li><a href="#" className="hover:text-neon-pink transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-neon-pink transition-colors">Track Order</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4 uppercase tracking-wider">Legal</h4>
                <ul className="flex flex-col gap-2 text-gray-400">
                  <li><a href="#" className="hover:text-neon-blue transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-neon-blue transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-neon-blue transition-colors">Return Policy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
              <p>&copy; 2025 ID OLSHOP. All rights reserved.</p>
              <div className="flex gap-2">
                {/* Payment icons mock */}
                <div className="px-2 py-1 bg-gray-900 rounded border border-gray-800 text-xs font-bold">QRIS</div>
                <div className="px-2 py-1 bg-gray-900 rounded border border-gray-800 text-xs font-bold">GoPay</div>
                <div className="px-2 py-1 bg-gray-900 rounded border border-gray-800 text-xs font-bold">ShopeePay</div>
                <div className="px-2 py-1 bg-gray-900 rounded border border-gray-800 text-xs font-bold">Transfer</div>
              </div>
            </div>
          </div>
        </footer>

        {/* Modals & Overlays */}
        <CartCheckout />
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  );
}
