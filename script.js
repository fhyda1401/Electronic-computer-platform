// ==========================================
// 1. منطق الحاسبة العامة (General Calculator)
// ==========================================
function appendCalc(value) {
    const display = document.getElementById('calcDisplay');
    if (display) display.value += value;
}

function clearCalc() {
    const display = document.getElementById('calcDisplay');
    if (display) display.value = '';
}

function deleteCalc() {
    const display = document.getElementById('calcDisplay');
    if (display) display.value = display.value.slice(0, -1);
}

function calculateResult() {
    const display = document.getElementById('calcDisplay');
    if (!display) return;
    try {
        if (display.value.trim() === '') return;
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'خطأ';
        setTimeout(() => clearCalc(), 1500);
    }
}

// ==========================================
// 2. حاسبة مؤشر كتلة الجسم (BMI Calculator)
// ==========================================
function calculateBMI() {
    const weightInput = document.getElementById('weight') || document.getElementById('bmiWeight');
    const heightInput = document.getElementById('height') || document.getElementById('bmiHeight');
    const resultBox = document.getElementById('bmiResult');

    if (!weightInput || !heightInput || !resultBox) return;

    const weight = parseFloat(weightInput.value);
    const heightCm = parseFloat(heightInput.value);
    const height = heightCm / 100; // تحويل إلى متر

    if (!weight || !height || height <= 0 || weight <= 0) {
        showResult(resultBox, 'يرجى إدخال قيم صحيحة للوزن والطول.', '#ef4444');
        return;
    }

    const bmi = (weight / (height * height)).toFixed(1);
    let message = '';
    let color = '';

    if (bmi < 18.5) {
        message = `مؤشر كتلة الجسم: ${bmi} (نقص في الوزن)`;
        color = '#f59e0b';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        message = `مؤشر كتلة الجسم: ${bmi} (وزن طبيعي/صحي)`;
        color = '#10b981';
    } else if (bmi >= 25 && bmi < 29.9) {
        message = `مؤشر كتلة الجسم: ${bmi} (زيادة في الوزن)`;
        color = '#f59e0b';
    } else {
        message = `مؤشر كتلة الجسم: ${bmi} (سمنة)`;
        color = '#ef4444';
    }

    showResult(resultBox, message, color);
}

// ==========================================
// 3. حاسبة النسبة المئوية (Percentage Calculator)
// ==========================================
function calculatePercentage() {
    const percent = parseFloat(document.getElementById('percentVal').value);
    const total = parseFloat(document.getElementById('totalVal').value);
    const resultBox = document.getElementById('percentResult');

    if (isNaN(percent) || isNaN(total)) {
        showResult(resultBox, 'يرجى إدخال كافة الأرقام المطلوب حسابها.', '#ef4444');
        return;
    }

    const result = (percent / 100) * total;
    showResult(resultBox, `${percent}% من الرقم ${total} تساوي: ${result.toFixed(2)}`, '#10b981');
}

// ==========================================
// 4. حاسبة العمر (Age Calculator)
// ==========================================
function calculateAge() {
    const birthdateInput = document.getElementById('birthdate').value;
    const resultBox = document.getElementById('ageResult');

    if (!birthdateInput) {
        showResult(resultBox, 'يرجى اختيار تاريخ الميلاد.', '#ef4444');
        return;
    }

    const birthdate = new Date(birthdateInput);
    const today = new Date();

    if (birthdate > today) {
        showResult(resultBox, 'تاريخ الميلاد لا يمكن أن يكون في المستقبل!', '#ef4444');
        return;
    }

    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();

    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    showResult(resultBox, `عمرك هو: ${years} سنة، و${months} شهر، و${days} يوم.`, '#10b981');
}

