<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تبادل - تخزين سحابي مجاني</title>
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-storage-compat.js"></script>
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #f8fff8 0%, #e8f5e9 100%);
            color: #2c3e50;
            min-height: 100vh;
        }
        
        .header {
            background: white;
            padding: 25px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(46, 125, 50, 0.1);
            border-bottom: 4px solid #4CAF50;
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        
        .header h1 {
            color: #2E7D32;
            margin-bottom: 10px;
            font-size: 2.2rem;
            font-weight: 800;
        }
        
        .header p {
            color: #666;
            font-size: 1.1rem;
            margin-bottom: 20px;
        }
        
        .counter {
            background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
            color: white;
            padding: 10px 25px;
            border-radius: 30px;
            display: inline-block;
            font-size: 1rem;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        }
        
        .container {
            max-width: 1200px;
            margin: 40px auto;
            padding: 0 20px;
            padding-bottom: 120px;
        }
        
        .add-btn {
            position: fixed;
            bottom: 40px;
            right: 40px;
            width: 75px;
            height: 75px;
            background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
            color: white;
            border-radius: 50%;
            border: none;
            font-size: 40px;
            cursor: pointer;
            box-shadow: 0 6px 25px rgba(76, 175, 80, 0.4);
            z-index: 1000;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .add-btn:hover {
            transform: scale(1.15) rotate(180deg);
            box-shadow: 0 10px 30px rgba(76, 175, 80, 0.6);
        }
        
        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        
        .product-card {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            border: 2px solid transparent;
            position: relative;
        }
        
        .product-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            border-color: #4CAF50;
        }
        
        .product-image {
            width: 100%;
            height: 220px;
            background: linear-gradient(135deg, #43a047 0%, #2e7d32 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 70px;
            position: relative;
            overflow: hidden;
        }
        
        .product-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .product-image img:hover {
            transform: scale(1.05);
        }
        
        .product-image::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
            animation: shimmer 2s infinite;
            display: none;
        }
        
        .product-image.no-image::before {
            display: block;
        }
        
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        .product-content {
            padding: 25px;
        }
        
        .product-name {
            font-size: 1.5rem;
            font-weight: 700;
            color: #2E7D32;
            margin-bottom: 15px;
            line-height: 1.3;
            border-right: 4px solid #4CAF50;
            padding-right: 15px;
        }
        
        .product-description {
            color: #555;
            margin-bottom: 20px;
            line-height: 1.6;
            font-size: 1rem;
            min-height: 60px;
        }
        
        .wanted-item {
            background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
            color: #1b5e20;
            padding: 12px 18px;
            border-radius: 12px;
            font-weight: 700;
            margin-bottom: 20px;
            border-right: 5px solid #4CAF50;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 1.05rem;
        }
        
        .product-contact {
            color: #1976d2;
            font-weight: 700;
            direction: ltr;
            text-align: left;
            font-size: 1.2rem;
            margin: 18px 0;
            display: flex;
            align-items: center;
            gap: 12px;
            background: #e3f2fd;
            padding: 12px;
            border-radius: 10px;
        }
        
        .product-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 25px;
            padding-top: 20px;
            border-top: 2px solid #f0f0f0;
        }
        
        .product-date {
            color: #78909c;
            font-size: 0.9rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .product-category {
            background: #f1f8e9;
            color: #2E7D32;
            padding: 8px 18px;
            border-radius: 25px;
            font-size: 0.85rem;
            font-weight: 800;
            letter-spacing: 0.5px;
        }
        
        .delete-btn {
            background: linear-gradient(135deg, #f44336 0%, #c62828 100%);
            color: white;
            border: none;
            padding: 14px 28px;
            border-radius: 12px;
            cursor: pointer;
            margin-top: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            width: 100%;
            font-size: 1rem;
            font-weight: 700;
            transition: all 0.3s;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .delete-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(244, 67, 54, 0.4);
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            z-index: 2000;
            overflow-y: auto;
            animation: modalFadeIn 0.3s ease;
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .modal-content {
            background: white;
            width: 95%;
            max-width: 500px;
            margin: 60px auto;
            border-radius: 25px;
            padding: 35px;
            position: relative;
            animation: modalSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border: 2px solid #4CAF50;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }
        
        @keyframes modalSlideUp {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .form-group {
            margin-bottom: 30px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 12px;
            color: #2E7D32;
            font-weight: 800;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 18px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s;
            background: #fafafa;
            font-family: inherit;
        }
        
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            outline: none;
            border-color: #4CAF50;
            background: white;
            box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.15);
            transform: translateY(-2px);
        }
        
        .form-group textarea {
            height: 140px;
            resize: vertical;
            line-height: 1.6;
        }
        
        .image-preview {
            width: 100%;
            height: 200px;
            border: 2px dashed #4CAF50;
            border-radius: 12px;
            margin-top: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
            background: #f8fff8;
        }
        
        .image-preview img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            display: none;
        }
        
        .image-preview.no-image {
            flex-direction: column;
            gap: 15px;
            color: #666;
            font-weight: 500;
        }
        
        .submit-btn {
            width: 100%;
            padding: 20px;
            background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1.2rem;
            font-weight: 800;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            transition: all 0.3s;
            margin-top: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .submit-btn:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px rgba(76, 175, 80, 0.4);
        }
        
        .submit-btn:active {
            transform: translateY(-1px);
        }
        
        .close-btn {
            position: absolute;
            top: 25px;
            left: 25px;
            background: #f5f5f5;
            border: none;
            font-size: 32px;
            color: #666;
            cursor: pointer;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            z-index: 1;
        }
        
        .close-btn:hover {
            background: #4CAF50;
            color: white;
            transform: rotate(90deg);
        }
        
        .modal-header {
            text-align: center;
            margin-bottom: 35px;
            padding-bottom: 25px;
            border-bottom: 3px solid #f0f0f0;
            position: relative;
        }
        
        .modal-header h2 {
            color: #2E7D32;
            font-size: 2rem;
            font-weight: 800;
        }
        
        .empty-state {
            text-align: center;
            padding: 100px 30px;
            background: white;
            border-radius: 25px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            margin-top: 60px;
        }
        
        .empty-icon {
            font-size: 120px;
            color: #4CAF50;
            margin-bottom: 30px;
            opacity: 0.7;
            animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        .empty-text {
            font-size: 2rem;
            color: #2E7D32;
            margin-bottom: 20px;
            font-weight: 800;
        }
        
        .empty-subtext {
            font-size: 1.2rem;
            color: #666;
            max-width: 500px;
            margin: 0 auto;
            line-height: 1.6;
        }
        
        .loading {
            text-align: center;
            padding: 80px 30px;
            color: #666;
        }
        
        .loading-spinner {
            width: 60px;
            height: 60px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #4CAF50;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 30px;
        }
        
        .sync-status {
            position: fixed;
            bottom: 25px;
            left: 25px;
            background: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 10px 20px;
            border-radius: 12px;
            font-size: 0.9rem;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.1);
        }
        
        .online-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #4CAF50;
            display: inline-block;
            animation: pulse 2s infinite;
            box-shadow: 0 0 10px #4CAF50;
        }
        
        .device-info {
            position: fixed;
            bottom: 25px;
            right: 25px;
            background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
            color: white;
            padding: 10px 20px;
            border-radius: 12px;
            font-size: 0.9rem;
            z-index: 1000;
            cursor: pointer;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.1);
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .device-info:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
        }
        
        .my-product-badge {
            position: absolute;
            top: 15px;
            left: 15px;
            background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
            color: white;
            padding: 6px 15px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 800;
            z-index: 1;
            box-shadow: 0 4px 10px rgba(76, 175, 80, 0.3);
        }
        
        .sync-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
            color: white;
            padding: 6px 15px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 800;
            z-index: 1;
            box-shadow: 0 4px 10px rgba(255, 152, 0, 0.3);
        }
        
        /* Modal صورة المنتج */
        .image-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(15px);
            z-index: 3000;
            overflow: hidden;
            animation: modalFadeIn 0.3s ease;
        }
        
        .image-modal-content {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .image-modal-img {
            max-width: 90%;
            max-height: 70%;
            object-fit: contain;
            border-radius: 15px;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5);
            margin-bottom: 30px;
            animation: imageZoomIn 0.5s ease;
        }
        
        @keyframes imageZoomIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .image-modal-details {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            width: 90%;
            max-width: 600px;
            border: 2px solid rgba(76, 175, 80, 0.3);
            animation: slideUp 0.5s ease 0.2s both;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .image-modal-name {
            color: white;
            font-size: 2rem;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 800;
        }
        
        .image-modal-description {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.2rem;
            line-height: 1.6;
            margin-bottom: 25px;
            text-align: center;
        }
        
        .image-modal-contact {
            color: #4CAF50;
            font-size: 1.3rem;
            font-weight: bold;
            text-align: center;
            direction: ltr;
            margin: 20px 0;
            background: rgba(76, 175, 80, 0.1);
            padding: 15px;
            border-radius: 12px;
            border: 2px solid rgba(76, 175, 80, 0.3);
        }
        
        .image-modal-close {
            position: absolute;
            top: 30px;
            right: 30px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            font-size: 40px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            backdrop-filter: blur(10px);
        }
        
        .image-modal-close:hover {
            background: #4CAF50;
            transform: rotate(90deg);
        }
        
        @media (max-width: 768px) {
            .products-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .container {
                padding: 0 15px;
                margin: 20px auto;
            }
            
            .add-btn {
                bottom: 20px;
                right: 20px;
                width: 65px;
                height: 65px;
                font-size: 35px;
            }
            
            .header h1 {
                font-size: 1.8rem;
            }
            
            .modal-content {
                margin: 30px auto;
                padding: 25px;
            }
            
            .sync-status,
            .device-info {
                display: none;
            }
            
            .image-modal-img {
                max-width: 95%;
                max-height: 50%;
            }
            
            .image-modal-name {
                font-size: 1.5rem;
            }
            
            .image-modal-description {
                font-size: 1rem;
            }
        }
        
        @media (max-width: 480px) {
            .header {
                padding: 20px 15px;
            }
            
            .product-name {
                font-size: 1.3rem;
            }
            
            .product-description {
                font-size: 0.95rem;
            }
            
            .empty-text {
                font-size: 1.5rem;
            }
            
            .image-modal-close {
                top: 15px;
                right: 15px;
                width: 50px;
                height: 50px;
                font-size: 30px;
            }
        }
        
        /* Animation for new products */
        @keyframes newProduct {
            0% {
                opacity: 0;
                transform: translateY(50px) scale(0.8);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .new-product {
            animation: newProduct 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 10px;
        }
        
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
            border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: #2E7D32;
        }
    </style>
</head>
<body>
    <!-- الهيدر -->
    <div class="header">
        <h1>🔄 موقع تبادل</h1>
        <p>بدل مالا تحتاجه بما تحتاجه</p>
        <div class="counter">👥 عدد الزوار: <span id="visitorCount">0</span></div>
    </div>
    
    <!-- المحتوى الرئيسي -->
    <div class="container">
        <div id="productsContainer">
            <div class="loading">
                <div class="loading-spinner"></div>
                <div style="margin-top: 25px; font-size: 1.1rem; color: #4CAF50; font-weight: 600;">
                    جاري تحميل المنتجات من السحابة...
                </div>
            </div>
        </div>
    </div>
    
    <!-- زر الإضافة العائم -->
    <button class="add-btn" id="addBtn">+</button>
    
    <!-- نافذة إضافة منتج -->
    <div class="modal" id="addModal">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close-btn" id="closeModal">×</button>
                <h2>➕ إضافة منتج جديد</h2>
            </div>
            <form id="productForm">
                <div class="form-group">
                    <label><span>📝</span> اسم المنتج</label>
                    <input type="text" id="productName" placeholder="مثال: آيفون 12 مستعمل" required>
                </div>
                
                <div class="form-group">
                    <label><span>📸</span> صورة المنتج (اختياري)</label>
                    <input type="file" id="productImage" accept="image/*" capture="environment">
                    <div class="image-preview no-image" id="imagePreview">
                        <span>📷</span>
                        <span>لم يتم اختيار صورة</span>
                        <img id="previewImage" alt="معاينة الصورة">
                    </div>
                </div>
                
                <div class="form-group">
                    <label><span>📄</span> وصف المنتج</label>
                    <textarea id="productDescription" placeholder="صف حالة المنتج ومواصفاته بالتفصيل..." required></textarea>
                </div>
                
                <div class="form-group">
                    <label><span>🔄</span> يريد تبديله بـ</label>
                    <input type="text" id="wantedItem" placeholder="مثال: لاب توب أو تابلت" required>
                </div>
                
                <div class="form-group">
                    <label><span>📞</span> رقم التواصل</label>
                    <input type="tel" id="contactNumber" placeholder="05xxxxxxxx (10 أرقام)" required pattern="[0-9]{10}">
                </div>
                
                <div class="form-group">
                    <label><span>🏷️</span> فئة المنتج</label>
                    <select id="productCategory">
                        <option value="electronics">📱 إلكترونيات</option>
                        <option value="home">🏠 أدوات منزلية</option>
                        <option value="clothing">👕 ملابس وأحذية</option>
                        <option value="furniture">🛋️ أثاث</option>
                        <option value="books">📚 كتب ومراجع</option>
                        <option value="sports">⚽ رياضة وترفيه</option>
                        <option value="other">📦 أخرى</option>
                    </select>
                </div>
                
                <button type="submit" class="submit-btn">
                    <span>✅</span> إضافة المنتج إلى السحابة
                </button>
            </form>
        </div>
    </div>

    <!-- Modal لعرض صورة المنتج -->
    <div class="image-modal" id="imageModal">
        <button class="image-modal-close" id="closeImageModal">×</button>
        <div class="image-modal-content">
            <img class="image-modal-img" id="modalImage" alt="صورة المنتج">
            <div class="image-modal-details" id="imageModalDetails">
                <!-- سيتم ملؤها بالجافاسكريبت -->
            </div>
        </div>
    </div>

    <!-- حالة الاتصال -->
    <div class="sync-status" id="syncStatus">
        <span class="online-indicator"></span>
        <span id="syncText">🔄 متصل بالسحابة</span>
    </div>

    <!-- معلومات الجهاز -->
    <div class="device-info" id="deviceInfo" title="انقر لعرض معرف جهازك">
        🔧 معرف جهازك
    </div>

    <script>
        // ==================== إعدادات الربط السحابي ====================
        const firebaseConfig = {
            apiKey: "AIzaSyBm3ntKgHxFrBxbBBduwgmTiliTyCQuDIg",
            authDomain: "tbadl-eae89.firebaseapp.com",
            databaseURL: "https://tbadl-eae89-default-rtdb.firebaseio.com",
            projectId: "tbadl-eae89",
            storageBucket: "tbadl-eae89.firebasestorage.app",
            messagingSenderId: "61673089420",
            appId: "1:61673089420:web:dc51befadaa6b94f9f8ea9",
            measurementId: "G-6LVYL8HEF7"
        };

        // تشغيل النظام السحابي
        firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        const storage = firebase.storage();
        
        // ==================== المتغيرات الأساسية ====================
        let products = [];
        let visitorCount = 0;
        let userDeviceId = null;
        let isOnline = true;
        let isInitialized = false;
        let selectedImageFile = null;
        
        // ==================== تهيئة التطبيق ====================
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🔥 Firebase initialized successfully!');
            
            // توليد معرف الجهاز
            generateDeviceId();
            
            // إعداد الأحداث
            setupEvents();
            
            // مراقبة الاتصال
            monitorConnection();
            
            // تحميل البيانات
            initializeApp();
        });
        
        // ==================== توليد معرف الجهاز ====================
        function generateDeviceId() {
            userDeviceId = localStorage.getItem('tabadul_device_id');
            if (!userDeviceId) {
                userDeviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem('tabadul_device_id', userDeviceId);
                console.log('🆔 Generated new device ID:', userDeviceId);
            } else {
                console.log('🆔 Using existing device ID:', userDeviceId);
            }
            
            // إضافة حدث لعرض معرف الجهاز
            document.getElementById('deviceInfo').addEventListener('click', function() {
                const shortId = userDeviceId.substring(0, 8) + '...';
                alert(`🔐 معرف جهازك الفريد:\n\n${userDeviceId}\n\n📱 يمكنك من:\n• حذف منتجاتك فقط\n• التعرف على منتجاتك\n• المزامنة بين الأجهزة`);
            });
        }
        
        // ==================== مراقبة الاتصال ====================
        function monitorConnection() {
            const connectedRef = database.ref(".info/connected");
            connectedRef.on("value", function(snap) {
                isOnline = snap.val() === true;
                updateConnectionStatus();
                
                if (isOnline && !isInitialized) {
                    initializeApp();
                }
            });
        }
        
        function updateConnectionStatus() {
            const statusElement = document.getElementById('syncStatus');
            const textElement = document.getElementById('syncText');
            const icon = statusElement.querySelector('.online-indicator');
            
            if (isOnline) {
                icon.style.background = '#4CAF50';
                icon.style.boxShadow = '0 0 10px #4CAF50';
                textElement.textContent = '✅ متصل بالسحابة';
                textElement.style.color = '#4CAF50';
            } else {
                icon.style.background = '#f44336';
                icon.style.boxShadow = '0 0 10px #f44336';
                textElement.textContent = '❌ غير متصل';
                textElement.style.color = '#f44336';
            }
        }
        
        // ==================== تهيئة التطبيق ====================
        async function initializeApp() {
            if (isInitialized) return;
            
            try {
                console.log('🚀 Initializing application...');
                
                // تحميل عداد الزوار
                await loadVisitorCount();
                
                // تحميل المنتجات
                await loadProducts();
                
                // الاستماع للتحديثات الفورية
                setupRealtimeUpdates();
                
                isInitialized = true;
                console.log('✅ Application initialized successfully!');
                
            } catch (error) {
                console.error('❌ Error initializing app:', error);
                showMessage('⚠️ حدث خطأ في التحميل، جاري إعادة المحاولة...', 'warning');
                setTimeout(initializeApp, 3000);
            }
        }
        
        // ==================== تحميل عداد الزوار ====================
        async function loadVisitorCount() {
            try {
                const snapshot = await database.ref('visitorCount').once('value');
                let count = snapshot.val() || 0;
                
                // زيادة العداد
                count++;
                
                // حفظ في السحابة
                await database.ref('visitorCount').set(count);
                
                // تحديث العرض
                visitorCount = count;
                document.getElementById('visitorCount').textContent = count.toLocaleString('ar-SA');
                
                // حفظ محلياً
                localStorage.setItem('tabadul_visitor_count', count);
                
                console.log('👥 Visitor count:', count);
                
            } catch (error) {
                console.error('❌ Error loading visitor count:', error);
                
                // استخدام القيمة المحلية
                visitorCount = parseInt(localStorage.getItem('tabadul_visitor_count')) || 1;
                document.getElementById('visitorCount').textContent = visitorCount.toLocaleString('ar-SA');
            }
        }
        
        // ==================== تحميل المنتجات ====================
        async function loadProducts() {
            try {
                const snapshot = await database.ref('products').once('value');
                const data = snapshot.val();
                
                if (data) {
                    // تحويل البيانات إلى مصفوفة
                    products = Object.keys(data).map(key => ({
                        id: key,
                        ...data[key]
                    }));
                    
                    // ترتيب المنتجات حسب التاريخ
                    products.sort((a, b) => {
                        const dateA = a.createdAt || a.timestamp || 0;
                        const dateB = b.createdAt || b.timestamp || 0;
                        return dateB - dateA;
                    });
                    
                    console.log(`📦 Loaded ${products.length} products from cloud`);
                    renderProducts();
                    
                } else {
                    // لا توجد بيانات بعد - عرض حالة فارغة
                    console.log('📦 No products found in database');
                    showEmptyState();
                }
                
            } catch (error) {
                console.error('❌ Error loading products:', error);
                showMessage('⚠️ لا يمكن تحميل المنتجات حالياً', 'warning');
                showEmptyState();
            }
        }
        
        // ==================== إعداد التحديثات الفورية ====================
        function setupRealtimeUpdates() {
            // الاستماع للتحديثات على المنتجات
            database.ref('products').on('value', function(snapshot) {
                const data = snapshot.val();
                
                if (data) {
                    const newProducts = Object.keys(data).map(key => ({
                        id: key,
                        ...data[key]
                    }));
                    
                    // ترتيب المنتجات حسب التاريخ
                    newProducts.sort((a, b) => {
                        const dateA = a.createdAt || a.timestamp || 0;
                        const dateB = b.createdAt || b.timestamp || 0;
                        return dateB - dateA;
                    });
                    
                    // تحديث إذا تغير عدد المنتجات أو ترتيبها
                    if (newProducts.length !== products.length || 
                        JSON.stringify(newProducts.map(p => p.id)) !== JSON.stringify(products.map(p => p.id))) {
                        products = newProducts;
                        renderProducts();
                        console.log('🔄 Products updated in real-time');
                    }
                } else {
                    // إذا تم حذف جميع المنتجات
                    products = [];
                    showEmptyState();
                }
            });
        }
        
        // ==================== رفع صورة إلى Firebase Storage ====================
        async function uploadImage(file, productId) {
            if (!file) return null;
            
            try {
                // إنشاء اسم فريد للصورة
                const fileName = `product_${productId}_${Date.now()}_${file.name}`;
                const storageRef = storage.ref(`product_images/${fileName}`);
                
                // رفع الصورة
                const uploadTask = storageRef.put(file);
                
                // انتظار اكتمال الرفع
                await new Promise((resolve, reject) => {
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            // يمكن إضافة شريط تقدم هنا
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(`📤 Upload is ${progress}% done`);
                        },
                        (error) => {
                            reject(error);
                        },
                        async () => {
                            // الحصول على رابط التنزيل
                            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                            resolve(downloadURL);
                        }
                    );
                });
                
                // الحصول على رابط الصورة
                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                console.log('✅ Image uploaded:', downloadURL);
                return downloadURL;
                
            } catch (error) {
                console.error('❌ Error uploading image:', error);
                showMessage('⚠️ حدث خطأ في رفع الصورة، سيتم إضافة المنتج بدون صورة', 'warning');
                return null;
            }
        }
        
        // ==================== إضافة منتج جديد ====================
        async function addProduct(productData, imageFile) {
            try {
                // إنشاء معرف المنتج أولاً
                const newProductRef = database.ref('products').push();
                const productId = newProductRef.key;
                
                let imageUrl = null;
                
                // رفع الصورة إذا وجدت
                if (imageFile) {
                    imageUrl = await uploadImage(imageFile, productId);
                }
                
                const productWithMeta = {
                    ...productData,
                    deviceId: userDeviceId,
                    createdAt: Date.now(),
                    date: formatDate(new Date()),
                    timestamp: Date.now()
                };
                
                // إضافة رابط الصورة إذا تم رفعها
                if (imageUrl) {
                    productWithMeta.imageUrl = imageUrl;
                }
                
                // حفظ المنتج في قاعدة البيانات
                await newProductRef.set(productWithMeta);
                
                // إضافة معرف المنتج
                productWithMeta.id = productId;
                
                console.log('✅ Product added:', productWithMeta.name);
                if (imageUrl) console.log('📸 With image:', imageUrl);
                
                // عرض رسالة نجاح
                showMessage(`🎉 تم إضافة "${productData.name}" بنجاح!`, 'success');
                
                return true;
                
            } catch (error) {
                console.error('❌ Error adding product:', error);
                showMessage('❌ حدث خطأ في إضافة المنتج', 'error');
                return false;
            }
        }
        
        // ==================== حذف منتج ====================
        async function deleteProduct(productId) {
            try {
                // حذف المنتج من قاعدة البيانات
                await database.ref('products/' + productId).remove();
                
                // حذف الصورة من Storage إذا وجدت
                const product = products.find(p => p.id === productId);
                if (product && product.imageUrl) {
                    try {
                        // استخراج اسم الملف من الرابط
                        const imageUrl = product.imageUrl;
                        const fileName = imageUrl.split('/').pop().split('?')[0];
                        const imageRef = storage.ref(`product_images/${fileName}`);
                        await imageRef.delete();
                        console.log('🗑️ Image deleted:', fileName);
                    } catch (imageError) {
                        console.warn('⚠️ Could not delete image:', imageError);
                    }
                }
                
                console.log('🗑️ Product deleted:', productId);
                return true;
            } catch (error) {
                console.error('❌ Error deleting product:', error);
                return false;
            }
        }
        
        // ==================== إعداد الأحداث ====================
        function setupEvents() {
            // زر الإضافة
            document.getElementById('addBtn').addEventListener('click', openAddModal);
            
            // إغلاق النافذة
            document.getElementById('closeModal').addEventListener('click', closeAddModal);
            
            // إغلاق عند النقر خارج النافذة
            document.getElementById('addModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeAddModal();
                }
            });
            
            // معاينة الصورة
            document.getElementById('productImage').addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    selectedImageFile = file;
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const preview = document.getElementById('previewImage');
                        const previewContainer = document.getElementById('imagePreview');
                        
                        preview.src = e.target.result;
                        preview.style.display = 'block';
                        previewContainer.classList.remove('no-image');
                    };
                    reader.readAsDataURL(file);
                } else {
                    selectedImageFile = null;
                    const preview = document.getElementById('previewImage');
                    const previewContainer = document.getElementById('imagePreview');
                    
                    preview.src = '';
                    preview.style.display = 'none';
                    previewContainer.classList.add('no-image');
                }
            });
            
            // إغلاق نافذة الصورة
            document.getElementById('closeImageModal').addEventListener('click', closeImageModal);
            document.getElementById('imageModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeImageModal();
                }
            });
            
            // إرسال النموذج
            document.getElementById('productForm').addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const productName = document.getElementById('productName').value.trim();
                const productDescription = document.getElementById('productDescription').value.trim();
                const wantedItem = document.getElementById('wantedItem').value.trim();
                const contactNumber = document.getElementById('contactNumber').value.trim();
                const productCategory = document.getElementById('productCategory').value;
                
                // التحقق من المدخلات
                if (!productName || !productDescription || !wantedItem || !contactNumber) {
                    showMessage('⚠️ يرجى ملء جميع الحقول المطلوبة', 'warning');
                    return;
                }
                
                // التحقق من رقم الهاتف
                const phoneRegex = /^05\d{8}$/;
                if (!phoneRegex.test(contactNumber)) {
                    showMessage('⚠️ يرجى إدخال رقم هاتف سعودي صحيح (10 أرقام تبدأ بـ 05)', 'warning');
                    return;
                }
                
                const productData = {
                    name: productName,
                    description: productDescription,
                    wantedItem: wantedItem,
                    contact: contactNumber,
                    category: productCategory
                };
                
                // إضافة المنتج
                const success = await addProduct(productData, selectedImageFile);
                
                if (success) {
                    showMessage(`🎉 تم إضافة "${productName}" بنجاح!`, 'success');
                    closeAddModal();
                    resetForm();
                } else {
                    showMessage('❌ حدث خطأ في إضافة المنتج، يرجى المحاولة مرة أخرى', 'error');
                }
            });
        }
        
        // ==================== عرض المنتجات ====================
        function renderProducts() {
            const container = document.getElementById('productsContainer');
            
            if (products.length === 0) {
                showEmptyState();
                return;
            }
            
            let html = '<div class="products-grid">';
            
            products.forEach(product => {
                const isUserProduct = product.deviceId === userDeviceId;
                const categoryText = getCategoryText(product.category);
                const dateText = product.date || formatDate(new Date(product.createdAt || product.timestamp));
                const categoryIcon = getCategoryIcon(product.category);
                
                // تحديد ما إذا كان هناك صورة
                const hasImage = product.imageUrl;
                const imageContent = hasImage ? 
                    `<img src="${product.imageUrl}" alt="${product.name}" onclick="showProductImage('${product.id}')">` : 
                    categoryIcon;
                
                html += `
                    <div class="product-card new-product" onclick="showProductImage('${product.id}')">
                        ${isUserProduct ? 
                            '<div class="my-product-badge">✨ منتجك</div>' : 
                            ''
                        }
                        
                        <div class="product-image ${!hasImage ? 'no-image' : ''}">
                            ${imageContent}
                        </div>
                        
                        <div class="product-content">
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-description">${product.description}</p>
                            
                            <div class="wanted-item">
                                <span>🔄</span> يريد: ${product.wantedItem}
                            </div>
                            
                            <div class="product-contact">
                                <span>📞</span> ${product.contact}
                            </div>
                            
                            <div class="product-meta">
                                <span class="product-category">${categoryText}</span>
                                <span class="product-date">
                                    <span>📅</span> ${dateText}
                                </span>
                            </div>
                            
                            ${isUserProduct ? 
                                `<button class="delete-btn" onclick="deleteUserProduct('${product.id}', event)">
                                    🗑️ حذف منتجي
                                </button>` : 
                                ''
                            }
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            container.innerHTML = html;
        }
        
        // ==================== عرض صورة المنتج بالتفاصيل ====================
        window.showProductImage = function(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            const modalImage = document.getElementById('modalImage');
            const modalDetails = document.getElementById('imageModalDetails');
            
            // تعيين الصورة أو أيقونة بديلة
            if (product.imageUrl) {
                modalImage.src = product.imageUrl;
                modalImage.style.display = 'block';
            } else {
                modalImage.style.display = 'none';
            }
            
            // تعيين التفاصيل
            const categoryText = getCategoryText(product.category);
            const dateText = product.date || formatDate(new Date(product.createdAt));
            
            modalDetails.innerHTML = `
                <h2 class="image-modal-name">${product.name}</h2>
                <p class="image-modal-description">${product.description}</p>
                
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 12px; margin: 15px 0; border-right: 5px solid #4CAF50;">
                    <div style="display: flex; align-items: center; gap: 10px; color: #4CAF50; font-size: 1.2rem; font-weight: bold;">
                        <span>🔄</span>
                        <span>يريد تبديله بـ: ${product.wantedItem}</span>
                    </div>
                </div>
                
                <div class="image-modal-contact">
                    <span>📞</span> ${product.contact}
                </div>
                
                <div style="display: flex; justify-content: space-between; margin-top: 25px; color: rgba(255,255,255,0.8);">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span>🏷️</span>
                        <span>${categoryText}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span>📅</span>
                        <span>${dateText}</span>
                    </div>
                </div>
                
                ${!product.imageUrl ? 
                    `<div style="text-align: center; margin-top: 20px; color: rgba(255,255,255,0.6);">
                        📷 هذا المنتج لا يحتوي على صورة
                    </div>` : 
                    ''
                }
            `;
            
            // فتح النافذة
            document.getElementById('imageModal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        };
        
        function closeImageModal() {
            document.getElementById('imageModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // ==================== دوال التحكم ====================
        function openAddModal() {
            document.getElementById('addModal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        
        function closeAddModal() {
            document.getElementById('addModal').style.display = 'none';
            document.body.style.overflow = 'auto';
            resetForm();
        }
        
        function resetForm() {
            document.getElementById('productForm').reset();
            selectedImageFile = null;
            const preview = document.getElementById('previewImage');
            const previewContainer = document.getElementById('imagePreview');
            
            preview.src = '';
            preview.style.display = 'none';
            previewContainer.classList.add('no-image');
        }
        
        // ==================== دوال مساعدة ====================
        function formatDate(date) {
            if (!date) return 'غير محدد';
            
            const d = new Date(date);
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long'
            };
            return d.toLocaleDateString('ar-SA', options);
        }
        
        function getCategoryText(category) {
            const categories = {
                'electronics': '📱 إلكترونيات',
                'home': '🏠 أدوات منزلية',
                'clothing': '👕 ملابس وأحذية',
                'furniture': '🛋️ أثاث',
                'books': '📚 كتب ومراجع',
                'sports': '⚽ رياضة وترفيه',
                'other': '📦 أخرى'
            };
            return categories[category] || '📦 أخرى';
        }
        
        function getCategoryIcon(category) {
            const icons = {
                'electronics': '📱',
                'home': '🏠',
                'clothing': '👕',
                'furniture': '🛋️',
                'books': '📚',
                'sports': '⚽',
                'other': '📦'
            };
            return icons[category] || '📦';
        }
        
        function showEmptyState() {
            const container = document.getElementById('productsContainer');
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📦</div>
                    <div class="empty-text">لا توجد منتجات بعد</div>
                    <div class="empty-subtext">كن أول من يضيف منتج للتبادل</div>
                    <button style="background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%); color: white; border: none; padding: 18px 40px; border-radius: 15px; font-size: 1.1rem; margin-top: 30px; cursor: pointer; font-weight: 700; box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3); transition: all 0.3s;" 
                            onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(76, 175, 80, 0.4)';" 
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 6px 20px rgba(76, 175, 80, 0.3)';"
                            onclick="openAddModal()">
                        + إضافة أول منتج
                    </button>
                </div>
            `;
        }
        
        function showMessage(message, type) {
            const alertDiv = document.createElement('div');
            alertDiv.textContent = message;
            alertDiv.style.cssText = `
                position: fixed;
                top: 30px;
                right: 30px;
                padding: 18px 30px;
                border-radius: 15px;
                color: white;
                font-weight: bold;
                z-index: 2000;
                animation: slideIn 0.4s ease, fadeOut 0.4s ease 4s forwards;
                background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)' : 
                          type === 'error' ? 'linear-gradient(135deg, #f44336 0%, #c62828 100%)' : 
                          type === 'warning' ? 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)' : 
                          'linear-gradient(135deg, #2196F3 0%, #1976d2 100%)'};
                box-shadow: 0 8px 25px rgba(0,0,0,0.2);
                font-size: 1.1rem;
                max-width: 400px;
                text-align: center;
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255, 255, 255, 0.1);
            `;
            
            document.body.appendChild(alertDiv);
            
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.remove();
                }
            }, 4000);
        }
        
        // ==================== دوال عامة ====================
        window.deleteUserProduct = async function(productId, event) {
            event.stopPropagation();
            
            if (!confirm('⚠️ هل أنت متأكد من حذف هذا المنتج؟\n\nهذا الإجراء لا يمكن التراجع عنه.')) {
                return;
            }
            
            const product = products.find(p => p.id === productId);
            if (!product || product.deviceId !== userDeviceId) {
                showMessage('❌ لا يمكنك حذف هذا المنتج', 'error');
                return;
            }
            
            const success = await deleteProduct(productId);
            if (success) {
                showMessage('✅ تم حذف المنتج بنجاح', 'success');
                // إعادة تحميل البيانات من السحابة
                setTimeout(() => loadProducts(), 1000);
            } else {
                showMessage('❌ حدث خطأ في الحذف', 'error');
            }
        };
        
        // إضافة أنماط للرسوم المتحركة
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(100px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
            }
            
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    </script>
</body>
</html>
