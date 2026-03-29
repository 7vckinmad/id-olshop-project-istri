import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Plus, Minus, Trash2, Smartphone, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';

export default function CartCheckout() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState('cart'); // cart, form, payment, success
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCartOpen) return null;

  const handleClose = () => {
    setIsCartOpen(false);
    setTimeout(() => setCheckoutStep('cart'), 300); // reset after animation
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('payment');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_address: formData.address,
          total_amount: cartTotal,
          payment_method: paymentMethod,
          items: cartItems
        })
      });

      if (paymentMethod === 'whatsapp') {
        // Redirect to WA
        const text = `Halo ID OLSHOP, saya ingin order:\n\n${cartItems.map(i => `- ${i.name} (${i.size}) x${i.quantity} = Rp ${(i.price * i.quantity).toLocaleString('id-ID')}`).join('\n')}\n\nTotal: Rp ${cartTotal.toLocaleString('id-ID')}\n\nNama: ${formData.name}\nAlamat: ${formData.address}`;
        window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`, '_blank');
      }

      setTimeout(() => {
        setIsProcessing(false);
        setCheckoutStep('success');
        clearCart();
      }, 1500);

    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-dark-surface h-full flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.5)] border-l border-gray-800 animate-slide-up md:animate-none">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-dark-bg">
          <h2 className="text-xl font-black uppercase tracking-wider flex items-center gap-2">
            {checkoutStep === 'cart' && <><ShoppingBag className="text-neon-pink" /> Your Cart</>}
            {checkoutStep === 'form' && 'Shipping Info'}
            {checkoutStep === 'payment' && 'Payment'}
            {checkoutStep === 'success' && 'Order Complete'}
          </h2>
          <button onClick={handleClose} className="p-2 hover:text-neon-pink transition-colors rounded-full hover:bg-gray-800">
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-5 custom-scrollbar">
          
          {/* STEP 1: CART */}
          {checkoutStep === 'cart' && (
            cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                <ShoppingBag size={64} className="opacity-20" />
                <p>Your cart is empty</p>
                <button onClick={handleClose} className="px-6 py-2 border border-gray-600 rounded-full hover:text-white hover:border-white transition-colors mt-4">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-dark-bg p-3 rounded-xl border border-gray-800">
                    <img src={item.image_url} alt={item.name} className="w-20 h-24 object-cover rounded-lg" />
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm line-clamp-2">{item.name}</h4>
                        <p className="text-xs text-gray-400 mt-1">Size: <span className="text-white font-bold">{item.size}</span></p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-neon-blue">Rp {item.price.toLocaleString('id-ID')}</span>
                        
                        <div className="flex items-center gap-2 bg-gray-900 rounded-lg p-1 border border-gray-800">
                          <button onClick={() => updateQuantity(item.id, item.size, -1)} className="p-1 hover:text-neon-pink"><Minus size={14} /></button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.size, 1)} className="p-1 hover:text-neon-blue"><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.size)} className="text-gray-600 hover:text-red-500 self-start p-1">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )
          )}

          {/* STEP 2: FORM */}
          {checkoutStep === 'form' && (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="flex flex-col gap-4">
              <div className="bg-dark-bg p-4 rounded-xl border border-gray-800 mb-2">
                <h3 className="font-bold mb-2 flex items-center gap-2"><ShoppingBag size={16}/> Order Summary</h3>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-800">
                  <span>Total</span>
                  <span className="text-neon-pink">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-dark-bg border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:neon-border-blue transition-shadow" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">WhatsApp Number</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-dark-bg border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:neon-border-blue transition-shadow" placeholder="0812..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Full Address</label>
                <textarea required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-dark-bg border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:neon-border-blue transition-shadow min-h-[100px]" placeholder="Street, City, Postal Code..." />
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT (Midtrans Mockup) */}
          {checkoutStep === 'payment' && (
            <div className="flex flex-col gap-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black mb-1">Rp {cartTotal.toLocaleString('id-ID')}</h3>
                <p className="text-gray-400 text-sm">Select payment method</p>
              </div>

              <div className="grid gap-3">
                <label className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'qris' ? 'neon-border-blue bg-blue-900/10' : 'border-gray-800 bg-dark-bg hover:border-gray-600'}`}>
                  <input type="radio" name="payment" value="qris" onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                  <div className="flex-grow">
                    <span className="font-bold block">QRIS (GoPay, OVO, DANA)</span>
                    <span className="text-xs text-gray-400">Scan QR Code instantly</span>
                  </div>
                  <Smartphone className={paymentMethod === 'qris' ? 'text-neon-blue' : 'text-gray-600'} />
                </label>

                <label className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'neon-border-blue bg-blue-900/10' : 'border-gray-800 bg-dark-bg hover:border-gray-600'}`}>
                  <input type="radio" name="payment" value="transfer" onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                  <div className="flex-grow">
                    <span className="font-bold block">Virtual Account</span>
                    <span className="text-xs text-gray-400">BCA, Mandiri, BNI, BRI</span>
                  </div>
                  <CreditCard className={paymentMethod === 'transfer' ? 'text-neon-blue' : 'text-gray-600'} />
                </label>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-800"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase font-bold">OR</span>
                  <div className="flex-grow border-t border-gray-800"></div>
                </div>

                <label className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'whatsapp' ? 'neon-border-pink bg-pink-900/10' : 'border-gray-800 bg-dark-bg hover:border-gray-600'}`}>
                  <input type="radio" name="payment" value="whatsapp" onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                  <div className="flex-grow">
                    <span className="font-bold block text-green-400">Order via WhatsApp</span>
                    <span className="text-xs text-gray-400">Manual payment & confirmation</span>
                  </div>
                  <CheckCircle className={paymentMethod === 'whatsapp' ? 'text-neon-pink' : 'text-gray-600'} />
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {checkoutStep === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center gap-6">
              <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 animate-pulse-glow">
                <CheckCircle size={48} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase mb-2">Order Confirmed!</h3>
                <p className="text-gray-400">Thank you for your purchase. We will process your order shortly.</p>
              </div>
              <button onClick={handleClose} className="px-8 py-3 bg-white text-black font-bold uppercase tracking-wider rounded-full hover:bg-gray-200 transition-colors mt-4">
                Back to Store
              </button>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        {checkoutStep !== 'success' && cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-800 bg-dark-surface shadow-[0_-10px_20px_rgba(0,0,0,0.5)] z-10">
            {checkoutStep === 'cart' && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 uppercase tracking-wider text-sm font-bold">Total</span>
                  <span className="text-2xl font-black text-neon-pink neon-text-pink">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <button onClick={() => setCheckoutStep('form')} className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-lg hover:bg-gray-200 transition-all flex justify-center items-center gap-2">
                  Checkout <ArrowRight size={20} />
                </button>
              </>
            )}
            
            {checkoutStep === 'form' && (
              <div className="flex gap-3">
                <button type="button" onClick={() => setCheckoutStep('cart')} className="px-6 py-4 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
                  Back
                </button>
                <button type="submit" form="checkout-form" className="flex-grow py-4 bg-neon-blue text-dark-bg font-black uppercase tracking-widest rounded-lg hover:bg-cyan-400 transition-all neon-bg-blue">
                  Continue to Payment
                </button>
              </div>
            )}

            {checkoutStep === 'payment' && (
              <div className="flex gap-3">
                <button type="button" onClick={() => setCheckoutStep('form')} className="px-6 py-4 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors" disabled={isProcessing}>
                  Back
                </button>
                <button 
                  onClick={handlePayment} 
                  disabled={!paymentMethod || isProcessing}
                  className={`flex-grow py-4 font-black uppercase tracking-widest rounded-lg transition-all flex justify-center items-center gap-2 ${
                    !paymentMethod ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 
                    paymentMethod === 'whatsapp' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-neon-pink text-white neon-bg-pink'
                  }`}
                >
                  {isProcessing ? (
                    <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></span>
                  ) : (
                    paymentMethod === 'whatsapp' ? 'Send to WhatsApp' : `Pay Rp ${cartTotal.toLocaleString('id-ID')}`
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