// ==========================================
// 5. البحث في الكروت داخل الصفحة (In-Page Filter)
// ==========================================
function searchCalculators() {
    const searchEl = document.getElementById('searchInput') || document.getElementById('siteSearch');
    if (!searchEl) return;

    const input = searchEl.value.toLowerCase();
    const cards = document.querySelectorAll('.calc-card');

    cards.forEach(card => {
        const titleData = card.getAttribute('data-title');
        if (titleData) {
            if (titleData.toLowerCase().includes(input)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// دالة مساعدة لإظهار النتائج بتنسيق موحد
function showResult(element, text, bgColor) {
    if (!element) return;
    element.style.display = 'block';
    element.style.backgroundColor = bgColor;
    element.style.color = '#ffffff';
    element.innerText = text;
}

// ==========================================
// 6. محرك البحث الشامل واللحظي عن الحاسبات (Global Search)
// ==========================================

// بيانات كافة الحاسبات المتاحة في المنصة
const calculatorsData = [
    // الحاسبات المالية
    { name: "حاسبة القروض والتمويل", category: "المالية", url: "calc-loan.html", keywords: "قرض تمويل بنك اقساط فايدة" },
    { name: "حاسبة الفائدة المركبة", category: "المالية", url: "calc-compound-interest.html", keywords: "استثمار ارباح توفير فايدة" },
    { name: "حاسبة تحويل العملات", category: "المالية", url: "calc-currency.html", keywords: "صرف عملة دولار ريال يورو" },
    { name: "حاسبة ادخار التقاعد", category: "المالية", url: "calc-retirement.html", keywords: "تقاعد راتب ادخار كبر" },
    { name: "حاسبة خصم المبيعات والتخفيضات", category: "المالية", url: "calc-discount.html", keywords: "خصم عروض تخفيض شراء" },

    // الحاسبات الصحية
    { name: "حاسبة مؤشر كتلة الجسم (BMI)", category: "الصحية", url: "calc-bmi.html", keywords: "وزن طول سمنة نحافة صحة" },
    { name: "حاسبة السعرات الحرارية (BMR)", category: "الصحية", url: "calc-calories.html", keywords: "رجيم دايت اكل طاقة غداء" },
    { name: "حاسبة نسبة الدهون في الجسم", category: "الصحية", url: "calc-body-fat.html", keywords: "دهون عضلات جسم لياقة" },
    { name: "حاسبة موعد الولادة والحمل", category: "الصحية", url: "calc-due-date.html", keywords: "حمل طفل ولادة جنين شهر" },
    { name: "حاسبة شرب الماء اليومي", category: "الصحية", url: "calc-water.html", keywords: "ماء سوائل صحة هيدرات" },

    // الرياضيات والتحويلات
    { name: "حاسبة النسب المئوية", category: "الرياضية", url: "calc-percentage.html", keywords: "نسبة مئوية بالمية حساب" },
    { name: "حاسبة العمر وتاريخ الميلاد", category: "الرياضية", url: "calc-age.html", keywords: "عمر ميلاد تاريخ سنوات ايام" },
    { name: "حاسبة تحويل الوحدات القياسية", category: "آلات حاسبة التحويل", url: "calc-unit-converter.html", keywords: "طول وزن متر كيلو باوند جرام" },
    { name: "حاسبة تحويل درجات الحرارة", category: "آلات حاسبة التحويل", url: "calc-temperature.html", keywords: "حرارة سيليزيوس فهرنهايت كلفن" },
    { name: "حاسبة المساحة والأشكال الهندسية", category: "الرياضية", url: "calc-area.html", keywords: "مساحة محيط مربع مستطيل دائرة" },
    { name: "حاسبة الحجم والأشكال ثلاثية الأبعاد", category: "الرياضية", url: "calc-volume.html", keywords: "حجم مكعب كرة اسطوانة" }
];

// تشغيل وظيفة البحث المباشر
function initGlobalSearch() {
    const searchInput = document.getElementById('globalSearchInput');
    const resultsContainer = document.getElementById('globalSearchResults');

    if (!searchInput || !resultsContainer) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        
        if (query.length === 0) {
            resultsContainer.style.display = 'none';
            resultsContainer.innerHTML = '';
            return;
        }

        const filtered = calculatorsData.filter(item => 
            item.name.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query) ||
            item.keywords.toLowerCase().includes(query)
        );

        if (filtered.length > 0) {
            resultsContainer.innerHTML = filtered.map(item => `
                <a href="${item.url}" class="search-result-item" style="display:flex; justify-content:space-between; align-items:center; padding: 10px 15px; text-decoration:none; border-bottom:1px solid #f1f5f9; color:#1e293b;">
                    <span><strong>${item.name}</strong></span>
                    <span style="font-size:0.75rem; background:#e2e8f0; color:#475569; padding:2px 8px; border-radius:12px;">${item.category}</span>
                </a>
            `).join('');
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.innerHTML = `<div style="padding:12px; color:#94a3b8; text-align:center;">لا توجد نتائج مطابقة للبحث</div>`;
            resultsContainer.style.display = 'block';
        }
    });

    // إغلاق قائمة البحث المنسدلة عند النقر خارج صندوق البحث
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.style.display = 'none';
        }
    });
}

// تنفيذ الكود فور تحميل الصفحة
document.addEventListener('DOMContentLoaded', initGlobalSearch);
