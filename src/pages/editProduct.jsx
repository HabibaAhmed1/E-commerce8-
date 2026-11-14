import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  // الـ State الخاص ببيانات المنتج والـ multipart/form-data والـ deletedImages
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: '',
  });

  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  // جلب بيانات المنتج القديمة للتعديل (لو حابة تربطيه بالـ API)
  useEffect(() => {
    // مثال أو استدعاء الـ API للـ GET حسب شغلك
    console.log("Editing product with ID:", id);
  }, [id]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // تجهيز الـ FormData عشان يدعم PATCH و multipart/form-data والـ deletedImages
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('description', productData.description);
    formData.append('stock', productData.stock);

    // إضافة الصور المحددة أو الـ deletedImages لو موجودة
    deletedImages.forEach((imgId) => {
      formData.append('deletedImages[]', imgId);
    });

    try {
      // مثال على طلب الـ PATCH للـ API بتاعكم
      // const response = await axios.patch(`/products/update/${id}`, formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });
      
      console.log("Product updated successfully!");
      navigate('/dashboard/products'); // العودة لصفحة المنتجات بعد التعديل
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="products-page" style={{ padding: '30px' }}>
      <h1>Edit Product (ID: {id})</h1>
      <p>Modify your product details, update images, and save changes.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', marginTop: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Product Name</label>
          <input 
            type="text" 
            name="name" 
            value={productData.name} 
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Price</label>
          <input 
            type="number" 
            name="price" 
            value={productData.price} 
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Description</label>
          <textarea 
            name="description" 
            value={productData.description} 
            onChange={handleChange}
            rows="4"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <button type="submit" style={{ padding: '12px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
          Save Changes (PATCH)
        </button>
      </form>
    </div>
  );
}