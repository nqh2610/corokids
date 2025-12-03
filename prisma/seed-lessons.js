const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ============================================================
// HỆ THỐNG BÀI HỌC SOROBAN ĐẦY ĐỦ - 18 LEVEL - 45 BÀI
// ============================================================

const lessons = [
  // ========== LEVEL 1: LÀM QUEN SOROBAN (4 bài) ==========
  { levelId: 1, lessonId: 1, title: '🎒 Khám phá Soroban', order: 1,
    description: 'Làm quen với bàn tính thần kỳ Soroban',
    content: JSON.stringify({
      theory: [
        '🔴 Hạt Trời (hạt ở trên thanh ngang) có giá trị = 5',
        '🟡 Hạt Đất (hạt ở dưới thanh ngang) có giá trị = 1', 
        '📏 Hạt chỉ được đếm khi chạm vào thanh ngang',
        '👆 Gạt hạt Trời xuống = cộng 5, gạt lên = trừ 5',
        '👇 Gạt hạt Đất lên = cộng 1, gạt xuống = trừ 1'
      ],
      practice: [
        { type: 'explore', instruction: 'Hãy thử gạt 1 hạt Đất (hạt vàng phía dưới) lên thanh ngang để tạo số 1!', target: 1 },
        { type: 'explore', instruction: 'Hãy gạt 2 hạt Đất lên để tạo số 2!', target: 2 },
        { type: 'explore', instruction: 'Bây giờ hãy gạt hạt Trời (hạt đỏ phía trên) xuống để tạo số 5!', target: 5 },
        { type: 'explore', instruction: 'Tạo số 6 = Hạt Trời (5) + 1 hạt Đất (1)!', target: 6 },
        { type: 'explore', instruction: 'Thử tạo số 4 bằng 4 hạt Đất nhé!', target: 4 },
        { type: 'explore', instruction: 'Cuối cùng, reset bàn tính về số 0 (gạt tất cả về vị trí ban đầu)!', target: 0 }
      ]
    }), difficulty: 1, duration: 8, stars: 3 },

  { levelId: 1, lessonId: 2, title: '🔢 Số 1-4: Các hạt Đất', order: 2,
    description: 'Học cách tạo số 1, 2, 3, 4 bằng hạt Đất',
    content: JSON.stringify({
      theory: [
        '☝️ Số 1: Gạt 1 hạt Đất lên thanh ngang',
        '✌️ Số 2: Gạt 2 hạt Đất lên thanh ngang',
        '🤟 Số 3: Gạt 3 hạt Đất lên thanh ngang',
        '🖐️ Số 4: Gạt 4 hạt Đất lên thanh ngang',
        '💡 Nhớ: Mỗi hạt Đất có giá trị bằng 1'
      ],
      practice: [
        { type: 'create', target: 1 },
        { type: 'create', target: 2 },
        { type: 'create', target: 3 },
        { type: 'create', target: 4 },
        { type: 'create', target: 1 },
        { type: 'create', target: 3 },
        { type: 'create', target: 2 },
        { type: 'create', target: 4 },
        { type: 'create', target: 4 },
        { type: 'create', target: 1 }
      ]
    }), difficulty: 1, duration: 8, stars: 3 },

  { levelId: 1, lessonId: 3, title: '⭐ Số 5-9: Hạt Trời tỏa sáng', order: 3,
    description: 'Học cách dùng hạt Trời để tạo số 5-9',
    content: JSON.stringify({
      theory: [
        '🔴 Số 5: Chỉ cần gạt hạt Trời xuống (Trời = 5)',
        '🔴 Số 6 = Trời + 1 Đất (5 + 1)',
        '🔴 Số 7 = Trời + 2 Đất (5 + 2)',
        '🔴 Số 8 = Trời + 3 Đất (5 + 3)',
        '🔴 Số 9 = Trời + 4 Đất (5 + 4)',
        '💡 Công thức: Số = 5 + số hạt Đất'
      ],
      practice: [
        { type: 'create', target: 5 },
        { type: 'create', target: 6 },
        { type: 'create', target: 7 },
        { type: 'create', target: 8 },
        { type: 'create', target: 9 },
        { type: 'create', target: 5 },
        { type: 'create', target: 7 },
        { type: 'create', target: 9 },
        { type: 'create', target: 6 },
        { type: 'create', target: 8 }
      ]
    }), difficulty: 1, duration: 8, stars: 3 },

  { levelId: 1, lessonId: 4, title: '🔟 Số 10-99: Hai cột số', order: 4,
    description: 'Học cách biểu diễn số có 2 chữ số',
    content: JSON.stringify({
      theory: [
        '📍 Cột bên PHẢI = hàng đơn vị (1-9)',
        '📍 Cột bên TRÁI = hàng chục (10, 20, 30...)',
        '🔢 Ví dụ: Số 23 = 2 ở cột chục + 3 ở cột đơn vị',
        '🔢 Ví dụ: Số 45 = 4 ở cột chục + 5 ở cột đơn vị',
        '💡 Đọc từ trái sang phải như cách ta đọc số!'
      ],
      practice: [
        { type: 'create', target: 10 },
        { type: 'create', target: 15 },
        { type: 'create', target: 23 },
        { type: 'create', target: 36 },
        { type: 'create', target: 42 },
        { type: 'create', target: 58 },
        { type: 'create', target: 67 },
        { type: 'create', target: 74 },
        { type: 'create', target: 89 },
        { type: 'create', target: 99 }
      ]
    }), difficulty: 1, duration: 10, stars: 3 },

  // ========== LEVEL 2: CỘNG ĐƠN GIẢN (2 bài) ==========
  { levelId: 2, lessonId: 1, title: '➕ Cộng đơn giản (đủ hạt)', order: 1,
    description: 'Cộng khi có đủ hạt Đất để gạt',
    content: JSON.stringify({
      theory: [
        '✨ Cộng = Gạt thêm hạt Đất lên thanh ngang',
        '👆 1+1: Có 1 hạt, gạt thêm 1 hạt = 2 hạt',
        '👆 2+1: Có 2 hạt, gạt thêm 1 hạt = 3 hạt',
        '👆 1+2: Có 1 hạt, gạt thêm 2 hạt = 3 hạt',
        '💡 Chỉ áp dụng khi còn đủ hạt Đất để gạt!'
      ],
      practice: [
        { type: 'calc', problem: '1+1', answer: 2 },
        { type: 'calc', problem: '1+2', answer: 3 },
        { type: 'calc', problem: '2+1', answer: 3 },
        { type: 'calc', problem: '2+2', answer: 4 },
        { type: 'calc', problem: '1+3', answer: 4 },
        { type: 'calc', problem: '3+1', answer: 4 },
        { type: 'calc', problem: '1+1', answer: 2 },
        { type: 'calc', problem: '2+1', answer: 3 },
        { type: 'calc', problem: '1+2', answer: 3 },
        { type: 'calc', problem: '2+2', answer: 4 }
      ]
    }), difficulty: 1, duration: 10, stars: 3 },

  { levelId: 2, lessonId: 2, title: '➕ Cộng với hạt Trời', order: 2,
    description: 'Cộng khi kết quả từ 5 trở lên',
    content: JSON.stringify({
      theory: [
        '🔴 Khi cộng mà kết quả ≥ 5, cần dùng hạt Trời',
        '👇 0+5: Gạt hạt Trời xuống = 5',
        '👇 5+1: Có Trời rồi, gạt thêm 1 Đất = 6',
        '👇 5+2: Có Trời rồi, gạt thêm 2 Đất = 7',
        '💡 Hạt Trời giúp ta biểu diễn số từ 5-9!'
      ],
      practice: [
        { type: 'calc', problem: '0+5', answer: 5 },
        { type: 'calc', problem: '5+1', answer: 6 },
        { type: 'calc', problem: '5+2', answer: 7 },
        { type: 'calc', problem: '5+3', answer: 8 },
        { type: 'calc', problem: '5+4', answer: 9 },
        { type: 'calc', problem: '6+1', answer: 7 },
        { type: 'calc', problem: '6+2', answer: 8 },
        { type: 'calc', problem: '7+1', answer: 8 },
        { type: 'calc', problem: '7+2', answer: 9 },
        { type: 'calc', problem: '6+3', answer: 9 }
      ]
    }), difficulty: 1, duration: 10, stars: 3 },

  // ========== LEVEL 3: BẠN NHỎ (CỘNG) - 2 bài ==========
  { levelId: 3, lessonId: 1, title: '🤝 Làm quen Bạn nhỏ', order: 1,
    description: 'Học về các cặp số cộng lại bằng 5',
    content: JSON.stringify({
      theory: [
        '🌟 BẠN NHỎ là hai số cộng lại = 5',
        '👫 1 và 4 là bạn nhỏ của nhau (1+4=5)',
        '👫 2 và 3 là bạn nhỏ của nhau (2+3=5)',
        '💡 Khi hết hạt Đất để cộng, ta dùng Bạn nhỏ!',
        '🎯 Công thức: +4 = +5 - 1 (gạt Trời xuống, bỏ bạn nhỏ)'
      ],
      practice: [
        { type: 'friend5', question: 'Bạn nhỏ của 1 là mấy?', answer: 4 },
        { type: 'friend5', question: 'Bạn nhỏ của 4 là mấy?', answer: 1 },
        { type: 'friend5', question: 'Bạn nhỏ của 2 là mấy?', answer: 3 },
        { type: 'friend5', question: 'Bạn nhỏ của 3 là mấy?', answer: 2 },
        { type: 'friend5', question: 'Bạn nhỏ của 1 là mấy?', answer: 4 },
        { type: 'friend5', question: 'Bạn nhỏ của 2 là mấy?', answer: 3 },
        { type: 'friend5', question: 'Bạn nhỏ của 3 là mấy?', answer: 2 },
        { type: 'friend5', question: 'Bạn nhỏ của 4 là mấy?', answer: 1 }
      ]
    }), difficulty: 2, duration: 10, stars: 3 },

  { levelId: 3, lessonId: 2, title: '➕ Cộng dùng Bạn nhỏ', order: 2,
    description: 'Áp dụng Bạn nhỏ để cộng khi hết hạt Đất',
    content: JSON.stringify({
      theory: [
        '🎯 Khi hết hạt Đất, dùng công thức Bạn nhỏ:',
        '➕ Cộng 4 = Gạt Trời xuống, bỏ 1 Đất (+5-1)',
        '➕ Cộng 3 = Gạt Trời xuống, bỏ 2 Đất (+5-2)',
        '➕ Cộng 2 = Gạt Trời xuống, bỏ 3 Đất (+5-3)',
        '➕ Cộng 1 = Gạt Trời xuống, bỏ 4 Đất (+5-4)'
      ],
      practice: [
        { type: 'calc', problem: '1+4', answer: 5 },
        { type: 'calc', problem: '2+3', answer: 5 },
        { type: 'calc', problem: '3+2', answer: 5 },
        { type: 'calc', problem: '4+1', answer: 5 },
        { type: 'calc', problem: '2+4', answer: 6 },
        { type: 'calc', problem: '3+4', answer: 7 },
        { type: 'calc', problem: '4+4', answer: 8 },
        { type: 'calc', problem: '3+3', answer: 6 },
        { type: 'calc', problem: '4+3', answer: 7 },
        { type: 'calc', problem: '4+2', answer: 6 }
      ]
    }), difficulty: 2, duration: 12, stars: 3 },

  // ========== LEVEL 4: BẠN NHỎ (TRỪ) - 2 bài ==========
  { levelId: 4, lessonId: 1, title: '➖ Trừ đơn giản', order: 1,
    description: 'Trừ khi có đủ hạt để bỏ',
    content: JSON.stringify({
      theory: [
        '✨ Trừ = Gạt hạt ra xa thanh ngang',
        '👇 Trừ hạt Đất: Gạt hạt Đất xuống (ra xa thanh)',
        '👆 Trừ hạt Trời: Gạt hạt Trời lên (ra xa thanh)',
        '🔢 Ví dụ: 4-2 = Có 4 Đất, gạt bớt 2 Đất = còn 2',
        '💡 Chỉ áp dụng khi có đủ hạt để gạt bỏ!'
      ],
      practice: [
        { type: 'calc', problem: '2-1', answer: 1 },
        { type: 'calc', problem: '3-1', answer: 2 },
        { type: 'calc', problem: '3-2', answer: 1 },
        { type: 'calc', problem: '4-1', answer: 3 },
        { type: 'calc', problem: '4-2', answer: 2 },
        { type: 'calc', problem: '4-3', answer: 1 },
        { type: 'calc', problem: '9-3', answer: 6 },
        { type: 'calc', problem: '8-2', answer: 6 },
        { type: 'calc', problem: '7-1', answer: 6 },
        { type: 'calc', problem: '9-4', answer: 5 }
      ]
    }), difficulty: 2, duration: 10, stars: 3 },

  { levelId: 4, lessonId: 2, title: '➖ Trừ dùng Bạn nhỏ', order: 2,
    description: 'Áp dụng Bạn nhỏ để trừ khi thiếu hạt Đất',
    content: JSON.stringify({
      theory: [
        '🎯 Khi thiếu hạt Đất để trừ, dùng Bạn nhỏ:',
        '➖ Trừ 4 = Gạt Trời lên, thêm 1 Đất (-5+1)',
        '➖ Trừ 3 = Gạt Trời lên, thêm 2 Đất (-5+2)',
        '➖ Trừ 2 = Gạt Trời lên, thêm 3 Đất (-5+3)',
        '➖ Trừ 1 = Gạt Trời lên, thêm 4 Đất (-5+4)'
      ],
      practice: [
        { type: 'calc', problem: '5-1', answer: 4 },
        { type: 'calc', problem: '5-2', answer: 3 },
        { type: 'calc', problem: '5-3', answer: 2 },
        { type: 'calc', problem: '5-4', answer: 1 },
        { type: 'calc', problem: '6-1', answer: 5 },
        { type: 'calc', problem: '6-2', answer: 4 },
        { type: 'calc', problem: '7-3', answer: 4 },
        { type: 'calc', problem: '8-4', answer: 4 },
        { type: 'calc', problem: '9-4', answer: 5 },
        { type: 'calc', problem: '7-2', answer: 5 }
      ]
    }), difficulty: 2, duration: 12, stars: 3 },

  // ========== LEVEL 5: BẠN LỚN (CỘNG) - 2 bài ==========
  { levelId: 5, lessonId: 1, title: '🤝 Làm quen Bạn lớn', order: 1,
    description: 'Học về các cặp số cộng lại bằng 10',
    content: JSON.stringify({
      theory: [
        '🌟 BẠN LỚN là hai số cộng lại = 10',
        '👫 1 và 9 là bạn lớn của nhau (1+9=10)',
        '👫 2 và 8 là bạn lớn của nhau (2+8=10)',
        '👫 3 và 7 là bạn lớn của nhau (3+7=10)',
        '👫 4 và 6 là bạn lớn của nhau (4+6=10)',
        '👫 5 và 5 là bạn lớn của nhau (5+5=10)'
      ],
      practice: [
        { type: 'friend10', question: 'Bạn lớn của 1 là mấy?', answer: 9 },
        { type: 'friend10', question: 'Bạn lớn của 9 là mấy?', answer: 1 },
        { type: 'friend10', question: 'Bạn lớn của 2 là mấy?', answer: 8 },
        { type: 'friend10', question: 'Bạn lớn của 8 là mấy?', answer: 2 },
        { type: 'friend10', question: 'Bạn lớn của 3 là mấy?', answer: 7 },
        { type: 'friend10', question: 'Bạn lớn của 7 là mấy?', answer: 3 },
        { type: 'friend10', question: 'Bạn lớn của 4 là mấy?', answer: 6 },
        { type: 'friend10', question: 'Bạn lớn của 6 là mấy?', answer: 4 },
        { type: 'friend10', question: 'Bạn lớn của 5 là mấy?', answer: 5 },
        { type: 'friend10', question: 'Bạn lớn của 5 là mấy?', answer: 5 }
      ]
    }), difficulty: 3, duration: 10, stars: 3 },

  { levelId: 5, lessonId: 2, title: '➕ Cộng dùng Bạn lớn', order: 2,
    description: 'Cộng bằng cách sang cột chục khi không đủ hạt',
    content: JSON.stringify({
      theory: [
        '🎯 Khi cộng quá 9, cần sang hàng chục!',
        '➕ Cộng 9 = Thêm 1 chục, bớt bạn lớn của 9 (+10-1)',
        '➕ Cộng 8 = Thêm 1 chục, bớt bạn lớn của 8 (+10-2)',
        '➕ Cộng 7 = Thêm 1 chục, bớt bạn lớn của 7 (+10-3)',
        '💡 Công thức: +số = +10 - bạn lớn của số đó'
      ],
      practice: [
        { type: 'calc', problem: '1+9', answer: 10 },
        { type: 'calc', problem: '2+8', answer: 10 },
        { type: 'calc', problem: '3+7', answer: 10 },
        { type: 'calc', problem: '4+6', answer: 10 },
        { type: 'calc', problem: '5+5', answer: 10 },
        { type: 'calc', problem: '2+9', answer: 11 },
        { type: 'calc', problem: '3+8', answer: 11 },
        { type: 'calc', problem: '4+7', answer: 11 },
        { type: 'calc', problem: '5+6', answer: 11 },
        { type: 'calc', problem: '6+5', answer: 11 }
      ]
    }), difficulty: 3, duration: 12, stars: 3 },

  // ========== LEVEL 6: BẠN LỚN (TRỪ) - 1 bài ==========
  { levelId: 6, lessonId: 1, title: '➖ Trừ dùng Bạn lớn', order: 1,
    description: 'Trừ bằng cách mượn từ hàng chục',
    content: JSON.stringify({
      theory: [
        '🎯 Khi không đủ hạt để trừ, mượn từ hàng chục!',
        '➖ Trừ 9 = Bớt 1 chục, thêm bạn lớn của 9 (-10+1)',
        '➖ Trừ 8 = Bớt 1 chục, thêm bạn lớn của 8 (-10+2)',
        '➖ Trừ 7 = Bớt 1 chục, thêm bạn lớn của 7 (-10+3)',
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
        { type: 'calc', problem: '15-9', answer: 6 }
      ]
    }), difficulty: 3, duration: 12, stars: 3 },

  // ========== LEVEL 7: KẾT HỢP BẠN NHỎ + BẠN LỚN (2 bài) ==========
  { levelId: 7, lessonId: 1, title: '🎯 Cộng kết hợp', order: 1,
    description: 'Kết hợp cả Bạn nhỏ và Bạn lớn',
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
        { type: 'calc', problem: '8+8', answer: 16 }
      ]
    }), difficulty: 4, duration: 15, stars: 3 },

  { levelId: 7, lessonId: 2, title: '🎯 Trừ kết hợp', order: 2,
    description: 'Kết hợp mượn và dùng Bạn nhỏ',
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
        { type: 'calc', problem: '16-9', answer: 7 }
      ]
    }), difficulty: 4, duration: 15, stars: 3 },

  // ========== LEVEL 8: CỘNG TRỪ 2 CHỮ SỐ (3 bài) ==========
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
        { type: 'calc', problem: '52+36', answer: 88 }
      ]
    }), difficulty: 3, duration: 12, stars: 3 },

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
        { type: 'calc', problem: '67+28', answer: 95 }
      ]
    }), difficulty: 4, duration: 15, stars: 3 },

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
        { type: 'calc', problem: '82-56', answer: 26 }
      ]
    }), difficulty: 4, duration: 15, stars: 3 },

  // ========== LEVEL 9: CỘNG TRỪ 3 CHỮ SỐ (3 bài) ==========
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
        { type: 'create', target: 999 }
      ]
    }), difficulty: 3, duration: 12, stars: 3 },

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
        { type: 'calc', problem: '523+368', answer: 891 }
      ]
    }), difficulty: 4, duration: 18, stars: 3 },

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
        { type: 'calc', problem: '999-456', answer: 543 }
      ]
    }), difficulty: 4, duration: 18, stars: 3 },

  // ========== LEVEL 10: CỘNG TRỪ 4 CHỮ SỐ (3 bài) ==========
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
        { type: 'create', target: 9999 }
      ]
    }), difficulty: 4, duration: 12, stars: 3 },

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
        { type: 'calc', problem: '5000+4999', answer: 9999 }
      ]
    }), difficulty: 5, duration: 18, stars: 3 },

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
        { type: 'calc', problem: '9876-4567', answer: 5309 }
      ]
    }), difficulty: 5, duration: 18, stars: 3 },

  // ========== LEVEL 11: NHÂN CƠ BẢN (2 bài) ==========
  { levelId: 11, lessonId: 1, title: '✖️ Ôn bảng cửu chương', order: 1,
    description: 'Ôn lại bảng nhân để chuẩn bị nhân trên Soroban',
    content: JSON.stringify({
      theory: [
        '📚 Thuộc lòng bảng cửu chương là nền tảng!',
        '✖️ Nhân 2: 2,4,6,8,10,12,14,16,18',
        '✖️ Nhân 3: 3,6,9,12,15,18,21,24,27',
        '✖️ Nhân 5: 5,10,15,20,25,30,35,40,45',
        '💡 Hãy nhẩm nhanh các phép nhân!'
      ],
      practice: [
        { type: 'calc', problem: '2×3', answer: 6 },
        { type: 'calc', problem: '3×4', answer: 12 },
        { type: 'calc', problem: '4×5', answer: 20 },
        { type: 'calc', problem: '5×6', answer: 30 },
        { type: 'calc', problem: '6×7', answer: 42 },
        { type: 'calc', problem: '7×8', answer: 56 },
        { type: 'calc', problem: '8×9', answer: 72 },
        { type: 'calc', problem: '9×9', answer: 81 },
        { type: 'calc', problem: '7×7', answer: 49 },
        { type: 'calc', problem: '6×8', answer: 48 }
      ]
    }), difficulty: 3, duration: 12, stars: 3 },

  { levelId: 11, lessonId: 2, title: '✖️ Nhân 1 chữ số', order: 2,
    description: 'Nhân số 1 chữ số trên Soroban',
    content: JSON.stringify({
      theory: [
        '🎯 Nhân trên Soroban: Đặt số, tính tích',
        '🔢 Ví dụ: 3×4 = 12',
        '📝 Bước 1: Nhẩm 3×4 = 12',
        '📝 Bước 2: Gạt 12 lên Soroban',
        '💡 Bảng cửu chương giúp ta nhẩm nhanh!'
      ],
      practice: [
        { type: 'calc', problem: '2×4', answer: 8 },
        { type: 'calc', problem: '3×4', answer: 12 },
        { type: 'calc', problem: '4×4', answer: 16 },
        { type: 'calc', problem: '5×5', answer: 25 },
        { type: 'calc', problem: '5×6', answer: 30 },
        { type: 'calc', problem: '6×6', answer: 36 },
        { type: 'calc', problem: '7×7', answer: 49 },
        { type: 'calc', problem: '7×9', answer: 63 },
        { type: 'calc', problem: '8×8', answer: 64 },
        { type: 'calc', problem: '9×9', answer: 81 }
      ]
    }), difficulty: 3, duration: 15, stars: 3 },

  // ========== LEVEL 12: NHÂN 2 CHỮ SỐ (2 bài) ==========
  { levelId: 12, lessonId: 1, title: '✖️ Nhân 2×1 chữ số', order: 1,
    description: 'Nhân số 2 chữ số với số 1 chữ số',
    content: JSON.stringify({
      theory: [
        '🎯 Nhân từ PHẢI sang TRÁI',
        '🔢 Ví dụ: 23×4',
        '📝 Bước 1: 3×4 = 12 (ghi 2, nhớ 1)',
        '📝 Bước 2: 2×4 = 8, +1 = 9',
        '✅ Kết quả: 23×4 = 92'
      ],
      practice: [
        { type: 'calc', problem: '12×3', answer: 36 },
        { type: 'calc', problem: '23×4', answer: 92 },
        { type: 'calc', problem: '34×5', answer: 170 },
        { type: 'calc', problem: '45×6', answer: 270 },
        { type: 'calc', problem: '56×7', answer: 392 },
        { type: 'calc', problem: '67×8', answer: 536 },
        { type: 'calc', problem: '78×5', answer: 390 },
        { type: 'calc', problem: '89×4', answer: 356 },
        { type: 'calc', problem: '25×8', answer: 200 },
        { type: 'calc', problem: '36×9', answer: 324 }
      ]
    }), difficulty: 4, duration: 18, stars: 3 },

  { levelId: 12, lessonId: 2, title: '✖️ Nhân 2×2 chữ số', order: 2,
    description: 'Nhân hai số có 2 chữ số',
    content: JSON.stringify({
      theory: [
        '🎯 Nhân từng chữ số rồi cộng lại',
        '🔢 Ví dụ: 12×34',
        '📝 Bước 1: 12×4 = 48',
        '📝 Bước 2: 12×30 = 360',
        '📝 Bước 3: 48+360 = 408',
        '✅ Kết quả: 12×34 = 408'
      ],
      practice: [
        { type: 'calc', problem: '11×11', answer: 121 },
        { type: 'calc', problem: '12×12', answer: 144 },
        { type: 'calc', problem: '12×34', answer: 408 },
        { type: 'calc', problem: '23×12', answer: 276 },
        { type: 'calc', problem: '15×15', answer: 225 },
        { type: 'calc', problem: '13×14', answer: 182 },
        { type: 'calc', problem: '21×21', answer: 441 },
        { type: 'calc', problem: '25×25', answer: 625 },
        { type: 'calc', problem: '16×18', answer: 288 },
        { type: 'calc', problem: '24×36', answer: 864 }
      ]
    }), difficulty: 5, duration: 20, stars: 3 },

  // ========== LEVEL 13: CHIA CƠ BẢN (2 bài) ==========
  { levelId: 13, lessonId: 1, title: '➗ Chia hết', order: 1,
    description: 'Chia không dư trên Soroban',
    content: JSON.stringify({
      theory: [
        '🎯 Chia = Trừ liên tục',
        '🔢 Ví dụ: 12÷3',
        '📝 12-3=9, 9-3=6, 6-3=3, 3-3=0',
        '📝 Trừ được 4 lần → 12÷3 = 4',
        '💡 Dùng bảng cửu chương ngược!'
      ],
      practice: [
        { type: 'calc', problem: '6÷2', answer: 3 },
        { type: 'calc', problem: '8÷4', answer: 2 },
        { type: 'calc', problem: '12÷3', answer: 4 },
        { type: 'calc', problem: '15÷5', answer: 3 },
        { type: 'calc', problem: '20÷4', answer: 5 },
        { type: 'calc', problem: '20÷5', answer: 4 },
        { type: 'calc', problem: '24÷6', answer: 4 },
        { type: 'calc', problem: '36÷6', answer: 6 },
        { type: 'calc', problem: '56÷8', answer: 7 },
        { type: 'calc', problem: '81÷9', answer: 9 }
      ]
    }), difficulty: 4, duration: 15, stars: 3 },

  { levelId: 13, lessonId: 2, title: '➗ Chia có dư', order: 2,
    description: 'Chia có số dư trên Soroban',
    content: JSON.stringify({
      theory: [
        '🎯 Chia có dư: Trừ đến khi không trừ được nữa',
        '🔢 Ví dụ: 13÷4',
        '📝 13-4=9, 9-4=5, 5-4=1 (còn 1 không trừ được)',
        '📝 Trừ được 3 lần, còn dư 1',
        '✅ Kết quả: 13÷4 = 3 dư 1'
      ],
      practice: [
        { type: 'calc', problem: '7÷2', answer: 3 },
        { type: 'calc', problem: '10÷3', answer: 3 },
        { type: 'calc', problem: '13÷4', answer: 3 },
        { type: 'calc', problem: '17÷5', answer: 3 },
        { type: 'calc', problem: '25÷7', answer: 3 },
        { type: 'calc', problem: '30÷7', answer: 4 },
        { type: 'calc', problem: '50÷8', answer: 6 },
        { type: 'calc', problem: '43÷6', answer: 7 },
        { type: 'calc', problem: '59÷9', answer: 6 },
        { type: 'calc', problem: '67÷8', answer: 8 }
      ]
    }), difficulty: 4, duration: 15, stars: 3 },

  // ========== LEVEL 14: CHIA SỐ LỚN (2 bài) ==========
  { levelId: 14, lessonId: 1, title: '➗ Chia 2÷1 chữ số', order: 1,
    description: 'Chia số 2 chữ số cho số 1 chữ số',
    content: JSON.stringify({
      theory: [
        '🎯 Chia từ TRÁI sang PHẢI',
        '🔢 Ví dụ: 84÷4',
        '📝 Bước 1: 8÷4 = 2 (viết 2 ở hàng chục)',
        '📝 Bước 2: 4÷4 = 1 (viết 1 ở hàng đơn vị)',
        '✅ Kết quả: 84÷4 = 21'
      ],
      practice: [
        { type: 'calc', problem: '42÷2', answer: 21 },
        { type: 'calc', problem: '63÷3', answer: 21 },
        { type: 'calc', problem: '84÷4', answer: 21 },
        { type: 'calc', problem: '96÷6', answer: 16 },
        { type: 'calc', problem: '75÷5', answer: 15 },
        { type: 'calc', problem: '48÷4', answer: 12 },
        { type: 'calc', problem: '72÷8', answer: 9 },
        { type: 'calc', problem: '56÷7', answer: 8 },
        { type: 'calc', problem: '91÷7', answer: 13 },
        { type: 'calc', problem: '85÷5', answer: 17 }
      ]
    }), difficulty: 4, duration: 18, stars: 3 },

  { levelId: 14, lessonId: 2, title: '➗ Chia 3÷1 chữ số', order: 2,
    description: 'Chia số 3 chữ số cho số 1 chữ số',
    content: JSON.stringify({
      theory: [
        '🎯 Chia từng hàng, từ TRÁI sang PHẢI',
        '🔢 Ví dụ: 456÷4',
        '📝 Bước 1: 4÷4 = 1 (viết 1 ở hàng trăm)',
        '📝 Bước 2: 5÷4 = 1 dư 1 (viết 1, nhớ 10)',
        '📝 Bước 3: 16÷4 = 4 (viết 4)',
        '✅ Kết quả: 456÷4 = 114'
      ],
      practice: [
        { type: 'calc', problem: '246÷2', answer: 123 },
        { type: 'calc', problem: '369÷3', answer: 123 },
        { type: 'calc', problem: '456÷4', answer: 114 },
        { type: 'calc', problem: '525÷5', answer: 105 },
        { type: 'calc', problem: '648÷6', answer: 108 },
        { type: 'calc', problem: '729÷9', answer: 81 },
        { type: 'calc', problem: '648÷8', answer: 81 },
        { type: 'calc', problem: '735÷7', answer: 105 },
        { type: 'calc', problem: '864÷8', answer: 108 },
        { type: 'calc', problem: '999÷9', answer: 111 }
      ]
    }), difficulty: 5, duration: 20, stars: 3 },

  // ========== LEVEL 15: TÍNH NHẨM CƠ BẢN (2 bài) ==========
  { levelId: 15, lessonId: 1, title: '🧠 Tính nhẩm 1 chữ số', order: 1,
    description: 'Tưởng tượng Soroban trong đầu - Anzan cơ bản',
    content: JSON.stringify({
      theory: [
        '🧠 ANZAN = Tính nhẩm bằng Soroban ảo!',
        '💭 Nhắm mắt, tưởng tượng bàn tính trong đầu',
        '👁️ Nhìn số → Hình dung hạt → Tính toán',
        '🎯 Bắt đầu với số đơn giản trước',
        '⏱️ Thời gian: 5 giây mỗi phép tính'
      ],
      practice: [
        { type: 'mental', problem: '2+3', answer: 5, time: 5 },
        { type: 'mental', problem: '3+5', answer: 8, time: 5 },
        { type: 'mental', problem: '4+5', answer: 9, time: 5 },
        { type: 'mental', problem: '8-3', answer: 5, time: 5 },
        { type: 'mental', problem: '9-4', answer: 5, time: 5 },
        { type: 'mental', problem: '4+7', answer: 11, time: 5 },
        { type: 'mental', problem: '6+8', answer: 14, time: 5 },
        { type: 'mental', problem: '15-7', answer: 8, time: 5 },
        { type: 'mental', problem: '13-6', answer: 7, time: 5 },
        { type: 'mental', problem: '8+9', answer: 17, time: 5 }
      ]
    }), difficulty: 5, duration: 12, stars: 3 },

  { levelId: 15, lessonId: 2, title: '🧠 Tính nhẩm 2 chữ số', order: 2,
    description: 'Anzan với số 2 chữ số',
    content: JSON.stringify({
      theory: [
        '🧠 Nâng cao: Tính nhẩm số 2 chữ số',
        '💭 Tưởng tượng 2 cột trên Soroban ảo',
        '📝 Tính từ PHẢI sang TRÁI trong đầu',
        '🎯 Giữ hình ảnh Soroban rõ ràng',
        '⏱️ Thời gian: 10 giây mỗi phép tính'
      ],
      practice: [
        { type: 'mental', problem: '12+15', answer: 27, time: 10 },
        { type: 'mental', problem: '23+34', answer: 57, time: 10 },
        { type: 'mental', problem: '23+45', answer: 68, time: 10 },
        { type: 'mental', problem: '35+42', answer: 77, time: 10 },
        { type: 'mental', problem: '56-23', answer: 33, time: 10 },
        { type: 'mental', problem: '67-34', answer: 33, time: 10 },
        { type: 'mental', problem: '45+38', answer: 83, time: 10 },
        { type: 'mental', problem: '78-49', answer: 29, time: 10 },
        { type: 'mental', problem: '63+28', answer: 91, time: 10 },
        { type: 'mental', problem: '82-35', answer: 47, time: 10 }
      ]
    }), difficulty: 5, duration: 15, stars: 3 },

  // ========== LEVEL 16: TÍNH NHẨM NÂNG CAO (2 bài) ==========
  { levelId: 16, lessonId: 1, title: '🧠 Chuỗi tính nhẩm', order: 1,
    description: 'Tính nhiều phép liên tiếp trong đầu',
    content: JSON.stringify({
      theory: [
        '🧠 Tính chuỗi: Nhiều phép tính liên tiếp',
        '💭 Giữ kết quả trung gian trên Soroban ảo',
        '📝 Ví dụ: 5+3+2 → 5+3=8, 8+2=10',
        '🎯 Không được quên kết quả trung gian!',
        '⏱️ Thời gian: 8 giây mỗi chuỗi'
      ],
      practice: [
        { type: 'mental', problem: '3+4+5', answer: 12, time: 8 },
        { type: 'mental', problem: '5+3+2', answer: 10, time: 8 },
        { type: 'mental', problem: '6+4+7', answer: 17, time: 8 },
        { type: 'mental', problem: '8+5+3', answer: 16, time: 8 },
        { type: 'mental', problem: '12+8-5', answer: 15, time: 10 },
        { type: 'mental', problem: '15-7+4', answer: 12, time: 10 },
        { type: 'mental', problem: '9+8-6', answer: 11, time: 10 },
        { type: 'mental', problem: '20-8+5', answer: 17, time: 10 },
        { type: 'mental', problem: '7+9-8+4', answer: 12, time: 12 },
        { type: 'mental', problem: '15-6+8-3', answer: 14, time: 12 }
      ]
    }), difficulty: 5, duration: 18, stars: 3 },

  { levelId: 16, lessonId: 2, title: '🧠 Tính nhẩm 3 chữ số', order: 2,
    description: 'Đỉnh cao Anzan - tính nhẩm số lớn',
    content: JSON.stringify({
      theory: [
        '🏆 Đỉnh cao: Tính nhẩm số 3 chữ số!',
        '💭 Tưởng tượng 3 cột Soroban rõ ràng',
        '📝 Tập trung cao độ, không phân tâm',
        '🎯 Luyện tập nhiều để não quen hình ảnh',
        '⏱️ Thời gian: 15 giây mỗi phép tính'
      ],
      practice: [
        { type: 'mental', problem: '123+234', answer: 357, time: 15 },
        { type: 'mental', problem: '234+345', answer: 579, time: 15 },
        { type: 'mental', problem: '345+456', answer: 801, time: 15 },
        { type: 'mental', problem: '456+321', answer: 777, time: 15 },
        { type: 'mental', problem: '500-234', answer: 266, time: 15 },
        { type: 'mental', problem: '600-345', answer: 255, time: 15 },
        { type: 'mental', problem: '456+289', answer: 745, time: 15 },
        { type: 'mental', problem: '723-456', answer: 267, time: 15 },
        { type: 'mental', problem: '567+234', answer: 801, time: 15 },
        { type: 'mental', problem: '800-567', answer: 233, time: 15 }
      ]
    }), difficulty: 6, duration: 18, stars: 3 },

  // ========== LEVEL 17: LUYỆN TỐC ĐỘ (3 bài) ==========
  { levelId: 17, lessonId: 1, title: '⚡ Tốc độ cộng', order: 1,
    description: 'Luyện cộng thật nhanh trên Soroban',
    content: JSON.stringify({
      theory: [
        '⚡ MỤC TIÊU: 30 phép cộng trong 1 phút!',
        '🎯 Ngón tay phải linh hoạt và chính xác',
        '💡 Không cần nhìn, cảm nhận hạt bằng tay',
        '🔥 Tập trung cao độ, không phân tâm',
        '🏆 Càng nhanh càng nhiều điểm!'
      ],
      practice: [
        { type: 'speed', operation: 'add', count: 10, time: 30 },
        { type: 'speed', operation: 'add', count: 15, time: 45 },
        { type: 'speed', operation: 'add', count: 20, time: 60 }
      ]
    }), difficulty: 5, duration: 12, stars: 3 },

  { levelId: 17, lessonId: 2, title: '⚡ Tốc độ trừ', order: 2,
    description: 'Luyện trừ thật nhanh trên Soroban',
    content: JSON.stringify({
      theory: [
        '⚡ MỤC TIÊU: 30 phép trừ trong 1 phút!',
        '🎯 Trừ cần cẩn thận hơn cộng',
        '💡 Nhớ công thức Bạn nhỏ và Bạn lớn',
        '🔥 Luyện tập để phản xạ tự động',
        '🏆 Chính xác quan trọng hơn tốc độ!'
      ],
      practice: [
        { type: 'speed', operation: 'subtract', count: 10, time: 30 },
        { type: 'speed', operation: 'subtract', count: 15, time: 45 },
        { type: 'speed', operation: 'subtract', count: 20, time: 60 }
      ]
    }), difficulty: 5, duration: 12, stars: 3 },

  { levelId: 17, lessonId: 3, title: '⚡ Tốc độ hỗn hợp', order: 3,
    description: 'Cộng trừ xen kẽ - thử thách cuối cùng',
    content: JSON.stringify({
      theory: [
        '⚡ THỬ THÁCH: 50 phép tính hỗn hợp/phút!',
        '🎯 Chuyển đổi nhanh giữa cộng và trừ',
        '💡 Não phải phản xạ cực nhanh',
        '🔥 Đây là bài test kỹ năng Soroban!',
        '🏆 Chinh phục được = Bậc thầy Soroban!'
      ],
      practice: [
        { type: 'speed', operation: 'mixed', count: 15, time: 30 },
        { type: 'speed', operation: 'mixed', count: 25, time: 45 },
        { type: 'speed', operation: 'mixed', count: 30, time: 60 }
      ]
    }), difficulty: 6, duration: 15, stars: 3 },

  // ========== LEVEL 18: THI ĐẤU (3 bài) ==========
  { levelId: 18, lessonId: 1, title: '🏆 Thi cấp 10 (Sơ cấp)', order: 1,
    description: 'Thi Soroban cấp độ nhập môn',
    content: JSON.stringify({
      theory: [
        '🏆 THI CẤP 10 - Cấp độ nhập môn',
        '📋 Nội dung: Cộng trừ số 1-2 chữ số',
        '⏱️ Thời gian: 3 phút cho 10 bài',
        '✅ Đạt: Đúng 7/10 bài trở lên',
        '🎯 Bình tĩnh và chính xác!'
      ],
      practice: [
        { type: 'exam', level: 10, count: 10, time: 180 }
      ]
    }), difficulty: 4, duration: 15, stars: 3 },

  { levelId: 18, lessonId: 2, title: '🏆 Thi cấp 9 (Cơ bản)', order: 2,
    description: 'Thi Soroban cấp độ cơ bản',
    content: JSON.stringify({
      theory: [
        '🏆 THI CẤP 9 - Cấp độ cơ bản',
        '📋 Nội dung: Cộng trừ số 2-3 chữ số',
        '⏱️ Thời gian: 4 phút cho 15 bài',
        '✅ Đạt: Đúng 10/15 bài trở lên',
        '🎯 Áp dụng tốt Bạn nhỏ và Bạn lớn!'
      ],
      practice: [
        { type: 'exam', level: 9, count: 15, time: 240 }
      ]
    }), difficulty: 5, duration: 18, stars: 3 },

  { levelId: 18, lessonId: 3, title: '🏆 Thi cấp 8 (Trung cấp)', order: 3,
    description: 'Thi Soroban cấp độ trung cấp',
    content: JSON.stringify({
      theory: [
        '🏆 THI CẤP 8 - Cấp độ trung cấp',
        '📋 Nội dung: Cộng trừ nhân số 3-4 chữ số',
        '⏱️ Thời gian: 5 phút cho 20 bài',
        '✅ Đạt: Đúng 14/20 bài trở lên',
        '🎯 Chinh phục được = Tay cứng Soroban!'
      ],
      practice: [
        { type: 'exam', level: 8, count: 20, time: 300 }
      ]
    }), difficulty: 6, duration: 20, stars: 3 }
];

