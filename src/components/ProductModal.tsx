import { useState } from 'react';
import { useCart, type Product } from '../context/CartContext';
import { X, Star, ShieldCheck, Truck } from 'lucide-react';

export default function ProductModal({ product, onClose }: { product: Product, onClose: () => void }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) return null;

  const sizes = product.category === 'Accessories' ? ['ONE SIZE'] : ['S', 'M', 'L', 'XL', 'XXL'];

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, selectedSize, quantity);
      setIsAdding(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-dark-surface w-full max-w-4xl rounded-2xl overflow-hidden border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row relative animate-slide-up max-h-[90vh]">
        
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-neon-pink text-white rounded-full backdrop-blur-sm transition-colors">
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-dark-bg relative">
          <img src={product.image_url} alt={product.name} className="w-full h-64 md:h-full object-cover" />
          {product.original_price > product.price && (
            <div className="absolute top-4 left-4 bg-neon-pink text-white font-bold px-3 py-1 rounded shadow-lg neon-bg-pink">
              SALE
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
          <div className="text-xs text-neon-blue font-bold tracking-widest uppercase mb-2">{product.category}</div>
          <h2 className="text-2xl md:text-3xl font-black mb-4">{product.name}</h2>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-800">
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-white">Rp {product.price.toLocaleString('id-ID')}</span>
              {product.original_price > product.price && (
                <span className="text-lg text-gray-500 line-through mb-1">Rp {product.original_price.toLocaleString('id-ID')}</span>
              )}
            </div>
            <div className="ml-auto flex items-center gap-1 bg-gray-900 px-2 py-1 rounded border border-gray-800">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-bold">{product.rating}</span>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            {product.description || "Premium quality streetwear designed for the modern urban environment. Features advanced fabric technology for maximum comfort and durability. Limited edition drop."}
          </p>

          {/* Selectors */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold uppercase tracking-wider text-gray-300">Select Size</span>
              <span className="text-xs text-neon-blue cursor-pointer hover:underline">Size Guide</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-lg border flex items-center justify-center font-bold transition-all ${
                    selectedSize === size 
                      ? 'border-neon-pink text-neon-pink shadow-[0_0_10px_rgba(255,46,159,0.3)] bg-pink-900/20' 
                      : 'border-gray-700 text-gray-400 hover:border-white hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-3 block">Quantity</span>
            <div className="flex items-center gap-4 w-fit bg-dark-bg border border-gray-800 rounded-lg p-1">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:text-neon-pink hover:bg-gray-900 rounded-md transition-colors">-</button>
              <span className="w-8 text-center font-bold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:text-neon-blue hover:bg-gray-900 rounded-md transition-colors">+</button>
            </div>
          </div>

          <div className="mt-auto pt-6 flex flex-col gap-3">
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-4 font-black uppercase tracking-widest rounded-lg transition-all flex justify-center items-center gap-2 ${
                isAdding ? 'bg-gray-600 text-gray-300 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]'
              }`}
            >
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </button>
            
            <div className="flex justify-center gap-6 mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-1"><ShieldCheck size={14}/> 100% Original</div>
              <div className="flex items-center gap-1"><Truck size={14}/> Fast Delivery</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
