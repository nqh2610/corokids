const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * HỆ THỐNG BÀI HỌC SOROBAN - PHƯƠNG PHÁP CHUẨN NHẬT BẢN
 * 
 * Cấu trúc: 10 Level, mỗi level 3-5 bài
 * Tổng: ~40 bài học từ cơ bản đến nâng cao
 * 
 * NGUYÊN TẮC:
 * 1. Học số trước, phép tính sau
 * 2. Học "Bạn nhỏ" (cộng=5) và "Bạn lớn" (cộng=10) - kỹ thuật cốt lõi
 * 3. Từ 1 chữ số → nhiều chữ số
 * 4. Cộng trước, trừ sau, nhân chia cuối
 */

const lessons = [
  // ========== LEVEL 1: LÀM QUEN SOROBAN ==========
  {
    levelId: 1, lessonId: 1, order: 1,
    title: 'Cấu tạo bàn tính Soroban',
    description: 'Hiểu cấu tạo: Hạt Trời (5), Hạt Đất (1), thanh ngang, cột số',
    difficulty: 1, duration: 10, stars: 10,
    content: JSON.stringify({
      theory: [
        'Soroban gồm: Hạt Trời (trên thanh ngang, giá trị 5) và 4 Hạt Đất (dưới thanh ngang, mỗi hạt giá trị 1)',
        'Mỗi cột đại diện một hàng số: đơn vị, chục, trăm...',
        'Hạt được "đếm" khi đẩy về thanh ngang'
      ],
      practice: [
        { type: 'explore', instruction: 'Khám phá bàn tính - click vào các hạt' }
      ]
    })
  },
  {
    levelId: 1, lessonId: 2, order: 2,
    title: 'Biểu diễn số 0-9',
    description: 'Học cách tạo tất cả số từ 0-9 trên một cột',
    difficulty: 1, duration: 15, stars: 15,
    content: JSON.stringify({
      theory: [
        '0: Tất cả hạt ở vị trí nghỉ',
        '1-4: Đẩy 1-4 Hạt Đất lên',
        '5: Đẩy Hạt Trời xuống',
        '6-9: Hạt Trời + (1-4) Hạt Đất'
      ],
      practice: [
        { type: 'create', target: 3 },
        { type: 'create', target: 7 },
        { type: 'create', target: 5 },
        { type: 'create', target: 9 }
      ]
    })
  },
  {
    levelId: 1, lessonId: 3, order: 3,
    title: 'Số 2 chữ số (10-99)',
    description: 'Sử dụng 2 cột để biểu diễn số hàng chục',
    difficulty: 1, duration: 15, stars: 15,
    content: JSON.stringify({
      theory: [
        'Cột phải = Đơn vị, Cột trái = Chục',
        'Ví dụ: 35 = Chục(3) + Đơn vị(5)'
      ],
      practice: [
        { type: 'create', target: 24 },
        { type: 'create', target: 57 },
        { type: 'create', target: 83 }
      ]
    })
  },

  // ========== LEVEL 2: CỘNG ĐƠN GIẢN ==========
  {
    levelId: 2, lessonId: 1, order: 1,
    title: 'Cộng đơn giản (không vượt 5)',
    description: 'Phép cộng chỉ dùng Hạt Đất: 1+1, 1+2, 2+2...',
    difficulty: 1, duration: 15, stars: 15,
    content: JSON.stringify({
      theory: [
        'Khi cộng không vượt quá 4: chỉ cần đẩy thêm Hạt Đất lên',
        'Ví dụ: 2+1 → đẩy thêm 1 hạt'
      ],
      practice: [
        { type: 'calc', problem: '1+2', answer: 3 },
        { type: 'calc', problem: '2+2', answer: 4 },
        { type: 'calc', problem: '1+3', answer: 4 },
        { type: 'calc', problem: '3+1', answer: 4 }
      ]
    })
  },
  {
    levelId: 2, lessonId: 2, order: 2,
    title: 'Cộng với 5 (dùng Hạt Trời)',
    description: 'Học cách cộng khi kết quả từ 5-9',
    difficulty: 2, duration: 20, stars: 20,
    content: JSON.stringify({
      theory: [
        'Khi cộng được ≥5: đẩy Hạt Trời xuống',
        '2+5 = 7: đẩy Hạt Trời xuống, giữ 2 Hạt Đất',
        '3+4 = 7: đẩy Hạt Trời xuống, đẩy 2 Hạt Đất lên'
      ],
      practice: [
        { type: 'calc', problem: '2+5', answer: 7 },
        { type: 'calc', problem: '4+5', answer: 9 },
        { type: 'calc', problem: '3+4', answer: 7 },
        { type: 'calc', problem: '4+4', answer: 8 }
      ]
    })
  },
  {
    levelId: 2, lessonId: 3, order: 3,
    title: '⭐ Bạn nhỏ (Friends of 5)',
    description: 'KỸ THUẬT QUAN TRỌNG: Các cặp số cộng = 5',
    difficulty: 2, duration: 20, stars: 25,
    content: JSON.stringify({
      theory: [
        '🌟 BẠN NHỎ: 1↔4, 2↔3 (hai số cộng lại = 5)',
        'Khi cộng mà Hạt Đất không đủ → dùng Hạt Trời và trừ "bạn nhỏ"',
        'VD: 3+4 → không đủ hạt đất → +5, -1 (vì 4 = 5-1)',
        'VD: 4+3 → +5, -2 (vì 3 = 5-2)'
      ],
      practice: [
        { type: 'calc', problem: '4+1', answer: 5, hint: '+5, -4' },
        { type: 'calc', problem: '4+2', answer: 6, hint: '+5, -3' },
        { type: 'calc', problem: '3+3', answer: 6, hint: '+5, -2' },
        { type: 'calc', problem: '4+3', answer: 7, hint: '+5, -2' },
        { type: 'calc', problem: '4+4', answer: 8, hint: '+5, -1' }
      ]
    })
  },

  // ========== LEVEL 3: TRỪ CƠ BẢN ==========
  {
    levelId: 3, lessonId: 1, order: 1,
    title: 'Trừ đơn giản',
    description: 'Phép trừ chỉ dùng Hạt Đất',
    difficulty: 1, duration: 15, stars: 15,
    content: JSON.stringify({
      theory: [
        'Trừ = đẩy Hạt Đất xuống',
        'VD: 4-2 → đẩy 2 hạt xuống'
      ],
      practice: [
        { type: 'calc', problem: '3-1', answer: 2 },
        { type: 'calc', problem: '4-2', answer: 2 },
        { type: 'calc', problem: '4-3', answer: 1 }
      ]
    })
  },
  {
    levelId: 3, lessonId: 2, order: 2,
    title: 'Trừ với 5 (dùng Hạt Trời)',
    description: 'Trừ khi có Hạt Trời đang hoạt động',
    difficulty: 2, duration: 20, stars: 20,
    content: JSON.stringify({
      theory: [
        'Khi trừ 5: đẩy Hạt Trời lên',
        'VD: 7-5 = 2 → đẩy Hạt Trời lên, giữ 2 Hạt Đất'
      ],
      practice: [
        { type: 'calc', problem: '6-5', answer: 1 },
        { type: 'calc', problem: '8-5', answer: 3 },
        { type: 'calc', problem: '9-5', answer: 4 },
        { type: 'calc', problem: '7-5', answer: 2 }
      ]
    })
  },
  {
    levelId: 3, lessonId: 3, order: 3,
    title: '⭐ Trừ dùng Bạn nhỏ',
    description: 'Áp dụng Bạn nhỏ cho phép trừ',
    difficulty: 2, duration: 20, stars: 25,
    content: JSON.stringify({
      theory: [
        'Khi Hạt Đất không đủ để trừ → dùng Hạt Trời',
        'VD: 6-4 → không đủ hạt đất → -5, +1 (vì 4 = 5-1)',
        'VD: 7-3 → -5, +2 (vì 3 = 5-2)'
      ],
      practice: [
        { type: 'calc', problem: '5-1', answer: 4, hint: '-5, +4' },
        { type: 'calc', problem: '6-2', answer: 4, hint: '-5, +3' },
        { type: 'calc', problem: '7-3', answer: 4, hint: '-5, +2' },
        { type: 'calc', problem: '8-4', answer: 4, hint: '-5, +1' }
      ]
    })
  },

  // ========== LEVEL 4: BẠN LỚN ==========
  {
    levelId: 4, lessonId: 1, order: 1,
    title: '⭐ Bạn lớn (Friends of 10)',
    description: 'KỸ THUẬT CỐT LÕI: Các cặp số cộng = 10',
    difficulty: 3, duration: 25, stars: 30,
    content: JSON.stringify({
      theory: [
        '🌟 BẠN LỚN: 1↔9, 2↔8, 3↔7, 4↔6, 5↔5 (hai số cộng lại = 10)',
        'Đây là kỹ thuật QUAN TRỌNG NHẤT của Soroban!',
        'Dùng khi cộng/trừ có nhớ qua hàng'
      ],
      practice: [
        { type: 'memory', pairs: [[1,9], [2,8], [3,7], [4,6], [5,5]] }
      ]
    })
  },
  {
    levelId: 4, lessonId: 2, order: 2,
    title: 'Cộng có nhớ (dùng Bạn lớn)',
    description: 'Cộng khi tổng ≥10 phải nhớ sang hàng kế',
    difficulty: 3, duration: 25, stars: 30,
    content: JSON.stringify({
      theory: [
        'Khi cộng vượt 9 → nhớ 1 sang cột trái, trừ "bạn lớn" ở cột hiện tại',
        'VD: 8+6 → +1 (cột chục), -4 (cột đơn vị) = 14',
        'Vì 6 = 10-4, nên +10 (nhớ 1), -4 (bạn lớn của 6)'
      ],
      practice: [
        { type: 'calc', problem: '8+3', answer: 11, hint: '+1 chục, -7 (bạn lớn của 3)' },
        { type: 'calc', problem: '7+5', answer: 12, hint: '+1 chục, -5 (bạn lớn của 5)' },
        { type: 'calc', problem: '9+4', answer: 13, hint: '+1 chục, -6 (bạn lớn của 4)' },
        { type: 'calc', problem: '6+7', answer: 13, hint: '+1 chục, -3 (bạn lớn của 7)' }
      ]
    })
  },
  {
    levelId: 4, lessonId: 3, order: 3,
    title: 'Trừ có mượn (dùng Bạn lớn)',
    description: 'Trừ khi số bị trừ nhỏ hơn số trừ',
    difficulty: 3, duration: 25, stars: 30,
    content: JSON.stringify({
      theory: [
        'Khi trừ không đủ → mượn 1 từ cột trái, cộng "bạn lớn" ở cột hiện tại',
        'VD: 12-5 → -1 (cột chục), +5 (bạn lớn của 5) = 7',
        'Vì mượn 10, trừ 5 còn 5, cộng vào 2 = 7'
      ],
      practice: [
        { type: 'calc', problem: '11-3', answer: 8, hint: '-1 chục, +7 (bạn lớn của 3)' },
        { type: 'calc', problem: '13-6', answer: 7, hint: '-1 chục, +4 (bạn lớn của 6)' },
        { type: 'calc', problem: '15-8', answer: 7, hint: '-1 chục, +2 (bạn lớn của 8)' },
        { type: 'calc', problem: '14-9', answer: 5, hint: '-1 chục, +1 (bạn lớn của 9)' }
      ]
    })
  },

  // ========== LEVEL 5: SỐ 2 CHỮ SỐ ==========
  {
    levelId: 5, lessonId: 1, order: 1,
    title: 'Cộng 2 chữ số không nhớ',
    description: 'Cộng từng cột độc lập',
    difficulty: 2, duration: 20, stars: 20,
    content: JSON.stringify({
      theory: [
        'Cộng từ phải sang trái (đơn vị trước)',
        'VD: 23+14 = 37 (3+4=7, 2+1=3)'
      ],
      practice: [
        { type: 'calc', problem: '12+25', answer: 37 },
        { type: 'calc', problem: '34+42', answer: 76 },
        { type: 'calc', problem: '51+36', answer: 87 }
      ]
    })
  },
  {
    levelId: 5, lessonId: 2, order: 2,
    title: 'Cộng 2 chữ số có nhớ',
    description: 'Áp dụng Bạn lớn cho số 2 chữ số',
    difficulty: 3, duration: 25, stars: 30,
    content: JSON.stringify({
      theory: [
        'Khi cột đơn vị vượt 9 → nhớ 1 sang cột chục',
        'VD: 28+15 = 43'
      ],
      practice: [
        { type: 'calc', problem: '17+25', answer: 42 },
        { type: 'calc', problem: '38+47', answer: 85 },
        { type: 'calc', problem: '56+29', answer: 85 }
      ]
    })
  },
  {
    levelId: 5, lessonId: 3, order: 3,
    title: 'Trừ 2 chữ số',
    description: 'Trừ có và không có mượn',
    difficulty: 3, duration: 25, stars: 30,
    content: JSON.stringify({
      theory: [
        'Trừ từ phải sang trái',
        'Mượn khi cần thiết'
      ],
      practice: [
        { type: 'calc', problem: '58-23', answer: 35 },
        { type: 'calc', problem: '72-38', answer: 34 },
        { type: 'calc', problem: '91-47', answer: 44 }
      ]
    })
  },

  // ========== LEVEL 6: SỐ 3 CHỮ SỐ ==========
  {
    levelId: 6, lessonId: 1, order: 1,
    title: 'Số 3 chữ số',
    description: 'Mở rộng lên hàng trăm',
    difficulty: 3, duration: 20, stars: 25,
    content: JSON.stringify({
      theory: [
        'Thêm cột trăm bên trái cột chục',
        'Nguyên tắc tính giống hệt, chỉ thêm cột'
      ],
      practice: [
        { type: 'create', target: 247 },
        { type: 'create', target: 589 },
        { type: 'calc', problem: '123+456', answer: 579 },
        { type: 'calc', problem: '345+287', answer: 632 }
      ]
    })
  },
  {
    levelId: 6, lessonId: 2, order: 2,
    title: 'Cộng trừ hỗn hợp 3 chữ số',
    description: 'Thành thạo cộng trừ số lớn',
    difficulty: 4, duration: 30, stars: 35,
    content: JSON.stringify({
      practice: [
        { type: 'calc', problem: '234+189', answer: 423 },
        { type: 'calc', problem: '567-289', answer: 278 },
        { type: 'calc', problem: '403+298', answer: 701 },
        { type: 'calc', problem: '800-356', answer: 444 }
      ]
    })
  },

  // ========== LEVEL 7: NHÂN CƠ BẢN ==========
  {
    levelId: 7, lessonId: 1, order: 1,
    title: 'Nhân với số 1 chữ số',
    description: 'Nhân bằng cách cộng lặp lại',
    difficulty: 4, duration: 30, stars: 35,
    content: JSON.stringify({
      theory: [
        'Nhân = cộng nhiều lần',
        '3×4 = 3+3+3+3 = 12',
        'Trên Soroban: tính từ trái sang phải'
      ],
      practice: [
        { type: 'calc', problem: '12×3', answer: 36 },
        { type: 'calc', problem: '24×2', answer: 48 },
        { type: 'calc', problem: '15×4', answer: 60 }
      ]
    })
  },
  {
    levelId: 7, lessonId: 2, order: 2,
    title: 'Nhân 2 chữ số × 1 chữ số',
    description: 'Phương pháp nhân chuẩn',
    difficulty: 4, duration: 35, stars: 40,
    content: JSON.stringify({
      theory: [
        'Nhân từng chữ số của số bị nhân với số nhân',
        '23×4 = (20×4) + (3×4) = 80 + 12 = 92'
      ],
      practice: [
        { type: 'calc', problem: '23×4', answer: 92 },
        { type: 'calc', problem: '45×3', answer: 135 },
        { type: 'calc', problem: '67×5', answer: 335 }
      ]
    })
  },

  // ========== LEVEL 8: CHIA CƠ BẢN ==========
  {
    levelId: 8, lessonId: 1, order: 1,
    title: 'Chia cho số 1 chữ số',
    description: 'Phép chia đơn giản',
    difficulty: 4, duration: 30, stars: 35,
    content: JSON.stringify({
      theory: [
        'Chia = tìm số lần trừ',
        '12÷4 = ? → 12-4-4-4 = 0 → kết quả 3',
        'Trên Soroban: ước lượng và điều chỉnh'
      ],
      practice: [
        { type: 'calc', problem: '24÷6', answer: 4 },
        { type: 'calc', problem: '35÷7', answer: 5 },
        { type: 'calc', problem: '48÷8', answer: 6 }
      ]
    })
  },
  {
    levelId: 8, lessonId: 2, order: 2,
    title: 'Chia 2 chữ số cho 1 chữ số',
    description: 'Chia số lớn hơn',
    difficulty: 5, duration: 35, stars: 40,
    content: JSON.stringify({
      theory: [
        'Chia từ trái sang phải',
        '84÷4: 8÷4=2 (hàng chục), 4÷4=1 (hàng đơn vị) → 21'
      ],
      practice: [
        { type: 'calc', problem: '63÷3', answer: 21 },
        { type: 'calc', problem: '96÷4', answer: 24 },
        { type: 'calc', problem: '85÷5', answer: 17 }
      ]
    })
  },

  // ========== LEVEL 9: NÂNG CAO ==========
  {
    levelId: 9, lessonId: 1, order: 1,
    title: 'Tính nhẩm (Anzan)',
    description: 'Tính trong đầu bằng hình ảnh Soroban',
    difficulty: 5, duration: 30, stars: 50,
    content: JSON.stringify({
      theory: [
        'Anzan = tính nhẩm bằng cách tưởng tượng Soroban trong đầu',
        'Đây là mục tiêu cao nhất của việc học Soroban',
        'Bắt đầu với số đơn giản, dần dần nâng độ khó'
      ],
      practice: [
        { type: 'mental', problem: '5+3', answer: 8, timeLimit: 3 },
        { type: 'mental', problem: '12+7', answer: 19, timeLimit: 5 },
        { type: 'mental', problem: '23+18', answer: 41, timeLimit: 8 }
      ]
    })
  },
  {
    levelId: 9, lessonId: 2, order: 2,
    title: 'Chuỗi phép tính',
    description: 'Tính nhiều phép tính liên tiếp',
    difficulty: 5, duration: 35, stars: 50,
    content: JSON.stringify({
      theory: [
        'Tính liên tục không reset bàn tính',
        'Rèn luyện tốc độ và độ chính xác'
      ],
      practice: [
        { type: 'chain', problems: ['15+23', '-12', '+8'], answer: 34 },
        { type: 'chain', problems: ['50-18', '+25', '-17'], answer: 40 }
      ]
    })
  },

  // ========== LEVEL 10: CHUYÊN GIA ==========
  {
    levelId: 10, lessonId: 1, order: 1,
    title: 'Thi đấu tốc độ',
    description: 'Luyện tập với giới hạn thời gian',
    difficulty: 5, duration: 30, stars: 60,
    content: JSON.stringify({
      theory: [
        'Mục tiêu: Chính xác + Nhanh',
        'Các kỳ thi Soroban đo bằng số bài đúng trong thời gian giới hạn'
      ],
      practice: [
        { type: 'speed', count: 10, difficulty: 'medium', timeLimit: 60 }
      ]
    })
  },
  {
    levelId: 10, lessonId: 2, order: 2,
    title: 'Chứng chỉ Soroban',
    description: 'Kiểm tra tổng hợp - Cấp độ 10 Kyū',
    difficulty: 5, duration: 45, stars: 100,
    content: JSON.stringify({
      theory: [
        'Hệ thống cấp độ Soroban Nhật Bản: 10 Kyū (thấp nhất) → 1 Kyū → 1 Dan (cao nhất)',
        'Bài thi này tương đương cấp 10 Kyū'
      ],
      practice: [
        { type: 'exam', sections: [
          { name: 'Cộng trừ', count: 10, digits: 2 },
          { name: 'Nhân', count: 5, type: '2x1' },
          { name: 'Chia', count: 5, type: '2÷1' }
        ], timeLimit: 420 }
      ]
    })
  }
];

