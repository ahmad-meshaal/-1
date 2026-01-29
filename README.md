<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تطبيق التبادل - مع توليد الصور</title>
    <!-- مكتبة html2canvas لتوليد الصور -->
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <style>
        /* تنسيقات أساسية */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, sans-serif;
        }

        body {
            background-color: #f0f2f5;
            color: #1a1a1a;
            line-height: 1.6;
            min-height: 100vh;
        }

        /* الهيدر */
        .app-header {
            background: linear-gradient(135deg, #0066cc 0%, #004d99 100%);
            color: white;
            padding: 1.2rem 1rem;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .app-title {
            font-size: 1.8rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        .app-subtitle {
            font-size: 1rem;
            opacity: 0.9;
            margin-bottom: 0.8rem;
        }

        /* عداد الزوار */
        .visitor-counter {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 0.6rem 1rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            backdrop-filter: blur(5px);
        }

        .counter-number {
            background-color: white;
            color: #0066cc;
            padding: 0.2rem 0.6rem;
            border-radius: 4px;
            font-weight: bold;
        }

        /* المحتوى الرئيسي */
        .main-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 1.5rem 1rem;
            padding-bottom: 80px;
        }

        /* قسم عرض المنتجات */
        .products-section {
            background-color: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .section-title {
            color: #0066cc;
            font-size: 1.4rem;
            margin-bottom: 1.2rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #f0f0f0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        /* حالة القائمة الفارغة */
        .empty-state {
            text-align: center;
            padding: 3rem 1rem;
            color: #666;
        }

        .empty-icon {
            font-size: 3rem;
            color: #ccc;
            margin-bottom: 1rem;
        }

        .empty-message {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
        }

        .empty-hint {
            color: #888;
            font-size: 0.9rem;
        }

        /* قائمة المنتجات */
        .products-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        /* عنصر المنتج */
        .product-card {
            border: 1.5px solid #e8e8e8;
            border-radius: 10px;
            padding: 1.2rem;
            background-color: #fafafa;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .product-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .product-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
        }

        .product-name {
            font-size: 1.3rem;
            font-weight: bold;
            color: #0066cc;
        }

        .product-date {
            font-size: 0.85rem;
            color: #777;
            background-color: #f0f0f0;
            padding: 0.2rem 0.6rem;
            border-radius: 4px;
        }

        .product-details {
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
            margin-bottom: 1rem;
        }

        .detail-row {
            display: flex;
            gap: 0.5rem;
        }

        .detail-label {
            font-weight: 600;
            color: #555;
            min-width: 120px;
        }

        .detail-value {
            color: #333;
            flex: 1;
        }

        .wanted-item {
            color: #e65100;
            font-weight: bold;
            background-color: #fff3e0;
            padding: 0.3rem 0.6rem;
            border-radius: 4px;
            display: inline-block;
        }

        /* أزرار المنتج */
        .product-actions {
            display: flex;
            gap: 0.8rem;
            margin-top: 1rem;
            flex-wrap: wrap;
        }

        .action-button {
            padding: 0.6rem 1rem;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            border: none;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            transition: all 0.2s;
        }

        .contact-button {
            background-color: #4caf50;
            color: white;
        }

        .contact-button:hover {
            background-color: #3d8b40;
        }

        .delete-button {
            background-color: #f44336;
            color: white;
        }

        .delete-button:hover {
            background-color: #d32f2f;
        }

        .category-button {
            background-color: #2196f3;
            color: white;
            font-size: 0.8rem;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
        }

        /* زر توليد الصور */
        .generate-image-button {
            background-color: #9c27b0;
            color: white;
        }

        .generate-image-button:hover {
            background-color: #7b1fa2;
        }

        /* ========== زر الإضافة العائم ========== */
        .floating-add-btn {
            position: fixed;
            bottom: 25px;
            right: 25px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #0066cc 0%, #004d99 100%);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 102, 204, 0.4);
            z-index: 1000;
            transition: all 0.3s ease;
            border: none;
        }

        .floating-add-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 102, 204, 0.6);
        }

        .floating-add-btn:active {
            transform: scale(0.95);
        }

        /* ========== نافذة توليد الصور ========== */
        .image-preview-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 3000;
            justify-content: center;
            align-items: center;
            padding: 20px;
            animation: fadeIn 0.3s ease;
        }

        .image-preview-content {
            background-color: white;
            width: 100%;
            max-width: 500px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.4s ease;
            max-height: 90vh;
            overflow-y: auto;
        }

        .image-preview-header {
            background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%);
            color: white;
            padding: 1.2rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .image-preview-title {
            font-size: 1.4rem;
            font-weight: bold;
        }

        .close-image-modal {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s;
        }

        .close-image-modal:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }

        /* معاينة الصورة */
        .image-preview-container {
            padding: 1.5rem;
            text-align: center;
        }

        .generated-image {
            max-width: 100%;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            margin-bottom: 1.5rem;
            border: 1px solid #eee;
        }

        .image-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .image-action-button {
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            border: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s;
        }

        .download-button {
            background-color: #4caf50;
            color: white;
        }

        .download-button:hover {
            background-color: #3d8b40;
        }

        .share-button {
            background-color: #2196f3;
            color: white;
        }

        .share-button:hover {
            background-color: #0d8bf2;
        }

        /* تنسيق الصورة المتولدة */
        .image-template {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            width: 400px;
            max-width: 100%;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            position: relative;
            overflow: hidden;
        }

        .image-template::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" opacity="0.1"><path d="M0,0 L100,100 M100,0 L0,100" stroke="white" stroke-width="1"/></svg>');
        }

        .image-header {
            text-align: center;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 1;
        }

        .image-app-name {
            font-size: 1.8rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            color: #fff;
        }

        .image-app-tagline {
            font-size: 1rem;
            opacity: 0.9;
        }

        .image-product-info {
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 1;
        }

        .image-product-name {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-align: center;
        }

        .image-detail {
            margin-bottom: 0.8rem;
            display: flex;
        }

        .image-detail-label {
            font-weight: bold;
            min-width: 120px;
        }

        .image-detail-value {
            flex: 1;
        }

        .image-wanted-item {
            background-color: rgba(255, 193, 7, 0.2);
            border-right: 4px solid #ffc107;
            padding: 1rem;
            border-radius: 6px;
            margin-top: 1rem;
            text-align: center;
        }

        .image-footer {
            text-align: center;
            font-size: 0.9rem;
            opacity: 0.8;
            position: relative;
            z-index: 1;
            margin-top: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* رسائل التنبيه */
        .alert-message {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .alert-success {
            background-color: #4caf50;
        }

        .alert-error {
            background-color: #f44336;
        }

        .alert-info {
            background-color: #2196f3;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
                visibility: hidden;
            }
        }

        /* تنسيقات للهواتف */
        @media (max-width: 768px) {
            .app-title {
                font-size: 1.5rem;
            }
            
            .main-container {
                padding: 1rem 0.8rem;
                padding-bottom: 80px;
            }
            
            .products-section {
                padding: 1.2rem;
            }
            
            .product-actions {
                flex-direction: column;
            }
            
            .action-button {
                justify-content: center;
            }
            
            .floating-add-btn {
                bottom: 20px;
                right: 20px;
                width: 55px;
                height: 55px;
                font-size: 1.6rem;
            }
            
            .image-template {
                width: 100%;
                padding: 1.5rem;
            }
            
            .image-actions {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <!-- الهيدر -->
    <header class="app-header">
        <h1 class="app-title">تطبيق تبادل المنتجات</h1>
        <p class="app-subtitle">بدل مالا تحتاجه بالذي تحتاجه</p>
        <div class="visitor-counter">
            <span>عدد الزوار:</span>
            <span class="counter-number" id="visitorCounter">0</span>
        </div>
    </header>

    <!-- المحتوى الرئيسي -->
    <main class="main-container">
        <!-- قسم المنتجات المعروضة -->
        <section class="products-section">
            <h2 class="section-title">المنتجات المعروضة للتبادل</h2>
            <div id="productsContainer">
                <!-- سيتم عرض المنتجات هنا ديناميكيًا -->
                <div class="empty-state" id="emptyState">
                    <div class="empty-icon">📦</div>
                    <p class="empty-message">لا توجد منتجات معروضة للتبادل بعد</p>
                    <p class="empty-hint">اضغط على زر + لإضافة أول منتج لك</p>
                </div>
            </div>
        </section>
    </main>

    <!-- الفوتر -->
    <footer class="app-footer">
        <p>تطبيق تبادل المنتجات - لا تشتري ما يمكنك تبديله</p>
        <p>جميع المنتجات مسؤولية مقدمها - ننصح بالتبادل في الأماكن العامة</p>
    </footer>

    <!-- زر الإضافة العائم -->
    <button class="floating-add-btn" id="floatingAddBtn">
        +
    </button>

    <!-- نافذة معاينة وتحميل الصورة -->
    <div class="image-preview-modal" id="imagePreviewModal">
        <div class="image-preview-content">
            <div class="image-preview-header">
                <h2 class="image-preview-title">صورة المنتج للتبادل</h2>
                <button class="close-image-modal" id="closeImageModalBtn">×</button>
            </div>
            
            <div class="image-preview-container">
                <div id="imageTemplate" class="image-template" style="display: none;">
                    <div class="image-header">
                        <div class="image-app-name">تطبيق تبادل المنتجات</div>
                        <div class="image-app-tagline">بدل مالا تحتاجه بالذي تحتاجه</div>
                    </div>
                    
                    <div class="image-product-info">
                        <div class="image-product-name" id="imgProductName">اسم المنتج</div>
                        
                        <div class="image-detail">
                            <span class="image-detail-label">الوصف:</span>
                            <span class="image-detail-value" id="imgProductDescription">وصف المنتج</span>
                        </div>
                        
                        <div class="image-detail">
                            <span class="image-detail-label">الفئة:</span>
                            <span class="image-detail-value" id="imgProductCategory">فئة المنتج</span>
                        </div>
                        
                        <div class="image-detail">
                            <span class="image-detail-label">التاريخ:</span>
                            <span class="image-detail-value" id="imgProductDate">تاريخ الإضافة</span>
                        </div>
                        
                        <div class="image-wanted-item">
                            <div style="font-weight: bold; margin-bottom: 0.5rem;">يريد تبديله بـ:</div>
                            <div id="imgWantedItem">ما يريده بالمقابل</div>
                        </div>
                    </div>
                    
                    <div class="image-footer">
                        للتواصل: <span id="imgContactNumber">رقم الهاتف</span> | تطبيق تبادل المنتجات
                    </div>
                </div>
                
                <img id="generatedImage" class="generated-image" alt="صورة المنتج للتبادل">
                
                <div class="image-actions">
                    <button class="image-action-button download-button" id="downloadImageBtn">
                        <span>📥</span>
                        <span>تحميل الصورة</span>
                    </button>
                    
                    <button class="image-action-button share-button" id="shareImageBtn">
                        <span>📤</span>
                        <span>مشاركة</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- سكريبت التطبيق -->
    <script>
        // ==================== المتغيرات الأساسية ====================
        let visitorCount = 0;
        let products = [];
        let currentImageData = null;

        // ==================== تهيئة التطبيق عند التحميل ====================
        document.addEventListener('DOMContentLoaded', function() {
            // تهيئة عداد الزوار
            initializeVisitorCounter();
            
            // تحميل المنتجات من التخزين المحلي
            loadProducts();
            
            // عرض المنتجات
            renderProducts();
            
            // إعداد الأزرار
            setupEventListeners();
        });

        // ==================== وظيفة عداد الزوار ====================
        function initializeVisitorCounter() {
            const savedCount = localStorage.getItem('exchangeAppVisitors');
            
            if (savedCount) {
                visitorCount = parseInt(savedCount);
            } else {
                visitorCount = 0;
            }
            
            visitorCount++;
            localStorage.setItem('exchangeAppVisitors', visitorCount.toString());
            document.getElementById('visitorCounter').textContent = visitorCount;
        }

        // ==================== وظيفة تحميل المنتجات ====================
        function loadProducts() {
            const savedProducts = localStorage.getItem('exchangeAppProducts');
            
            if (savedProducts) {
                try {
                    products = JSON.parse(savedProducts);
                } catch (error) {
                    console.error('خطأ في تحميل المنتجات:', error);
                    products = [];
                }
            } else {
                products = [];
            }
        }

        // ==================== وظيفة حفظ المنتجات ====================
        function saveProducts() {
            try {
                localStorage.setItem('exchangeAppProducts', JSON.stringify(products));
                return true;
            } catch (error) {
                console.error('خطأ في حفظ المنتجات:', error);
                showAlert('حدث خطأ في حفظ المنتجات', 'error');
                return false;
            }
        }

        // ==================== وظيفة عرض المنتجات ====================
        function renderProducts() {
            const productsContainer = document.getElementById('productsContainer');
            const emptyState = document.getElementById('emptyState');
            
            // إذا لم يكن هناك منتجات
            if (!products || products.length === 0) {
                if (!emptyState) {
                    productsContainer.innerHTML = `
                        <div class="empty-state" id="emptyState">
                            <div class="empty-icon">📦</div>
                            <p class="empty-message">لا توجد منتجات معروضة للتبادل بعد</p>
                            <p class="empty-hint">اضغط على زر + لإضافة أول منتج لك</p>
                        </div>
                    `;
                } else {
                    emptyState.style.display = 'block';
                }
                return;
            }
            
            // إخفاء حالة القائمة الفارغة
            if (emptyState) {
                emptyState.style.display = 'none';
            }
            
            // فرز المنتجات من الأحدث إلى الأقدم
            const sortedProducts = [...products].sort((a, b) => b.id - a.id);
            
            // إنشاء HTML لعرض المنتجات
            let productsHTML = '<div class="products-list">';
            
            sortedProducts.forEach(product => {
                // تحديد أيقونة الفئة
                let categoryIcon = '📦';
                let categoryName = 'أخرى';
                
                switch(product.category) {
                    case 'electronics': categoryIcon = '📱'; categoryName = 'الإلكترونيات'; break;
                    case 'home': categoryIcon = '🏠'; categoryName = 'أدوات منزلية'; break;
                    case 'clothing': categoryIcon = '👕'; categoryName = 'ملابس وأحذية'; break;
                    case 'furniture': categoryIcon = '🛋️'; categoryName = 'أثاث'; break;
                    case 'books': categoryIcon = '📚'; categoryName = 'كتب ومراجع'; break;
                    case 'sports': categoryIcon = '⚽'; categoryName = 'رياضة وترفيه'; break;
                    case 'vehicles': categoryIcon = '🚗'; categoryName = 'مركبات وقطع غيار'; break;
                    default: categoryIcon = '📦'; categoryName = 'أخرى';
                }
                
                // إنشاء عنصر المنتج
                productsHTML += `
                    <div class="product-card" id="product-${product.id}">
                        <div class="product-header">
                            <div class="product-name">
                                ${categoryIcon} ${product.name}
                            </div>
                            <div class="product-date">${product.date}</div>
                        </div>
                        
                        <div class="product-details">
                            <div class="detail-row">
                                <span class="detail-label">الوصف:</span>
                                <span class="detail-value">${product.description}</span>
                            </div>
                            
                            <div class="detail-row">
                                <span class="detail-label">يريد تبديله بـ:</span>
                                <span class="detail-value wanted-item">${product.wantedItem}</span>
                            </div>
                            
                            <div class="detail-row">
                                <span class="detail-label">رقم التواصل:</span>
                                <span class="detail-value" style="color: #0066cc; font-weight: bold; direction: ltr; text-align: left;">
                                    ${product.contact}
                                </span>
                            </div>
                        </div>
                        
                        <div class="product-actions">
                            <button class="action-button contact-button" onclick="contactSeller('${product.contact}', '${product.name}')">
                                <span>📞</span>
                                <span>الاتصال</span>
                            </button>
                            
                            <button class="action-button generate-image-button" onclick="generateProductImage(${product.id})">
                                <span>🖼️</span>
                                <span>توليد صورة</span>
                            </button>
                            
                            <button class="action-button delete-button" onclick="deleteProduct(${product.id})">
                                <span>🗑️</span>
                                <span>حذف</span>
                            </button>
                            
                            <div class="action-button category-button">
                                ${categoryName}
                            </div>
                        </div>
                    </div>
                `;
            });
            
            productsHTML += '</div>';
            productsContainer.innerHTML = productsHTML;
        }

        // ==================== وظيفة توليد صورة المنتج ====================
        function generateProductImage(productId) {
            const product = products.find(p => p.id === productId);
            
            if (!product) {
                showAlert('لم يتم العثور على المنتج', 'error');
                return;
            }
            
            // تحديد اسم الفئة
            let categoryName = 'أخرى';
            switch(product.category) {
                case 'electronics': categoryName = 'الإلكترونيات'; break;
                case 'home': categoryName = 'أدوات منزلية'; break;
                case 'clothing': categoryName = 'ملابس وأحذية'; break;
                case 'furniture': categoryName = 'أثاث'; break;
                case 'books': categoryName = 'كتب ومراجع'; break;
                case 'sports': categoryName = 'رياضة وترفيه'; break;
                case 'vehicles': categoryName = 'مركبات وقطع غيار'; break;
                default: categoryName = 'أخرى';
            }
            
            // تحديث بيانات القالب
            document.getElementById('imgProductName').textContent = product.name;
            document.getElementById('imgProductDescription').textContent = product.description;
            document.getElementById('imgProductCategory').textContent = categoryName;
            document.getElementById('imgProductDate').textContent = product.date;
            document.getElementById('imgWantedItem').textContent = product.wantedItem;
            document.getElementById('imgContactNumber').textContent = product.contact;
            
            // إظهار القالب
            document.getElementById('imageTemplate').style.display = 'block';
            
            // توليد الصورة باستخدام html2canvas
            html2canvas(document.getElementById('imageTemplate'), {
                backgroundColor: null,
                scale: 2, // لزيادة جودة الصورة
                useCORS: true,
                logging: false
            }).then(canvas => {
                // إخفاء القالب
                document.getElementById('imageTemplate').style.display = 'none';
                
                // تحويل Canvas إلى صورة
                const imageData = canvas.toDataURL('image/png');
                document.getElementById('generatedImage').src = imageData;
                
                // حفظ بيانات الصورة
                currentImageData = imageData;
                
                // إظهار نافذة المعاينة
                document.getElementById('imagePreviewModal').style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }).catch(error => {
                console.error('خطأ في توليد الصورة:', error);
                showAlert('حدث خطأ في توليد الصورة', 'error');
            });
        }

        // ==================== وظيفة تحميل الصورة ====================
        function downloadImage() {
            if (!currentImageData) {
                showAlert('لا توجد صورة للتحميل', 'error');
                return;
            }
            
            const link = document.createElement('a');
            link.href = currentImageData;
            link.download = `تبادل_${Date.now()}.png`;
            link.click();
            
            showAlert('تم تحميل الصورة بنجاح', 'success');
        }

        // ==================== وظيفة مشاركة الصورة ====================
        function shareImage() {
            if (!currentImageData) {
                showAlert('لا توجد صورة للمشاركة', 'error');
                return;
            }
            
            // تحويل dataURL إلى blob
            fetch(currentImageData)
                .then(res => res.blob())
                .then(blob => {
                    if (navigator.share) {
                        // استخدم Web Share API إذا متاح
                        const file = new File([blob], 'تبادل_منتج.png', { type: 'image/png' });
                        
                        navigator.share({
                            files: [file],
                            title: 'منتج للتبادل',
                            text: 'اطلع على هذا المنتج المتاح للتبادل!'
                        })
                        .then(() => showAlert('تم المشاركة بنجاح', 'success'))
                        .catch(error => {
                            console.error('خطأ في المشاركة:', error);
                            showAlert('حدث خطأ في المشاركة', 'error');
                        });
                    } else {
                        // البديل: نسخ الرابط
                        navigator.clipboard.writeText('اطلع على هذا المنتج للتبادل!')
                            .then(() => showAlert('تم نسخ رسالة المشاركة للحافظة', 'info'));
                    }
                })
                .catch(error => {
                    console.error('خطأ في تحويل الصورة:', error);
                    showAlert('حدث خطأ في تحضير الصورة للمشاركة', 'error');
                });
        }

        // ==================== وظائف أخرى ====================
        function deleteProduct(productId) {
            if (confirm('هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.')) {
                products = products.filter(product => product.id !== productId);
                
                if (saveProducts()) {
                    renderProducts();
                    showAlert('تم حذف المنتج بنجاح', 'success');
                }
            }
        }

        function contactSeller(phoneNumber, productName) {
            const message = `أهلاً، أنا مهتم بمنتج "${productName}" الذي عرضته للتبادل. هل لا يزال متاحاً؟`;
            
            if (confirm(`هل تريد نسخ رسالة جاهزة للتواصل؟\n\n"${message}"`)) {
                navigator.clipboard.writeText(message)
                    .then(() => showAlert('تم نسخ الرسالة للحافظة', 'info'));
            }
        }

        function showAlert(message, type = 'info') {
            const existingAlert = document.querySelector('.alert-message');
            if (existingAlert) existingAlert.remove();
            
            const alertElement = document.createElement('div');
            alertElement.className = `alert-message alert-${type}`;
            alertElement.textContent = message;
            document.body.appendChild(alertElement);
            
            setTimeout(() => {
                if (alertElement.parentNode) alertElement.remove();
            }, 3000);
        }

        // ==================== إعداد الأحداث ====================
        function setupEventListeners() {
            // زر الإضافة العائم
            document.getElementById('floatingAddBtn').addEventListener('click', function() {
                alert('زر إضافة منتج جديد - يمكنك إضافة نموذج الإضافة هنا');
            });
            
            // إغلاق نافذة الصورة
            document.getElementById('closeImageModalBtn').addEventListener('click', function() {
                document.getElementById('imagePreviewModal').style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // إغلاق نافذة الصورة بالنقر خارجها
            document.getElementById('imagePreviewModal').addEventListener('click', function(event) {
                if (event.target === this) {
                    this.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            // زر تحميل الصورة
            document.getElementById('downloadImageBtn').addEventListener('click', downloadImage);
            
            // زر مشاركة الصورة
            document.getElementById('shareImageBtn').addEventListener('click', shareImage);
            
            // إغلاق بالضغط على ESC
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    const imageModal = document.getElementById('imagePreviewModal');
                    if (imageModal.style.display === 'flex') {
                        imageModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                }
            });
        }
    </script>
</body>
</html>
