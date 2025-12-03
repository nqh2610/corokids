const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * HỆ THỐNG BÀI HỌC SOROBAN - PHẦN 2 (Level 6-10)
 */

const lessons = [
  // ========== LEVEL 6: BẠN LỚN (TRỪ) - 3 bài (thêm 2 bài) ==========
  { levelId: 6, lessonId: 1, title: '➖ Trừ dùng Bạn lớn', order: 1,
    description: 'Trừ bằng cách mượn từ hàng chục',
    content: JSON.stringify({
      theory: [
        '🎯 Khi không đủ hạt để trừ, mượn từ hàng chục!',
        '➖ -9 = Bớt 1 chục, thêm bạn lớn của 9 (-10+1)',
        '➖ -8 = Bớt 1 chục, thêm bạn lớn của 8 (-10+2)',
        '➖ -7 = Bớt 1 chục, thêm bạn lớn của 7 (-10+3)',
        '💡 Công thức: -số = -10 + bạn lớn của số đó'
      ],
      practice: [
        { type: 'calc', problem: '10-1', answer: 9 },
        { type: 'calc', problem: '10-2', answer: 8 },
        { type: 'calc', problem: '10-3', answer: 7 },
        { type: 'calc', problem: '10-4', answer: 6 },
        { type: 'calc', problem: '10-5', answer: 5 },
        { type: 'calc', problem: '10-9', answer: 1 },
        { type: 'calc', problem: '11-8', answer: 3 },
        { type: 'calc', problem: '12-7', answer: 5 },
        { type: 'calc', problem: '13-6', answer: 7 },
        { type: 'calc', problem: '15-9', answer: 6 },
        { type: 'calc', problem: '14-8', answer: 6 },
        { type: 'calc', problem: '16-7', answer: 9 }
      ]
    }), difficulty: 3, duration: 12, stars: 15 },

  { levelId: 6, lessonId: 2, title: '➖ Trừ qua chục (nâng cao)', order: 2,
    description: 'Luyện trừ khi phải mượn từ chục',
    content: JSON.stringify({
      theory: [
        '🎯 Trừ qua chục - các trường hợp đặc biệt:',
        '📌 11-9 = 11 - 10 + 1 = 2 (mượn chục, thêm 1)',
        '📌 12-8 = 12 - 10 + 2 = 4 (mượn chục, thêm 2)',
        '📌 13-7 = 13 - 10 + 3 = 6 (mượn chục, thêm 3)',
        '💡 Nhớ: -số = -10 + (10 - số)'
      ],
      practice: [
        { type: 'calc', problem: '11-9', answer: 2 },
        { type: 'calc', problem: '11-8', answer: 3 },
        { type: 'calc', problem: '12-9', answer: 3 },
        { type: 'calc', problem: '12-8', answer: 4 },
        { type: 'calc', problem: '13-9', answer: 4 },
        { type: 'calc', problem: '13-8', answer: 5 },
        { type: 'calc', problem: '14-9', answer: 5 },
        { type: 'calc', problem: '14-7', answer: 7 },
        { type: 'calc', problem: '15-8', answer: 7 },
        { type: 'calc', problem: '15-6', answer: 9 },
        { type: 'calc', problem: '16-9', answer: 7 },
        { type: 'calc', problem: '17-8', answer: 9 }
      ]
    }), difficulty: 3, duration: 12, stars: 15 },

  { levelId: 6, lessonId: 3, title: '🏋️ Luyện tập Bạn lớn trừ', order: 3,
    description: 'Thành thạo trừ với Bạn lớn',
    content: JSON.stringify({
      theory: [
        '⚡ Bí quyết nhanh:',
        '📌 Thấy -9 → Mượn chục, thêm 1',
        '📌 Thấy -8 → Mượn chục, thêm 2',
        '📌 Thấy -7 → Mượn chục, thêm 3',
        '📌 Thấy -6 → Mượn chục, thêm 4',
        '🎯 Luyện cho đến khi phản xạ tự động!'
      ],
      practice: [
        { type: 'calc', problem: '10-9', answer: 1 },
        { type: 'calc', problem: '10-8', answer: 2 },
        { type: 'calc', problem: '10-7', answer: 3 },
        { type: 'calc', problem: '10-6', answer: 4 },
        { type: 'calc', problem: '11-9', answer: 2 },
        { type: 'calc', problem: '12-9', answer: 3 },
        { type: 'calc', problem: '13-9', answer: 4 },
        { type: 'calc', problem: '14-9', answer: 5 },
        { type: 'calc', problem: '15-9', answer: 6 },
        { type: 'calc', problem: '11-8', answer: 3 },
        { type: 'calc', problem: '12-7', answer: 5 },
        { type: 'calc', problem: '13-6', answer: 7 },
        { type: 'calc', problem: '14-5', answer: 9 },
        { type: 'calc', problem: '18-9', answer: 9 }
      ]
    }), difficulty: 3, duration: 12, stars: 15 },

  // ========== LEVEL 7: KẾT HỢP BẠN NHỎ + BẠN LỚN (3 bài - thêm 1 bài) ==========
  { levelId: 7, lessonId: 1, title: '🎯 Cộng kết hợp', order: 1,
    description: 'Kết hợp cả Bạn nhỏ và Bạn lớn khi cộng',
    content: JSON.stringify({
      theory: [
        '🎯 Một số phép tính cần dùng CẢ HAI công thức!',
        '💡 Ví dụ: 6+7 cần dùng Bạn lớn và Bạn nhỏ',
        '📝 Bước 1: 6+7 = 6 + (10-3) = 16-3',
        '📝 Bước 2: Trừ 3 dùng Bạn nhỏ: -3 = -5+2',
        '✅ Kết quả: 6+7 = 13'
      ],
      practice: [
        { type: 'calc', problem: '6+6', answer: 12 },
        { type: 'calc', problem: '6+7', answer: 13 },
        { type: 'calc', problem: '7+6', answer: 13 },
        { type: 'calc', problem: '7+7', answer: 14 },
        { type: 'calc', problem: '8+6', answer: 14 },
        { type: 'calc', problem: '6+8', answer: 14 },
        { type: 'calc', problem: '9+6', answer: 15 },
        { type: 'calc', problem: '8+7', answer: 15 },
        { type: 'calc', problem: '9+7', answer: 16 },
        { type: 'calc', problem: '8+8', answer: 16 },
        { type: 'calc', problem: '9+8', answer: 17 },
        { type: 'calc', problem: '9+9', answer: 18 }
      ]
    }), difficulty: 4, duration: 15, stars: 20 },

  { levelId: 7, lessonId: 2, title: '🎯 Trừ kết hợp', order: 2,
    description: 'Kết hợp mượn và dùng Bạn nhỏ khi trừ',
    content: JSON.stringify({
      theory: [
        '🎯 Trừ số lớn cũng cần kết hợp công thức!',
        '💡 Ví dụ: 11-6 cần mượn 10 và dùng Bạn nhỏ',
        '📝 Bước 1: 11-6 = 11 - (10-4) = 1+4',
        '📝 Bước 2: Cộng 4 dùng Bạn nhỏ: +4 = +5-1',
        '✅ Kết quả: 11-6 = 5'
      ],
      practice: [
        { type: 'calc', problem: '11-6', answer: 5 },
        { type: 'calc', problem: '11-7', answer: 4 },
        { type: 'calc', problem: '12-6', answer: 6 },
        { type: 'calc', problem: '12-7', answer: 5 },
        { type: 'calc', problem: '13-8', answer: 5 },
        { type: 'calc', problem: '14-8', answer: 6 },
        { type: 'calc', problem: '14-9', answer: 5 },
        { type: 'calc', problem: '15-7', answer: 8 },
        { type: 'calc', problem: '15-8', answer: 7 },
        { type: 'calc', problem: '16-9', answer: 7 },
        { type: 'calc', problem: '17-8', answer: 9 },
        { type: 'calc', problem: '18-9', answer: 9 }
      ]
    }), difficulty: 4, duration: 15, stars: 20 },

  { levelId: 7, lessonId: 3, title: '🏋️ Tổng hợp cộng trừ', order: 3,
    description: 'Luyện tập kết hợp tất cả công thức',
    content: JSON.stringify({
      theory: [
        '⚡ Tổng hợp 4 công thức:',
        '1️⃣ Cộng/trừ trực tiếp (đủ hạt)',
        '2️⃣ Bạn nhỏ (+5/-5)',
        '3️⃣ Bạn lớn (+10/-10)',
        '4️⃣ Kết hợp Bạn nhỏ + Bạn lớn',
        '🎯 Hãy chọn công thức phù hợp nhất!'
      ],
      practice: [
        { type: 'calc', problem: '2+3', answer: 5 },
        { type: 'calc', problem: '4+4', answer: 8 },
        { type: 'calc', problem: '5+6', answer: 11 },
        { type: 'calc', problem: '7+8', answer: 15 },
        { type: 'calc', problem: '9+9', answer: 18 },
        { type: 'calc', problem: '8-3', answer: 5 },
        { type: 'calc', problem: '12-5', answer: 7 },
        { type: 'calc', problem: '15-8', answer: 7 },
        { type: 'calc', problem: '6+7', answer: 13 },
        { type: 'calc', problem: '14-6', answer: 8 },
        { type: 'calc', problem: '8+9', answer: 17 },
        { type: 'calc', problem: '16-7', answer: 9 },
        { type: 'calc', problem: '9+8', answer: 17 },
        { type: 'calc', problem: '13-9', answer: 4 }
      ]
    }), difficulty: 4, duration: 15, stars: 20 },

  // ========== LEVEL 8: CỘNG TRỪ 2 CHỮ SỐ (3 bài - giữ nguyên) ==========
  { levelId: 8, lessonId: 1, title: '📝 Cộng 2 số (không nhớ)', order: 1,
    description: 'Cộng hai số khi không cần nhớ sang hàng',
    content: JSON.stringify({
      theory: [
        '📏 Luôn tính từ PHẢI sang TRÁI (đơn vị trước)',
        '🔢 Ví dụ: 23+15',
        '📝 Bước 1: Cột đơn vị: 3+5 = 8',
        '📝 Bước 2: Cột chục: 2+1 = 3',
        '✅ Kết quả: 23+15 = 38'
      ],
      practice: [
        { type: 'calc', problem: '12+13', answer: 25 },
        { type: 'calc', problem: '23+15', answer: 38 },
        { type: 'calc', problem: '31+24', answer: 55 },
        { type: 'calc', problem: '42+36', answer: 78 },
        { type: 'calc', problem: '51+24', answer: 75 },
        { type: 'calc', problem: '14+32', answer: 46 },
        { type: 'calc', problem: '25+43', answer: 68 },
        { type: 'calc', problem: '61+27', answer: 88 },
        { type: 'calc', problem: '33+44', answer: 77 },
        { type: 'calc', problem: '52+36', answer: 88 },
        { type: 'calc', problem: '21+45', answer: 66 },
        { type: 'calc', problem: '34+52', answer: 86 }
      ]
    }), difficulty: 3, duration: 12, stars: 15 },

  { levelId: 8, lessonId: 2, title: '📝 Cộng 2 số (có nhớ)', order: 2,
    description: 'Cộng hai số khi cần nhớ sang hàng chục',
    content: JSON.stringify({
      theory: [
        '📏 Khi cột đơn vị ≥ 10, phải nhớ sang chục!',
        '🔢 Ví dụ: 28+35',
        '📝 Bước 1: Cột đơn vị: 8+5 = 13 (viết 3, nhớ 1)',
        '📝 Bước 2: Cột chục: 2+3+1 = 6',
        '✅ Kết quả: 28+35 = 63'
      ],
      practice: [
        { type: 'calc', problem: '18+15', answer: 33 },
        { type: 'calc', problem: '28+35', answer: 63 },
        { type: 'calc', problem: '37+28', answer: 65 },
        { type: 'calc', problem: '47+38', answer: 85 },
        { type: 'calc', problem: '56+29', answer: 85 },
        { type: 'calc', problem: '65+28', answer: 93 },
        { type: 'calc', problem: '49+36', answer: 85 },
        { type: 'calc', problem: '58+27', answer: 85 },
        { type: 'calc', problem: '39+45', answer: 84 },
        { type: 'calc', problem: '67+28', answer: 95 },
        { type: 'calc', problem: '78+17', answer: 95 },
        { type: 'calc', problem: '59+38', answer: 97 }
      ]
    }), difficulty: 4, duration: 15, stars: 20 },

  { levelId: 8, lessonId: 3, title: '📝 Trừ 2 chữ số', order: 3,
    description: 'Trừ hai số có 2 chữ số',
    content: JSON.stringify({
      theory: [
        '📏 Trừ cũng từ PHẢI sang TRÁI',
        '🔢 Ví dụ: 56-23 (không mượn)',
        '📝 Cột đơn vị: 6-3 = 3, Cột chục: 5-2 = 3 → 33',
        '🔢 Ví dụ: 72-48 (có mượn)',
        '📝 Cột đơn vị: 2<8, mượn 1 chục → 12-8 = 4',
        '📝 Cột chục: 7-1-4 = 2 → Kết quả: 24'
      ],
      practice: [
        { type: 'calc', problem: '35-12', answer: 23 },
        { type: 'calc', problem: '56-23', answer: 33 },
        { type: 'calc', problem: '48-15', answer: 33 },
        { type: 'calc', problem: '67-34', answer: 33 },
        { type: 'calc', problem: '72-48', answer: 24 },
        { type: 'calc', problem: '83-57', answer: 26 },
        { type: 'calc', problem: '91-45', answer: 46 },
        { type: 'calc', problem: '64-38', answer: 26 },
        { type: 'calc', problem: '75-49', answer: 26 },
        { type: 'calc', problem: '82-56', answer: 26 },
        { type: 'calc', problem: '93-67', answer: 26 },
        { type: 'calc', problem: '70-35', answer: 35 }
      ]
    }), difficulty: 4, duration: 15, stars: 20 },

  // ========== LEVEL 9: CỘNG TRỪ 3 CHỮ SỐ (3 bài - giữ nguyên) ==========
  { levelId: 9, lessonId: 1, title: '💯 Số 100-999', order: 1,
    description: 'Biểu diễn số 3 chữ số trên Soroban',
    content: JSON.stringify({
      theory: [
        '📍 Cột 1 (phải): Hàng đơn vị (1-9)',
        '📍 Cột 2: Hàng chục (10-90)',
        '📍 Cột 3: Hàng trăm (100-900)',
        '🔢 Ví dụ: 456 = 4 trăm + 5 chục + 6 đơn vị',
        '💡 Đọc và gạt từ TRÁI sang PHẢI!'
      ],
      practice: [
        { type: 'create', target: 100 },
        { type: 'create', target: 123 },
        { type: 'create', target: 256 },
        { type: 'create', target: 389 },
        { type: 'create', target: 456 },
        { type: 'create', target: 527 },
        { type: 'create', target: 648 },
        { type: 'create', target: 789 },
        { type: 'create', target: 835 },
        { type: 'create', target: 999 },
        { type: 'create', target: 501 },
        { type: 'create', target: 750 }
      ]
    }), difficulty: 3, duration: 12, stars: 15 },

  { levelId: 9, lessonId: 2, title: '➕ Cộng 3 chữ số', order: 2,
    description: 'Cộng hai số có 3 chữ số',
    content: JSON.stringify({
      theory: [
        '📏 Vẫn tính từ PHẢI sang TRÁI',
        '🔢 Ví dụ: 234+156',
        '📝 Đơn vị: 4+6 = 10 (viết 0, nhớ 1)',
        '📝 Chục: 3+5+1 = 9',
        '📝 Trăm: 2+1 = 3',
        '✅ Kết quả: 234+156 = 390'
      ],
      practice: [
        { type: 'calc', problem: '123+234', answer: 357 },
        { type: 'calc', problem: '234+156', answer: 390 },
        { type: 'calc', problem: '345+234', answer: 579 },
        { type: 'calc', problem: '456+321', answer: 777 },
        { type: 'calc', problem: '456+389', answer: 845 },
        { type: 'calc', problem: '567+278', answer: 845 },
        { type: 'calc', problem: '234+567', answer: 801 },
        { type: 'calc', problem: '378+456', answer: 834 },
        { type: 'calc', problem: '489+367', answer: 856 },
        { type: 'calc', problem: '523+368', answer: 891 },
        { type: 'calc', problem: '199+201', answer: 400 },
        { type: 'calc', problem: '555+333', answer: 888 }
      ]
    }), difficulty: 4, duration: 18, stars: 20 },

  { levelId: 9, lessonId: 3, title: '➖ Trừ 3 chữ số', order: 3,
    description: 'Trừ hai số có 3 chữ số',
    content: JSON.stringify({
      theory: [
        '📏 Trừ cũng từ PHẢI sang TRÁI',
        '🔢 Ví dụ: 543-217',
        '📝 Đơn vị: 3-7 → mượn: 13-7 = 6',
        '📝 Chục: 4-1-1 = 2',
        '📝 Trăm: 5-2 = 3',
        '✅ Kết quả: 543-217 = 326'
      ],
      practice: [
        { type: 'calc', problem: '456-123', answer: 333 },
        { type: 'calc', problem: '543-217', answer: 326 },
        { type: 'calc', problem: '678-345', answer: 333 },
        { type: 'calc', problem: '789-456', answer: 333 },
        { type: 'calc', problem: '800-456', answer: 344 },
        { type: 'calc', problem: '725-389', answer: 336 },
        { type: 'calc', problem: '912-567', answer: 345 },
        { type: 'calc', problem: '654-278', answer: 376 },
        { type: 'calc', problem: '876-489', answer: 387 },
        { type: 'calc', problem: '999-456', answer: 543 },
        { type: 'calc', problem: '500-123', answer: 377 },
        { type: 'calc', problem: '700-399', answer: 301 }
      ]
    }), difficulty: 4, duration: 18, stars: 20 },

  // ========== LEVEL 10: CỘNG TRỪ 4 CHỮ SỐ (3 bài - giữ nguyên) ==========
  { levelId: 10, lessonId: 1, title: '🔢 Số 1000-9999', order: 1,
    description: 'Biểu diễn số 4 chữ số trên Soroban',
    content: JSON.stringify({
      theory: [
        '📍 Cột 4: Hàng nghìn (1000-9000)',
        '🔢 Ví dụ: 2345 = 2 nghìn + 3 trăm + 4 chục + 5 đơn vị',
        '💡 Soroban có thể tính số rất lớn!',
        '🎯 Mỗi cột hoạt động giống nhau',
        '✨ Áp dụng tất cả công thức đã học!'
      ],
      practice: [
        { type: 'create', target: 1000 },
        { type: 'create', target: 1234 },
        { type: 'create', target: 2468 },
        { type: 'create', target: 3579 },
        { type: 'create', target: 4567 },
        { type: 'create', target: 5678 },
        { type: 'create', target: 6789 },
        { type: 'create', target: 7890 },
        { type: 'create', target: 8765 },
        { type: 'create', target: 9999 },
        { type: 'create', target: 5005 },
        { type: 'create', target: 1001 }
      ]
    }), difficulty: 4, duration: 12, stars: 15 },

  { levelId: 10, lessonId: 2, title: '➕ Cộng 4 chữ số', order: 2,
    description: 'Cộng số có 4 chữ số',
    content: JSON.stringify({
      theory: [
        '📏 Nguyên tắc không đổi: PHẢI sang TRÁI',
        '🔢 Ví dụ: 2345+1234',
        '📝 Đơn vị: 5+4 = 9',
        '📝 Chục: 4+3 = 7',
        '📝 Trăm: 3+2 = 5',
        '📝 Nghìn: 2+1 = 3',
        '✅ Kết quả: 2345+1234 = 3579'
      ],
      practice: [
        { type: 'calc', problem: '1234+1111', answer: 2345 },
        { type: 'calc', problem: '2345+1234', answer: 3579 },
        { type: 'calc', problem: '3456+2345', answer: 5801 },
        { type: 'calc', problem: '4567+2234', answer: 6801 },
        { type: 'calc', problem: '5678+2345', answer: 8023 },
        { type: 'calc', problem: '4567+3456', answer: 8023 },
        { type: 'calc', problem: '2468+1357', answer: 3825 },
        { type: 'calc', problem: '3579+2468', answer: 6047 },
        { type: 'calc', problem: '4680+3579', answer: 8259 },
        { type: 'calc', problem: '5000+4999', answer: 9999 },
        { type: 'calc', problem: '1111+2222', answer: 3333 },
        { type: 'calc', problem: '4444+5555', answer: 9999 }
      ]
    }), difficulty: 5, duration: 18, stars: 25 },

  { levelId: 10, lessonId: 3, title: '➖ Trừ 4 chữ số', order: 3,
    description: 'Trừ số có 4 chữ số',
    content: JSON.stringify({
      theory: [
        '📏 Trừ số lớn: cẩn thận khi mượn!',
        '🔢 Ví dụ: 5432-2345',
        '💡 Khi mượn qua nhiều hàng, nhớ trừ dần',
        '🎯 Luyện tập nhiều để thành thạo!',
        '✨ Kiên nhẫn và chính xác!'
      ],
      practice: [
        { type: 'calc', problem: '3456-1234', answer: 2222 },
        { type: 'calc', problem: '5432-2345', answer: 3087 },
        { type: 'calc', problem: '6543-3456', answer: 3087 },
        { type: 'calc', problem: '7654-4567', answer: 3087 },
        { type: 'calc', problem: '8000-4567', answer: 3433 },
        { type: 'calc', problem: '7654-3789', answer: 3865 },
        { type: 'calc', problem: '9000-5678', answer: 3322 },
        { type: 'calc', problem: '8765-4321', answer: 4444 },
        { type: 'calc', problem: '9999-5555', answer: 4444 },
        { type: 'calc', problem: '9876-4567', answer: 5309 },
        { type: 'calc', problem: '5000-1234', answer: 3766 },
        { type: 'calc', problem: '7777-3333', answer: 4444 }
      ]
    }), difficulty: 5, duration: 18, stars: 25 }
];

async function seedLessons() {
  console.log('🌱 Bắt đầu seed bài học Level 6-10...\n');
  
  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: { 
        levelId_lessonId: { 
          levelId: lesson.levelId, 
          lessonId: lesson.lessonId 
        } 
      },
      update: lesson,
      create: lesson,
    });
    console.log(`   ✅ Level ${lesson.levelId} - Bài ${lesson.lessonId}: ${lesson.title}`);
  }

  console.log(`\n🎉 Đã seed ${lessons.length} bài học (Level 6-10)!`);
}

seedLessons()
  .catch((e) => {
    console.error('❌ Lỗi:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