const achievements = [
  { name: 'Người mới', description: 'Hoàn thành bài học đầu tiên', icon: '🌱', category: 'learning', requirement: JSON.stringify({ type: 'complete_lessons', count: 1 }), stars: 50, diamonds: 5 },
  { name: 'Chăm chỉ', description: 'Hoàn thành 10 bài học', icon: '📚', category: 'learning', requirement: JSON.stringify({ type: 'complete_lessons', count: 10 }), stars: 100, diamonds: 10 },
  { name: 'Bậc thầy', description: 'Hoàn thành tất cả', icon: '🏆', category: 'learning', requirement: JSON.stringify({ type: 'complete_all_lessons' }), stars: 500, diamonds: 50 },
  { name: 'Chuỗi 7 ngày', description: 'Học 7 ngày liên tiếp', icon: '🔥', category: 'streak', requirement: JSON.stringify({ type: 'streak', count: 7 }), stars: 70, diamonds: 7 }
];

const quests = [
  { title: 'Luyện tập', description: 'Hoàn thành 5 bài tập', type: 'daily', category: 'practice', requirement: JSON.stringify({ type: 'complete_exercises', count: 5 }), stars: 50, diamonds: 5 },
  { title: 'Học mới', description: 'Hoàn thành 1 bài học', type: 'daily', category: 'lesson', requirement: JSON.stringify({ type: 'complete_lessons', count: 1 }), stars: 100, diamonds: 10 }
];