// Tên các level
const levelNames = [
  { id: 1, name: 'Làm quen Soroban', description: 'Cấu tạo và biểu diễn số' },
  { id: 2, name: 'Cộng cơ bản', description: 'Cộng đơn giản và Bạn nhỏ' },
  { id: 3, name: 'Trừ cơ bản', description: 'Trừ đơn giản và Bạn nhỏ' },
  { id: 4, name: 'Bạn lớn', description: 'Kỹ thuật cốt lõi - có nhớ/mượn' },
  { id: 5, name: 'Số 2 chữ số', description: 'Cộng trừ số hàng chục' },
  { id: 6, name: 'Số 3 chữ số', description: 'Cộng trừ số hàng trăm' },
  { id: 7, name: 'Nhân cơ bản', description: 'Phép nhân trên Soroban' },
  { id: 8, name: 'Chia cơ bản', description: 'Phép chia trên Soroban' },
  { id: 9, name: 'Nâng cao', description: 'Anzan và chuỗi phép tính' },
  { id: 10, name: 'Chuyên gia', description: 'Thi đấu và chứng chỉ' }
];

async function seedLessons() {
  console.log('🌱 Đang seed bài học Soroban v2...\n');

  // Xóa lessons cũ
  await prisma.lesson.deleteMany({});
  console.log('🗑️ Đã xóa lessons cũ\n');

  // Thêm lessons mới
  for (const lesson of lessons) {
    await prisma.lesson.create({ data: lesson });
    console.log(`✅ Level ${lesson.levelId}.${lesson.lessonId}: ${lesson.title}`);
  }

  console.log('\n📊 TỔNG KẾT:');
  console.log(`   - Tổng số bài học: ${lessons.length}`);
  console.log(`   - Số level: ${levelNames.length}`);
  console.log('\n📚 CẤU TRÚC LEVEL:');
  levelNames.forEach(l => {
    const count = lessons.filter(ls => ls.levelId === l.id).length;
    console.log(`   Level ${l.id}: ${l.name} (${count} bài) - ${l.description}`);
  });

  console.log('\n✨ Seed hoàn tất!');
}

seedLessons()
  .catch((e) => {
    console.error('❌ Lỗi:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
