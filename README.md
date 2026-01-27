[index.html](https://github.com/user-attachments/files/24893035/index.html)
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تطبيق التبادل - زر إضافة عائم</title>
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
            padding-bottom: 80px; /* مساحة للزر العائم */
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

        /* ========== نافذة الإضافة (المودال) ========== */
        .add-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 2000;
            justify-content: center;
            align-items: center;
            padding: 20px;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .modal-content {
            background-color: white;
            width: 100%;
            max-width: 500px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            animation: slideUp 0.4s ease;
            max-height: 90vh;
            overflow-y: auto;
        }

        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
            background: linear-gradient(135deg, #0066cc 0%, #004d99 100%);
            color: white;
            padding: 1.2rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-title {
            font-size: 1.4rem;
            font-weight: bold;
        }

        .close-modal {
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

        .close-modal:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }

        /* نموذج الإضافة داخل المودال */
        .product-form {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
        }

        .form-label {
            font-weight: 600;
            color: #333;
            font-size: 0.95rem;
        }

        .form-input,
        .form-textarea,
        .form-select {
            padding: 0.8rem;
            border: 1.5px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
            outline: none;
            border-color: #0066cc;
            box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
        }

        .form-textarea {
            min-height: 100px;
            resize: vertical;
        }

        .form-button {
            background-color: #0066cc;
            color: white;
            border: none;
            padding: 0.9rem 1.5rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 0.5rem;
        }

        .form-button:hover {
            background-color: #0052a3;
            transform: translateY(-2px);
        }

        /* الفوتر */
        .app-footer {
            text-align: center;
            padding: 1.5rem 1rem;
            color: #666;
            font-size: 0.9rem;
            margin-top: 2rem;
            border-top: 1px solid #e0e0e0;
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
            
            .product-header {
                flex-direction: column;
                gap: 0.5rem;
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
            
            .modal-content {
                max-width: 95%;
                margin: 10px;
            }
        }

        /* زر العودة للأعلى */
        .scroll-top {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background-color: #0066cc;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            z-index: 999;
            transition: all 0.3s;
            font-size: 1.2rem;
        }

        .scroll-top:hover {
            background-color: #004d99;
            transform: scale(1.1);
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

    <!-- زر العودة للأعلى -->
    <div class="scroll-top" id="scrollTopBtn" style="display: none;">↑</div>

    <!-- نافذة إضافة منتج (مودال) -->
    <div class="add-modal" id="addModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">إضافة منتج جديد للتبادل</h2>
                <button class="close-modal" id="closeModalBtn">×</button>
            </div>
            
            <form class="product-form" id="addProductForm">
                <div class="form-group">
                    <label class="form-label" for="productName">اسم المنتج:</label>
                    <input type="text" class="form-input" id="productName" placeholder="مثال: تلفاز 32 بوصة" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="productDescription">وصف المنتج:</label>
                    <textarea class="form-textarea" id="productDescription" placeholder="صف المنتج الذي تريد تبديله (الحالة، العمر، المواصفات)" required></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="wantedItem">ما تريد الحصول عليه:</label>
                    <input type="text" class="form-input" id="wantedItem" placeholder="مثال: غسالة ملابس أو مبلغ نقدي" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="contactNumber">رقم التواصل:</label>
                    <input type="tel" class="form-input" id="contactNumber" placeholder="مثال: 05XXXXXXXX" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="productCategory">فئة المنتج:</label>
                    <select class="form-select" id="productCategory">
                        <option value="electronics">الإلكترونيات</option>
                        <option value="home">أدوات منزلية</option>
                        <option value="clothing">ملابس وأحذية</option>
                        <option value="furniture">أثاث</option>
                        <option value="books">كتب ومراجع</option>
                        <option value="sports">رياضة وترفيه</option>
                        <option value="vehicles">مركبات وقطع غيار</option>
                        <option value="other">أخرى</option>
                    </select>
                </div>
                
                <button type="submit" class="form-button">
                    <span>إضافة المنتج للتبادل</span>
                    <span>✓</span>
                </button>
            </form>
        </div>
    </div>

    <!-- سكريبت التطبيق -->
    <script>
        // ==================== المتغيرات الأساسية ====================
        let visitorCount = 0;
        let products = [];

        // ==================== تهيئة التطبيق عند التحميل ====================
        document.addEventListener('DOMContentLoaded', function() {
            // تهيئة عداد الزوار
            initializeVisitorCounter();
            
            // تحميل المنتجات من التخزين المحلي
            loadProducts();
            
            // عرض المنتجات
            renderProducts();
            
            // إعداد الأزرار والمودال
            setupFloatingButton();
            setupModal();
            setupProductForm();
            
            // إعداد زر العودة للأعلى
            setupScrollTopButton();
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
                                <span>الاتصال للتبادل</span>
                                <span>📞</span>
                            </button>
                            
                            <button class="action-button delete-button" onclick="deleteProduct(${product.id})">
                                <span>حذف المنتج</span>
                                <span>🗑️</span>
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

        // ==================== إعداد زر الإضافة العائم ====================
        function setupFloatingButton() {
            const floatingBtn = document.getElementById('floatingAddBtn');
            
            floatingBtn.addEventListener('click', function() {
                // إظهار نافذة الإضافة
                document.getElementById('addModal').style.display = 'flex';
                
                // إيقاف التمرير خلف المودال
                document.body.style.overflow = 'hidden';
                
                // إعطاء التركيز على أول حقل إدخال
                setTimeout(() => {
                    document.getElementById('productName').focus();
                }, 300);
            });
        }

        // ==================== إعداد نافذة الإضافة (مودال) ====================
        function setupModal() {
            const modal = document.getElementById('addModal');
            const closeBtn = document.getElementById('closeModalBtn');
            
            // زر الإغلاق
            closeBtn.addEventListener('click', function() {
                closeModal();
            });
            
            // إغلاق بالنقر خارج المودال
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            });
            
            // إغلاق بالضغط على زر ESC
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && modal.style.display === 'flex') {
                    closeModal();
                }
            });
        }

        // ==================== وظيفة إغلاق المودال ====================
        function closeModal() {
            document.getElementById('addModal').style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // إعادة تعيين النموذج
            document.getElementById('addProductForm').reset();
        }

        // ==================== وظيفة إعداد نموذج إضافة المنتج ====================
        function setupProductForm() {
            const form = document.getElementById('addProductForm');
            
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // الحصول على القيم من النموذج
                const productName = document.getElementById('productName').value.trim();
                const productDescription = document.getElementById('productDescription').value.trim();
                const wantedItem = document.getElementById('wantedItem').value.trim();
                const contactNumber = document.getElementById('contactNumber').value.trim();
                const productCategory = document.getElementById('productCategory').value;
                
                // التحقق من صحة البيانات
                if (!productName || !productDescription || !wantedItem || !contactNumber) {
                    showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
                    return;
                }
                
                // التحقق من رقم الهاتف
                const phoneRegex = /^[0-9]{10,15}$/;
                if (!phoneRegex.test(contactNumber.replace(/\D/g, ''))) {
                    showAlert('يرجى إدخال رقم هاتف صحيح (10-15 رقم)', 'error');
                    return;
                }
                
                // إنشاء كائن المنتج الجديد
                const newProduct = {
                    id: Date.now(),
                    name: productName,
                    description: productDescription,
                    wantedItem: wantedItem,
                    contact: contactNumber,
                    category: productCategory,
                    date: getCurrentDate()
                };
                
                // إضافة المنتج للمصفوفة
                products.push(newProduct);
                
                // حفظ المنتجات في التخزين المحلي
                if (saveProducts()) {
                    // إغلاق المودال
                    closeModal();
                    
                    // تحديث عرض المنتجات
                    renderProducts();
                    
                    // إظهار رسالة نجاح
                    showAlert('تم إضافة منتجك بنجاح! سيتمكن الآخرون من رؤيته والاتصال بك للتبادل.', 'success');
                    
                    // التمرير إلى قائمة المنتجات
                    document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // ==================== وظيفة حذف المنتج ====================
        function deleteProduct(productId) {
            if (confirm('هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.')) {
                // البحث عن المنتج وحذفه
                const initialLength = products.length;
                products = products.filter(product => product.id !== productId);
                
                // إذا تم الحذف بنجاح
                if (products.length < initialLength) {
                    // حفظ التغييرات
                    if (saveProducts()) {
                        // تحديث العرض
                        renderProducts();
                        
                        // إظهار رسالة نجاح
                        showAlert('تم حذف المنتج بنجاح', 'success');
                    }
                } else {
                    showAlert('لم يتم العثور على المنتج المطلوب', 'error');
                }
            }
        }

        // ==================== وظيفة الاتصال بالبائع ====================
        function contactSeller(phoneNumber, productName) {
            const message = `أهلاً، أنا مهتم بمنتج "${productName}" الذي عرضته للتبادل. هل لا يزال متاحاً؟`;
            
            if (confirm(`هل تريد نسخ رسالة جاهزة للتواصل مع صاحب المنتج؟\n\nالرسالة:\n"${message}"`)) {
                // نسخ الرسالة إلى الحافظة
                copyToClipboard(message);
                
                showAlert('تم نسخ رسالة جاهزة للحافظة. يمكنك لصقها في أي تطبيق مراسلة.', 'info');
                
                // فتح رابط واتساب مع الرسالة (اختياري)
                setTimeout(() => {
                    const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappLink, '_blank');
                }, 1500);
            } else {
                // عرض رقم الهاتف فقط
                alert(`رقم التواصل للتبادل:\n${phoneNumber}\n\nيمكنك نسخ الرقم للتواصل مباشرة.`);
            }
        }

        // ==================== وظائف مساعدة ====================
        
        // الحصول على التاريخ الحالي بصيغة عربية
        function getCurrentDate() {
            const now = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return now.toLocaleDateString('ar-SA', options);
        }
        
        // إظهار رسالة تنبيه
        function showAlert(message, type = 'info') {
            // إنصراف العنصر إذا كان موجوداً
            const existingAlert = document.querySelector('.alert-message');
            if (existingAlert) {
                existingAlert.remove();
            }
            
            // إنشاء عنصر الرسالة
            const alertElement = document.createElement('div');
            alertElement.className = `alert-message alert-${type}`;
            alertElement.textContent = message;
            
            // إضافة العنصر إلى الصفحة
            document.body.appendChild(alertElement);
            
            // إزالة الرسالة بعد 3 ثوانٍ
            setTimeout(() => {
                if (alertElement.parentNode) {
                    alertElement.remove();
                }
            }, 3000);
        }
        
        // نسخ النص إلى الحافظة
        function copyToClipboard(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
        
        // إعداد زر العودة للأعلى
        function setupScrollTopButton() {
            const scrollButton = document.getElementById('scrollTopBtn');
            
            // إظهار/إخفاء الزر عند التمرير
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    scrollButton.style.display = 'flex';
                } else {
                    scrollButton.style.display = 'none';
                }
            });
            
            // التمرير إلى الأعلى عند النقر
            scrollButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    </script>
</body>
</html>