const shopItems = [
  { name: 'Avatar Ninja', description: 'Avatar ninja', icon: '🥷', category: 'avatar', price: 50, type: 'permanent', data: JSON.stringify({ avatarId: 'ninja' }) },
  { name: 'Gợi ý', description: '5 lần gợi ý', icon: '💡', category: 'power-up', price: 10, type: 'consumable', data: JSON.stringify({ powerUpType: 'hint', uses: 5 }) }
];

async function seedAll() {
  console.log('🌱 Seeding...');
  
  // Xóa tất cả lessons cũ trước khi seed mới
  await prisma.lesson.deleteMany({});
  console.log('🗑️ Đã xóa lessons cũ!');
  
  for (const l of lessons) {
    await prisma.lesson.upsert({
      where: { levelId_lessonId: { levelId: l.levelId, lessonId: l.lessonId } },
      update: l, create: l
    });
  }
  console.log(`✅ ${lessons.length} bài học!`);

  for (const a of achievements) {
    await prisma.achievement.upsert({ where: { name: a.name }, update: a, create: a });
  }
  
  for (const q of quests) {
    const e = await prisma.quest.findFirst({ where: { title: q.title } });
    if (!e) await prisma.quest.create({ data: q });
  }
  
  for (const i of shopItems) {
    const e = await prisma.shopItem.findFirst({ where: { name: i.name } });
    if (!e) await prisma.shopItem.create({ data: i });
  }
  
  console.log('✅ Hoàn tất!');
}

seedAll().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
