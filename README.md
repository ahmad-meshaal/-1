<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>تبادل - تطبيق تبادل المنتجات</title>
    <style>
        /* إعادة الضبط */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
        }

        html, body {
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #ffffff;
            color: #333333;
        }

        /* الهيدر */
        .header {
            background: #ffffff;
            padding: 1.2rem 1rem;
            text-align: center;
            box-shadow: 0 2px 15px rgba(46, 125, 50, 0.08);
            position: sticky;
            top: 0;
            z-index: 1000;
            border-bottom: 2px solid #4caf50;
        }

        .header h1 {
            font-size: 1.6rem;
            color: #2e7d32;
            font-weight: 700;
            margin-bottom: 0.3rem;
        }

        .header p {
            color: #666666;
            font-size: 0.95rem;
            margin-bottom: 0.8rem;
        }

        .counter {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: #4caf50;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            font-size: 0.85rem;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
        }

        /* المحتوى الرئيسي */
        .content {
            padding: 1.5rem 1rem;
            min-height: calc(100vh - 180px);
            background: #f9f9f9;
        }

        /* حالة فارغة */
        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem 1rem;
            text-align: center;
            background: white;
            border-radius: 15px;
            box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
            border: 2px dashed #e0e0e0;
        }

        .empty-icon {
            font-size: 3.5rem;
            color: #4caf50;
            margin-bottom: 1.2rem;
            opacity: 0.7;
        }

        .empty-text {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
            color: #2e7d32;
            font-weight: 600;
        }

        .empty-subtext {
            font-size: 0.95rem;
            color: #777777;
            max-width: 300px;
            line-height: 1.5;
        }

        /* قائمة المنتجات */
        .products-list {
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
            max-width: 600px;
            margin: 0 auto;
        }

        /* بطاقة المنتج */
        .product-card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07);
            border: 1px solid #e8f5e9;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }

        .product-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(76, 175, 80, 0.15);
            border-color: #4caf50;
        }

        /* صورة المنتج */
        .product-image-container {
            width: 100%;
            height: 220px;
            overflow: hidden;
            background: #f1f8e9;
            position: relative;
        }

        .product-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        .product-card:hover .product-image {
            transform: scale(1.05);
        }

        .no-image {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2.8rem;
        }

        /* علامة جديدة */
        .new-badge {
            position: absolute;
            top: 15px;
            left: 15px;
            background: #ff5722;
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(255, 87, 34, 0.3);
        }

        /* محتوى البطاقة */
        .product-info {
            padding: 1.2rem;
        }

        .product-name {
            font-size: 1.15rem;
            font-weight: 700;
            color: #2e7d32;
            margin-bottom: 0.6rem;
            line-height: 1.4;
        }

        .product-description {
            color: #555555;
            font-size: 0.92rem;
            line-height: 1.5;
            margin-bottom: 0.8rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .wanted-item {
            background: #e8f5e9;
            color: #2e7d32;
            padding: 0.5rem 0.8rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 0.8rem;
            border-right: 3px solid #4caf50;
        }

        .product-details {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 0.8rem;
            border-top: 1px solid #f1f8e9;
        }

        .product-contact {
            color: #4caf50;
            font-weight: 700;
            font-size: 0.9rem;
            direction: ltr;
            text-align: left;
            background: #f9fdf9;
            padding: 0.3rem 0.8rem;
            border-radius: 6px;
            border: 1px solid #e8f5e9;
        }

        .product-date {
            color: #888888;
            font-size: 0.82rem;
            display: flex;
            align-items: center;
            gap: 0.3rem;
        }

        /* زر الإضافة العائم */
        .add-button {
            position: fixed;
            bottom: 1.8rem;
            right: 1.8rem;
            width: 60px;
            height: 60px;
            background: #4caf50;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.8rem;
            box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
            border: none;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        }

        .add-button:hover {
            background: #388e3c;
            transform: scale(1.1) rotate(90deg);
            box-shadow: 0 8px 25px rgba(56, 142, 60, 0.5);
        }

        /* نافذة إضافة منتج */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(5px);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            padding: 1rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .modal-overlay.active {
            display: flex;
            opacity: 1;
        }

        .modal {
            background: white;
            border-radius: 20px;
            width: 100%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            animation: modalSlide 0.4s ease;
            border: 2px solid #4caf50;
        }

        @keyframes modalSlide {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .modal-header {
            padding: 1.5rem;
            background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
            color: white;
            text-align: center;
            border-radius: 18px 18px 0 0;
            position: relative;
        }

        .modal-header h2 {
            font-size: 1.4rem;
            font-weight: 700;
        }

        .modal-header p {
            font-size: 0.9rem;
            opacity: 0.9;
            margin-top: 0.3rem;
        }

        .close-button {
            position: absolute;
            top: 1rem;
            left: 1rem;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            font-size: 1.3rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s ease;
        }

        .close-button:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        .modal-body {
            padding: 2rem;
        }

        /* حقل رفع الصورة */
        .upload-section {
            margin-bottom: 1.8rem;
        }

        .upload-label {
            display: block;
            margin-bottom: 0.6rem;
            font-weight: 700;
            color: #2e7d32;
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .upload-box {
            border: 2px dashed #c8e6c9;
            border-radius: 12px;
            padding: 2rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            background: #f9fdf9;
            position: relative;
        }

        .upload-box:hover {
            border-color: #4caf50;
            background: #f1f8e9;
            transform: translateY(-2px);
        }

        .upload-box.dragover {
            border-color: #2e7d32;
            background: #e8f5e9;
        }

        .upload-icon {
            font-size: 2.2rem;
            color: #4caf50;
            margin-bottom: 0.8rem;
        }

        .upload-text {
            color: #666666;
            font-size: 0.95rem;
            margin-bottom: 0.8rem;
        }

        .upload-button {
            background: #4caf50;
            color: white;
            border: none;
            padding: 0.6rem 1.5rem;
            border-radius: 25px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 3px 10px rgba(76, 175, 80, 0.2);
        }

        .upload-button:hover {
            background: #388e3c;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(56, 142, 60, 0.3);
        }

        .file-input {
            display: none;
        }

        .image-preview {
            margin-top: 1.2rem;
            display: none;
            animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .preview-image {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: 10px;
            border: 2px solid #e8f5e9;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        /* حقول النموذج */
        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 700;
            color: #2e7d32;
            font-size: 0.95rem;
        }

        .form-input,
        .form-textarea,
        .form-select {
            width: 100%;
            padding: 0.8rem 1rem;
            border: 1.5px solid #c8e6c9;
            border-radius: 10px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: #f9fdf9;
            color: #333333;
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
            outline: none;
            border-color: #4caf50;
            box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
            background: white;
        }

        .form-textarea {
            min-height: 100px;
            resize: vertical;
            line-height: 1.5;
        }

        .submit-button {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 0.5rem;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        }

        .submit-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(56, 142, 60, 0.4);
        }

        .submit-button:active {
            transform: translateY(0);
        }

        /* نافذة تفاصيل المنتج */
        .detail-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 3000;
            padding: 1rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .detail-overlay.active {
            display: flex;
            opacity: 1;
        }

        .detail-modal {
            background: white;
            border-radius: 20px;
            width: 100%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            animation: detailSlide 0.4s ease;
            border: 2px solid #4caf50;
        }

        @keyframes detailSlide {
            from {
                opacity: 0;
                transform: translateY(100px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .detail-image-container {
            width: 100%;
            height: 280px;
            overflow: hidden;
            background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e9 100%);
            position: relative;
        }

        .detail-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .detail-content {
            padding: 2rem;
        }

        .detail-name {
            font-size: 1.5rem;
            font-weight: 800;
            color: #2e7d32;
            margin-bottom: 1rem;
            line-height: 1.3;
        }

        .detail-description {
            color: #555555;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            font-size: 1rem;
        }

        .detail-section {
            background: #f9fdf9;
            padding: 1.2rem;
            border-radius: 12px;
            margin-bottom: 1.2rem;
            border-right: 4px solid #4caf50;
        }

        .section-title {
            font-size: 0.95rem;
            font-weight: 700;
            color: #2e7d32;
            margin-bottom: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .section-content {
            color: #333333;
            font-size: 1rem;
            line-height: 1.5;
        }

        .contact-info {
            background: #e8f5e9;
            padding: 1.2rem;
            border-radius: 12px;
            margin-top: 1.5rem;
        }

        .detail-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }

        .action-button {
            flex: 1;
            padding: 0.9rem;
            border: none;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .call-button {
            background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        }

        .back-button {
            background: #f5f5f5;
            color: #666666;
            border: 1px solid #e0e0e0;
        }

        .action-button:hover {
            transform: translateY(-2px);
        }

        .call-button:hover {
            box-shadow: 0 6px 20px rgba(56, 142, 60, 0.4);
        }

        .back-button:hover {
            background: #e8e8e8;
        }

        /* الفوتر */
        .footer {
            text-align: center;
            padding: 1.2rem 1rem;
            color: #666666;
            font-size: 0.85rem;
            background: white;
            border-top: 1px solid #e8f5e9;
        }

        .footer p {
            margin-bottom: 0.3rem;
        }

        /* رسائل التنبيه */
        .alert {
            position: fixed;
            top: 1.5rem;
            right: 1.5rem;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            color: white;
            font-weight: 700;
            z-index: 4000;
            animation: alertIn 0.3s ease, alertOut 0.3s ease 2.7s forwards;
            max-width: 300px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 0.8rem;
        }

        .alert.success {
            background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
        }

        .alert.error {
            background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
        }

        .alert.info {
            background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
        }

        @keyframes alertIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes alertOut {
            to {
                opacity: 0;
                visibility: hidden;
            }
        }

        /* تحسينات للجوال */
        @media (max-width: 480px) {
            .header h1 {
                font-size: 1.4rem;
            }
            
            .product-image-container {
                height: 200px;
            }
            
            .detail-image-container {
                height: 240px;
            }
            
            .add-button {
                bottom: 1.2rem;
                right: 1.2rem;
                width: 55px;
                height: 55px;
                font-size: 1.6rem;
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .detail-content {
                padding: 1.5rem;
            }
        }

        /* دعم الشاشات الكبيرة */
        @media (min-width: 768px) {
            .products-list {
                max-width: 700px;
            }
            
            .product-image-container {
                height: 240px;
            }
        }
    </style>
</head>
<body>
    <!-- الهيدر -->
    <header class="header">
        <h1>🔄 تطبيق تبادل</h1>
        <p>بدل ما لا تحتاجه بما تحتاجه</p>
        <div class="counter">
            <span>👥</span>
            <span id="visitorCount">0</span>
        </div>
    </header>

    <!-- المحتوى الرئيسي -->
    <main class="content">
        <div id="productsContainer">
            <!-- المنتجات تظهر هنا -->
        </div>
    </main>

    <!-- زر الإضافة العائم -->
    <button class="add-button" id="addButton">
        +
    </button>

    <!-- الفوتر -->
    <footer class="footer">
        <p>© 2024 تطبيق تبادل المنتجات</p>
        <p>جميع المنتجات مسؤولية مقدمها</p>
    </footer>

    <!-- نافذة إضافة منتج -->
    <div class="modal-overlay" id="addModal">
        <div class="modal">
            <div class="modal-header">
                <button class="close-button" id="closeModal">×</button>
                <h2>➕ إضافة منتج جديد</h2>
                <p>املأ المعلومات لتبادل منتجك</p>
            </div>
            <div class="modal-body">
                <form id="addProductForm">
                    <!-- رفع الصورة -->
                    <div class="upload-section">
                        <label class="upload-label">
                            <span>📸</span>
                            صورة المنتج
                        </label>
                        <div class="upload-box" id="uploadBox">
                            <div class="upload-icon">📁</div>
                            <p class="upload-text">اسحب وأفلت الصورة هنا</p>
                            <p>أو</p>
                            <button type="button" class="upload-button" id="uploadButton">اختر صورة</button>
                            <input type="file" id="imageInput" class="file-input" accept="image/*">
                        </div>
                        <div class="image-preview" id="imagePreview">
                            <img class="preview-image" id="previewImage" alt="معاينة الصورة">
                        </div>
                    </div>

                    <!-- حقول النموذج -->
                    <div class="form-group">
                        <label class="form-label">اسم المنتج</label>
                        <input type="text" class="form-input" id="productName" placeholder="مثال: تلفاز 40 بوصة" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">وصف المنتج</label>
                        <textarea class="form-textarea" id="productDescription" placeholder="صف حالة المنتج ومواصفاته..." required></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">ما تريده بالمقابل</label>
                        <input type="text" class="form-input" id="wantedItem" placeholder="مثال: غسالة ملابس أو مبلغ نقدي" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">رقم التواصل</label>
                        <input type="tel" class="form-input" id="contactNumber" placeholder="05XXXXXXXX" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">فئة المنتج</label>
                        <select class="form-select" id="productCategory">
                            <option value="electronics">إلكترونيات</option>
                            <option value="home">أدوات منزلية</option>
                            <option value="clothing">ملابس وأحذية</option>
                            <option value="furniture">أثاث</option>
                            <option value="books">كتب ومراجع</option>
                            <option value="sports">رياضة وترفيه</option>
                            <option value="other">أخرى</option>
                        </select>
                    </div>

                    <button type="submit" class="submit-button">✅ إضافة المنتج</button>
                </form>
            </div>
        </div>
    </div>

    <!-- نافذة تفاصيل المنتج -->
    <div class="detail-overlay" id="detailModal">
        <div class="detail-modal">
            <div class="detail-image-container" id="detailImageContainer">
                <!-- صورة المنتج تظهر هنا -->
            </div>
            <div class="detail-content">
                <h2 class="detail-name" id="detailName"></h2>
                <p class="detail-description" id="detailDescription"></p>
                
                <div class="detail-section">
                    <div class="section-title">🔄 يريد تبديله بـ</div>
                    <div class="section-content" id="detailWanted"></div>
                </div>

                <div class="contact-info">
                    <div class="section-title">📞 معلومات التواصل</div>
                    <div class="section-content">
                        <strong>رقم الهاتف:</strong> <span id="detailContact" style="color: #2e7d32; font-weight: 700;"></span>
                    </div>
                    <div class="section-content" style="margin-top: 0.8rem;">
                        <strong>الفئة:</strong> <span id="detailCategory" style="color: #4caf50;"></span>
                    </div>
                    <div class="section-content" style="margin-top: 0.8rem;">
                        <strong>تاريخ الإضافة:</strong> <span id="detailDate"></span>
                    </div>
                </div>

                <div class="detail-actions">
                    <button class="action-button call-button" id="callButton">
                        <span>📞</span>
                        الاتصال للتبادل
                    </button>
                    <button class="action-button back-button" id="backButton">
                        <span>←</span>
                        رجوع
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // ==================== التطبيق النهائي ====================
        let products = [];
        let selectedProduct = null;
        let selectedImage = null;

        // ==================== التهيئة ====================
        document.addEventListener('DOMContentLoaded', function() {
            // عداد الزوار
            let visitorCount = localStorage.getItem('tabadul_visitors');
            if (!visitorCount) visitorCount = 0;
            visitorCount++;
            localStorage.setItem('tabadul_visitors', visitorCount);
            document.getElementById('visitorCount').textContent = visitorCount;

            // تحميل المنتجات
            loadProducts();
            
            // إعداد الأحداث
            setupEvents();
        });

        // ==================== تحميل المنتجات ====================
        function loadProducts() {
            const saved = localStorage.getItem('tabadul_products');
            products = saved ? JSON.parse(saved) : [];
            renderProducts();
        }

        // ==================== حفظ المنتجات ====================
        function saveProducts() {
            localStorage.setItem('tabadul_products', JSON.stringify(products));
            return true;
        }

        // ==================== عرض المنتجات ====================
        function renderProducts() {
            const container = document.getElementById('productsContainer');
            
            if (products.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">📦</div>
                        <div class="empty-text">لا توجد منتجات بعد</div>
                        <div class="empty-subtext">اضغط على زر + لإضافة أول منتج لك</div>
                    </div>
                `;
                return;
            }

            const productsHTML = products.map((product, index) => {
                const isNew = isProductNew(product.date);
                
                return `
                    <div class="product-card" onclick="showProductDetail(${product.id})">
                        ${isNew ? '<div class="new-badge">جديد</div>' : ''}
                        <div class="product-image-container">
                            ${product.image ? 
                                `<img src="${product.image}" class="product-image" alt="${product.name}">` :
                                `<div class="no-image">📸</div>`
                            }
                        </div>
                        <div class="product-info">
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-description">${product.description}</p>
                            <div class="wanted-item">يريد: ${product.wantedItem}</div>
                            <div class="product-details">
                                <span class="product-contact">${product.contact}</span>
                                <span class="product-date">📅 ${product.date}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            container.innerHTML = `<div class="products-list">${productsHTML}</div>`;
        }

        // ==================== التحقق من جديد ====================
        function isProductNew(dateStr) {
            const productDate = new Date(dateStr);
            const now = new Date();
            const diffDays = Math.floor((now - productDate) / (1000 * 60 * 60 * 24));
            return diffDays <= 3;
        }

        // ==================== إعداد الأحداث ====================
        function setupEvents() {
            // فتح نافذة الإضافة
            document.getElementById('addButton').addEventListener('click', openAddModal);

            // إغلاق نافذة الإضافة
            document.getElementById('closeModal').addEventListener('click', closeAddModal);
            document.getElementById('addModal').addEventListener('click', function(e) {
                if (e.target === this) closeAddModal();
            });

            // إغلاق نافذة التفاصيل
            document.getElementById('backButton').addEventListener('click', closeDetailModal);
            document.getElementById('detailModal').addEventListener('click', function(e) {
                if (e.target === this) closeDetailModal();
            });

            // زر رفع الصورة
            document.getElementById('uploadButton').addEventListener('click', () => {
                document.getElementById('imageInput').click();
            });

            // اختيار الصورة
            document.getElementById('imageInput').addEventListener('change', handleImageSelect);

            // سحب وإفلات الصور
            const uploadBox = document.getElementById('uploadBox');
            uploadBox.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadBox.classList.add('dragover');
            });

            uploadBox.addEventListener('dragleave', () => {
                uploadBox.classList.remove('dragover');
            });

            uploadBox.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadBox.classList.remove('dragover');
                
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) {
                    processImageFile(file);
                }
            });

            // إرسال النموذج
            document.getElementById('addProductForm').addEventListener('submit', handleFormSubmit);

            // زر الاتصال
            document.getElementById('callButton').addEventListener('click', contactSeller);

            // إغلاق بالضغط على ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeAddModal();
                    closeDetailModal();
                }
            });

            // منع التمرير عند فتح النوافذ
            document.getElementById('addModal').addEventListener('touchmove', (e) => {
                if (document.getElementById('addModal').classList.contains('active')) {
                    e.preventDefault();
                }
            }, { passive: false });
        }

        // ==================== فتح نافذة الإضافة ====================
        function openAddModal() {
            document.getElementById('addModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // ==================== إغلاق نافذة الإضافة ====================
        function closeAddModal() {
            document.getElementById('addModal').classList.remove('active');
            document.body.style.overflow = 'auto';
            resetForm();
        }

        // ==================== معالجة الصور ====================
        function handleImageSelect(e) {
            const file = e.target.files[0];
            if (file) processImageFile(file);
        }

        function processImageFile(file) {
            if (file.size > 5 * 1024 * 1024) {
                showAlert('حجم الصورة كبير جداً (الحد الأقصى 5MB)', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                selectedImage = e.target.result;
                document.getElementById('imagePreview').style.display = 'block';
                document.getElementById('previewImage').src = selectedImage;
            };
            reader.readAsDataURL(file);
        }

        // ==================== إرسال النموذج ====================
        function handleFormSubmit(e) {
            e.preventDefault();

            const name = document.getElementById('productName').value.trim();
            const description = document.getElementById('productDescription').value.trim();
            const wantedItem = document.getElementById('wantedItem').value.trim();
            const contact = document.getElementById('contactNumber').value.trim();
            const category = document.getElementById('productCategory').value;

            // التحقق من البيانات
            if (!name || !description || !wantedItem || !contact) {
                showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }

            if (!/^[0-9]{10,15}$/.test(contact.replace(/\D/g, ''))) {
                showAlert('يرجى إدخال رقم هاتف صحيح (10-15 رقم)', 'error');
                return;
            }

            // إنشاء المنتج
            const newProduct = {
                id: Date.now(),
                name: name,
                description: description,
                wantedItem: wantedItem,
                contact: contact,
                category: category,
                date: getCurrentDate(),
                image: selectedImage || ''
            };

            // إضافة المنتج
            products.unshift(newProduct);
            
            if (saveProducts()) {
                showAlert('✅ تم إضافة المنتج بنجاح', 'success');
                closeAddModal();
                resetForm();
                renderProducts();
            }
        }

        // ==================== عرض تفاصيل المنتج ====================
        function showProductDetail(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            selectedProduct = product;

            // تعبئة البيانات
            document.getElementById('detailName').textContent = product.name;
            document.getElementById('detailDescription').textContent = product.description;
            document.getElementById('detailWanted').textContent = product.wantedItem;
            document.getElementById('detailContact').textContent = product.contact;
            document.getElementById('detailCategory').textContent = getCategoryName(product.category);
            document.getElementById('detailDate').textContent = product.date;

            // عرض الصورة
            const container = document.getElementById('detailImageContainer');
            if (product.image) {
                container.innerHTML = `<img src="${product.image}" class="detail-image" alt="${product.name}">`;
            } else {
                container.innerHTML = '<div class="no-image">📸</div>';
            }

            // إظهار النافذة
            document.getElementById('detailModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // ==================== إغلاق نافذة التفاصيل ====================
        function closeDetailModal() {
            document.getElementById('detailModal').classList.remove('active');
            document.body.style.overflow = 'auto';
            selectedProduct = null;
        }

        // ==================== الاتصال بالبائع ====================
        function contactSeller() {
            if (!selectedProduct) return;

            const message = `أهلاً، أنا مهتم بمنتج "${selectedProduct.name}" الذي عرضته للتبادل. هل لا يزال متاحاً؟`;
            
            if (confirm(`هل تريد نسخ رسالة جاهزة للتواصل؟\n\n"${message}"`)) {
                navigator.clipboard.writeText(message)
                    .then(() => showAlert('📋 تم نسخ الرسالة', 'info'))
                    .catch(() => {
                        const textarea = document.createElement('textarea');
                        textarea.value = message;
                        document.body.appendChild(textarea);
                        textarea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textarea);
                        showAlert('📋 تم نسخ الرسالة', 'info');
                    });
            }
        }

        // ==================== إعادة تعيين النموذج ====================
        function resetForm() {
            document.getElementById('addProductForm').reset();
            document.getElementById('imagePreview').style.display = 'none';
            document.getElementById('imageInput').value = '';
            selectedImage = null;
        }

        // ==================== وظائف مساعدة ====================
        function getCurrentDate() {
            const now = new Date();
            return now.toLocaleDateString('ar-SA');
        }

        function getCategoryName(category) {
            const names = {
                'electronics': 'إلكترونيات',
                'home': 'أدوات منزلية',
                'clothing': 'ملابس وأحذية',
                'furniture': 'أثاث',
                'books': 'كتب ومراجع',
                'sports': 'رياضة وترفيه',
                'other': 'أخرى'
            };
            return names[category] || 'أخرى';
        }

        function showAlert(message, type) {
            const alert = document.createElement('div');
            alert.className = `alert ${type}`;
            alert.innerHTML = `
                <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span>${message}</span>
            `;
            
            document.body.appendChild(alert);
            
            setTimeout(() => {
                if (alert.parentNode) alert.remove();
            }, 3000);
        }
    </script>
</body>
</html>
