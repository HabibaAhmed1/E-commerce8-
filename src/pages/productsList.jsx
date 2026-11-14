import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductsList() {
  // منتجات تجريبية مطابقة لتصميم الكروت الخاص بكم
  const [products] = useState([
    {
      _id: '12345',
      name: 'Sony Wireless Headphones Pro',
      category: 'ELECTRONICS • AUDIO • SONY',
      description: 'Premium wireless headphones with noise cancellation and exceptional sound quality.',
      price: 599.99,
      discount: '-$399.99 off',
      stock: '39 in stock',
      isFeatured: true,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      tags: ['wireless', 'headphones']
    },
    {
      _id: '67890',
      name: 'Logitech MX Mechanical Wireless Keyboard',
      category: 'ELECTRONICS • ACCESSORIES • LOGITECH',
      description: 'Tactile Quiet Low-Profile Switches, Smart Illumination, Multi-Device Bluetooth',
      price: 169.99,
      discount: '-$149.99 off',
      stock: '47 in stock',
      isFeatured: false,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
      tags: ['keyboard', 'mechanical', 'logitech']
    }
  ]);

  return (
    <div className="products-page">
      <div className="products-page-header">
        <div>
          <span className="products-eyebrow">COMMERCE ADMIN PANEL</span>
          <h1>Products Catalog</h1>
          <p>Manage your store products, inventory, and quick actions.</p>
        </div>
        <Link to="/dashboard/products/new" className="products-primary-button">
          + Add Product
        </Link>
      </div>

      {/* شبكة الكروت (Products Cards Grid) مطابقة للتصميم */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '24px' }}>
        {products.map((item) => (
          <div key={item._id} className="products-table-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* صورة المنتج مع بادج الـ Featured والـ Stock */}
            <div style={{ position: 'relative', width: '100%', height: '240px', borderRadius: '12px', overflow: 'hidden', background: '#f0f1f6' }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              
              {item.isFeatured && (
                <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#f59e0b', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
                  ★ Featured
                </span>
              )}
              
              <span className="products-stock available" style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
                {item.stock}
              </span>
            </div>

            {/* تفاصيل المنتج */}
            <div>
              <span style={{ color: 'var(--products-primary)', fontSize: '10px', fontWeight: '800', letterSpacing: '1px' }}>
                {item.category}
              </span>
              <h3 style={{ margin: '6px 0 8px', fontSize: '18px', fontWeight: '750', color: 'var(--products-text)' }}>
                {item.name}
              </h3>
              <p style={{ margin: '0 0 12px', color: 'var(--products-muted)', fontSize: '12px', lineHeight: '1.5' }}>
                {item.description}
              </p>

              {/* السعر والخصم */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span className="products-price" style={{ fontSize: '22px' }}>${item.price}</span>
                {item.discount && (
                  <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '700' }}>{item.discount}</span>
                )}
              </div>

              {/* الـ Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '15px' }}>
                {item.tags.map((tag, idx) => (
                  <span key={idx} style={{ background: '#f3f4f6', color: '#4b5563', padding: '4px 10px', borderRadius: '6px', fontSize: '11px' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* أزرار التحكم (View, Edit, Quick Edit, Delete) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '15px', borderTop: '1px solid var(--products-border)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="products-secondary-button" style={{ padding: '6px 12px', fontSize: '12px' }}>
                  👁️ View
                </button>
                
                {/* زر التعديل الأساسي اللي بيودي لصفحة الـ Edit بتاعتك */}
                <Link to={`/dashboard/products/${item._id}/edit`} className="products-secondary-button" style={{ padding: '6px 12px', fontSize: '12px', textDecoration: 'none', color: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  ✏️ Edit
                </Link>

                <button className="products-secondary-button" style={{ padding: '6px 12px', fontSize: '12px' }}>
                  ⚡ Quick Edit
                </button>
              </div>

              <button className="products-danger-button" style={{ padding: '6px 12px', fontSize: '12px' }}>
                🗑️ Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}