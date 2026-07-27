// ==========================================
// 1. منطق الحاسبة العامة (General Calculator)
// ==========================================
function appendCalc(value) {
    const display = document.getElementById('calcDisplay');
    display.value += value;
}

function clearCalc() {
    document.getElementById('calcDisplay').value = '';
}

function deleteCalc() {
    const display = document.getElementById('calcDisplay');
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    const display = document.getElementById('calcDisplay');
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
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // تحويل إلى متر
    const resultBox = document.getElementById('bmiResult');

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
// 5. محرك البحث الفوري في الحاسبات
// ==========================================
function searchCalculators() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.calc-card');

    cards.forEach(card => {
        const titleData = card.getAttribute('data-title').toLowerCase();
        if (titleData.includes(input)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// دالة مساعدة لإظهار النتائج بتنسيق موحد
function showResult(element, text, bgColor) {
    element.style.display = 'block';
    element.style.backgroundColor = bgColor;
    element.style.color = '#ffffff';
    element.innerText = text;
}

