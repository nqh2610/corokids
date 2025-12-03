const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Level 11-15: Nhân, Chia, Tính nhẩm 1
const lessons = [
  // ===== LEVEL 11: NHÂN CƠ BẢN =====
  {
    levelId: 11, lessonId: 1, order: 1,
    title: '✖️ Khái niệm nhân',
    description: 'Hiểu phép nhân và cách nhân trên Soroban',
    content: JSON.stringify({
      theory: [
        '✖️ **PHÉP NHÂN LÀ GÌ?**',
        '',
        '🔹 Phép nhân là cộng liên tiếp:',
        '   3 × 4 = 4 + 4 + 4 = 12',
        '   5 × 3 = 3 + 3 + 3 + 3 + 3 = 15',
        '',
        '📐 **TRÊN SOROBAN:**',
        '   - Số bị nhân: đặt bên TRÁI',
        '   - Số nhân: đặt bên PHẢI hoặc nhớ',
        '   - Kết quả: tính dần từng bước',
        '',
        '💡 **VÍ DỤ: 3 × 2**',
        '   Bước 1: Cộng 3 lần đầu → 3',
        '   Bước 2: Cộng 3 lần thứ 2 → 6',
        '   ✅ Kết quả: 6',
        '',
        '🌟 **NHỚ BẢNG CỬU CHƯƠNG:**',
        '   2×1=2, 2×2=4, 2×3=6, 2×4=8, 2×5=10'
      ],
      practice: [
        { numbers: [2, 3], operation: '*', answer: 6 },
        { numbers: [3, 2], operation: '*', answer: 6 },
        { numbers: [2, 4], operation: '*', answer: 8 },
        { numbers: [4, 2], operation: '*', answer: 8 },
        { numbers: [2, 5], operation: '*', answer: 10 },
        { numbers: [5, 2], operation: '*', answer: 10 },
        { numbers: [3, 3], operation: '*', answer: 9 },
        { numbers: [2, 6], operation: '*', answer: 12 },
        { numbers: [3, 4], operation: '*', answer: 12 },
        { numbers: [4, 3], operation: '*', answer: 12 },
        { numbers: [2, 7], operation: '*', answer: 14 },
        { numbers: [2, 8], operation: '*', answer: 16 },
        { numbers: [2, 9], operation: '*', answer: 18 },
        { numbers: [3, 5], operation: '*', answer: 15 },
        { numbers: [5, 3], operation: '*', answer: 15 }
      ]
    })
  },
  {
    levelId: 11, lessonId: 2, order: 2,
    title: '✖️ Nhân với số 2, 3, 4',
    description: 'Luyện nhân với các số nhỏ',
    content: JSON.stringify({
      theory: [
        '📊 **BẢNG NHÂN 2, 3, 4**',
        '',
        '🔢 **NHÂN 2:** 2×1=2, 2×2=4, 2×3=6, 2×4=8, 2×5=10',
        '   2×6=12, 2×7=14, 2×8=16, 2×9=18',
        '',
        '🔢 **NHÂN 3:** 3×1=3, 3×2=6, 3×3=9, 3×4=12, 3×5=15',
        '   3×6=18, 3×7=21, 3×8=24, 3×9=27',
        '',
        '🔢 **NHÂN 4:** 4×1=4, 4×2=8, 4×3=12, 4×4=16, 4×5=20',
        '   4×6=24, 4×7=28, 4×8=32, 4×9=36',
        '',
        '💡 **MẸO:**',
        '   - Nhân 2 = gấp đôi',
        '   - Nhân 4 = nhân 2 hai lần',
        '   - 3×4 = 4×3 (giao hoán)'
      ],
      practice: [
        { numbers: [2, 6], operation: '*', answer: 12 },
        { numbers: [3, 6], operation: '*', answer: 18 },
        { numbers: [4, 5], operation: '*', answer: 20 },
        { numbers: [2, 9], operation: '*', answer: 18 },
        { numbers: [3, 7], operation: '*', answer: 21 },
        { numbers: [4, 6], operation: '*', answer: 24 },
        { numbers: [3, 8], operation: '*', answer: 24 },
        { numbers: [4, 7], operation: '*', answer: 28 },
        { numbers: [2, 8], operation: '*', answer: 16 },
        { numbers: [3, 9], operation: '*', answer: 27 },
        { numbers: [4, 8], operation: '*', answer: 32 },
        { numbers: [4, 9], operation: '*', answer: 36 },
        { numbers: [3, 3], operation: '*', answer: 9 },
        { numbers: [4, 4], operation: '*', answer: 16 },
        { numbers: [2, 2], operation: '*', answer: 4 }
      ]
    })
  },
  {
    levelId: 11, lessonId: 3, order: 3,
    title: '✖️ Nhân với số 5, 6, 7',
    description: 'Nhân với các số lớn hơn',
    content: JSON.stringify({
      theory: [
        '📊 **BẢNG NHÂN 5, 6, 7**',
        '',
        '🔢 **NHÂN 5:** 5×1=5, 5×2=10, 5×3=15, 5×4=20, 5×5=25',
        '   5×6=30, 5×7=35, 5×8=40, 5×9=45',
        '',
        '🔢 **NHÂN 6:** 6×1=6, 6×2=12, 6×3=18, 6×4=24, 6×5=30',
        '   6×6=36, 6×7=42, 6×8=48, 6×9=54',
        '',
        '🔢 **NHÂN 7:** 7×1=7, 7×2=14, 7×3=21, 7×4=28, 7×5=35',
        '   7×6=42, 7×7=49, 7×8=56, 7×9=63',
        '',
        '💡 **MẸO:**',
        '   - Nhân 5: kết quả luôn tận cùng 0 hoặc 5',
        '   - 6×7 = 7×6 = 42'
      ],
      practice: [
        { numbers: [5, 6], operation: '*', answer: 30 },
        { numbers: [6, 5], operation: '*', answer: 30 },
        { numbers: [5, 7], operation: '*', answer: 35 },
        { numbers: [7, 5], operation: '*', answer: 35 },
        { numbers: [5, 8], operation: '*', answer: 40 },
        { numbers: [6, 6], operation: '*', answer: 36 },
        { numbers: [6, 7], operation: '*', answer: 42 },
        { numbers: [7, 6], operation: '*', answer: 42 },
        { numbers: [5, 9], operation: '*', answer: 45 },
        { numbers: [6, 8], operation: '*', answer: 48 },
        { numbers: [7, 7], operation: '*', answer: 49 },
        { numbers: [6, 9], operation: '*', answer: 54 },
        { numbers: [7, 8], operation: '*', answer: 56 },
        { numbers: [7, 9], operation: '*', answer: 63 },
        { numbers: [5, 5], operation: '*', answer: 25 }
      ]
    })
  },

  // ===== LEVEL 12: NHÂN NÂNG CAO =====
  {
    levelId: 12, lessonId: 1, order: 1,
    title: '✖️ Nhân với số 8, 9',
    description: 'Hoàn thành bảng cửu chương',
    content: JSON.stringify({
      theory: [
        '📊 **BẢNG NHÂN 8, 9**',
        '',
        '🔢 **NHÂN 8:** 8×1=8, 8×2=16, 8×3=24, 8×4=32, 8×5=40',
        '   8×6=48, 8×7=56, 8×8=64, 8×9=72',
        '',
        '🔢 **NHÂN 9:** 9×1=9, 9×2=18, 9×3=27, 9×4=36, 9×5=45',
        '   9×6=54, 9×7=63, 9×8=72, 9×9=81',
        '',
        '💡 **MẸO NHÂN 9:**',
        '   9×n: hàng chục = n-1, hàng đơn vị = 10-n',
        '   9×7: 7-1=6, 10-7=3 → 63 ✅',
        '',
        '🎯 **MẸO NHÂN 8:**',
        '   8×n = 10×n - 2×n',
        '   8×7 = 70 - 14 = 56'
      ],
      practice: [
        { numbers: [8, 6], operation: '*', answer: 48 },
        { numbers: [8, 7], operation: '*', answer: 56 },
        { numbers: [8, 8], operation: '*', answer: 64 },
        { numbers: [8, 9], operation: '*', answer: 72 },
        { numbers: [9, 6], operation: '*', answer: 54 },
        { numbers: [9, 7], operation: '*', answer: 63 },
        { numbers: [9, 8], operation: '*', answer: 72 },
        { numbers: [9, 9], operation: '*', answer: 81 },
        { numbers: [8, 3], operation: '*', answer: 24 },
        { numbers: [8, 4], operation: '*', answer: 32 },
        { numbers: [8, 5], operation: '*', answer: 40 },
        { numbers: [9, 3], operation: '*', answer: 27 },
        { numbers: [9, 4], operation: '*', answer: 36 },
        { numbers: [9, 5], operation: '*', answer: 45 },
        { numbers: [8, 2], operation: '*', answer: 16 }
      ]
    })
  },
  {
    levelId: 12, lessonId: 2, order: 2,
    title: '✖️ Nhân số 2 chữ số',
    description: 'Nhân số lớn với 1 chữ số',
    content: JSON.stringify({
      theory: [
        '📝 **NHÂN SỐ 2 CHỮ SỐ VỚI 1 CHỮ SỐ**',
        '',
        '🔹 **CÁCH LÀM:**',
        '   1. Nhân hàng đơn vị trước',
        '   2. Nhân hàng chục sau',
        '   3. Cộng kết quả (có nhớ nếu cần)',
        '',
        '💡 **VÍ DỤ: 23 × 4**',
        '   Bước 1: 3 × 4 = 12 (viết 2, nhớ 1)',
        '   Bước 2: 2 × 4 = 8, + 1 = 9',
        '   ✅ Kết quả: 92',
        '',
        '🎯 **TRÊN SOROBAN:**',
        '   - Đặt 23 ở cột trái',
        '   - Nhân từ phải qua trái',
        '   - Ghi kết quả sang cột phải'
      ],
      practice: [
        { numbers: [12, 3], operation: '*', answer: 36 },
        { numbers: [13, 4], operation: '*', answer: 52 },
        { numbers: [14, 5], operation: '*', answer: 70 },
        { numbers: [15, 6], operation: '*', answer: 90 },
        { numbers: [21, 4], operation: '*', answer: 84 },
        { numbers: [22, 3], operation: '*', answer: 66 },
        { numbers: [23, 4], operation: '*', answer: 92 },
        { numbers: [24, 5], operation: '*', answer: 120 },
        { numbers: [11, 7], operation: '*', answer: 77 },
        { numbers: [11, 8], operation: '*', answer: 88 },
        { numbers: [11, 9], operation: '*', answer: 99 },
        { numbers: [12, 5], operation: '*', answer: 60 },
        { numbers: [13, 6], operation: '*', answer: 78 },
        { numbers: [25, 4], operation: '*', answer: 100 },
        { numbers: [16, 5], operation: '*', answer: 80 }
      ]
    })
  },
  {
    levelId: 12, lessonId: 3, order: 3,
    title: '✖️ Luyện tập nhân',
    description: 'Tổng hợp các phép nhân',
    content: JSON.stringify({
      theory: [
        '🏋️ **LUYỆN TẬP TỔNG HỢP NHÂN**',
        '',
        '📋 **ÔN LẠI:**',
        '✅ Bảng cửu chương 2-9',
        '✅ Nhân số 2 chữ số với 1 chữ số',
        '✅ Tính có nhớ',
        '',
        '💡 **MẸO TÍNH NHANH:**',
        '   🔹 Nhân 11: 11×n = n0 + n → 11×7 = 77',
        '   🔹 Nhân 5: chia 2, nhân 10 → 18×5 = 90',
        '   🔹 Nhân 9: nhân 10, trừ đi → 15×9 = 135'
      ],
      practice: [
        { numbers: [7, 8], operation: '*', answer: 56 },
        { numbers: [9, 6], operation: '*', answer: 54 },
        { numbers: [8, 9], operation: '*', answer: 72 },
        { numbers: [11, 6], operation: '*', answer: 66 },
        { numbers: [12, 7], operation: '*', answer: 84 },
        { numbers: [13, 5], operation: '*', answer: 65 },
        { numbers: [14, 4], operation: '*', answer: 56 },
        { numbers: [15, 3], operation: '*', answer: 45 },
        { numbers: [16, 4], operation: '*', answer: 64 },
        { numbers: [17, 5], operation: '*', answer: 85 },
        { numbers: [18, 3], operation: '*', answer: 54 },
        { numbers: [19, 4], operation: '*', answer: 76 },
        { numbers: [21, 3], operation: '*', answer: 63 },
        { numbers: [22, 4], operation: '*', answer: 88 },
        { numbers: [25, 3], operation: '*', answer: 75 }
      ]
    })
  },

  // ===== LEVEL 13: CHIA CƠ BẢN =====
  {
    levelId: 13, lessonId: 1, order: 1,
    title: '➗ Khái niệm phép chia',
    description: 'Hiểu phép chia và chia hết',
    content: JSON.stringify({
      theory: [
        '➗ **PHÉP CHIA LÀ GÌ?**',
        '',
        '🔹 Chia là phép ngược của nhân:',
        '   6 ÷ 2 = 3 (vì 2 × 3 = 6)',
        '   12 ÷ 3 = 4 (vì 3 × 4 = 12)',
        '',
        '📐 **THUẬT NGỮ:**',
        '   12 ÷ 3 = 4',
        '   - 12: số bị chia',
        '   - 3: số chia',
        '   - 4: thương',
        '',
        '💡 **TRÊN SOROBAN:**',
        '   - Đặt số bị chia ở TRÁI',
        '   - Số chia: nhớ trong đầu',
        '   - Thương: ghi dần từ trái'
      ],
      practice: [
        { numbers: [6, 2], operation: '/', answer: 3 },
        { numbers: [6, 3], operation: '/', answer: 2 },
        { numbers: [8, 2], operation: '/', answer: 4 },
        { numbers: [8, 4], operation: '/', answer: 2 },
        { numbers: [9, 3], operation: '/', answer: 3 },
        { numbers: [10, 2], operation: '/', answer: 5 },
        { numbers: [10, 5], operation: '/', answer: 2 },
        { numbers: [12, 2], operation: '/', answer: 6 },
        { numbers: [12, 3], operation: '/', answer: 4 },
        { numbers: [12, 4], operation: '/', answer: 3 },
        { numbers: [12, 6], operation: '/', answer: 2 },
        { numbers: [15, 3], operation: '/', answer: 5 },
        { numbers: [15, 5], operation: '/', answer: 3 },
        { numbers: [16, 2], operation: '/', answer: 8 },
        { numbers: [16, 4], operation: '/', answer: 4 }
      ]
    })
  },
  {
    levelId: 13, lessonId: 2, order: 2,
    title: '➗ Chia cho 2, 3, 4',
    description: 'Luyện chia với số nhỏ',
    content: JSON.stringify({
      theory: [
        '📊 **BẢNG CHIA 2, 3, 4**',
        '',
        '🔢 **CHIA 2:** 2÷2=1, 4÷2=2, 6÷2=3, 8÷2=4, 10÷2=5',
        '   12÷2=6, 14÷2=7, 16÷2=8, 18÷2=9',
        '',
        '🔢 **CHIA 3:** 3÷3=1, 6÷3=2, 9÷3=3, 12÷3=4, 15÷3=5',
        '   18÷3=6, 21÷3=7, 24÷3=8, 27÷3=9',
        '',
        '🔢 **CHIA 4:** 4÷4=1, 8÷4=2, 12÷4=3, 16÷4=4, 20÷4=5',
        '   24÷4=6, 28÷4=7, 32÷4=8, 36÷4=9',
        '',
        '💡 **MẸO:**',
        '   - Chia 2 = lấy một nửa',
        '   - Chia 4 = chia 2 hai lần'
      ],
      practice: [
        { numbers: [18, 2], operation: '/', answer: 9 },
        { numbers: [21, 3], operation: '/', answer: 7 },
        { numbers: [24, 4], operation: '/', answer: 6 },
        { numbers: [14, 2], operation: '/', answer: 7 },
        { numbers: [24, 3], operation: '/', answer: 8 },
        { numbers: [28, 4], operation: '/', answer: 7 },
        { numbers: [20, 2], operation: '/', answer: 10 },
        { numbers: [27, 3], operation: '/', answer: 9 },
        { numbers: [32, 4], operation: '/', answer: 8 },
        { numbers: [22, 2], operation: '/', answer: 11 },
        { numbers: [30, 3], operation: '/', answer: 10 },
        { numbers: [36, 4], operation: '/', answer: 9 },
        { numbers: [24, 2], operation: '/', answer: 12 },
        { numbers: [33, 3], operation: '/', answer: 11 },
        { numbers: [40, 4], operation: '/', answer: 10 }
      ]
    })
  },
  {
    levelId: 13, lessonId: 3, order: 3,
    title: '➗ Chia cho 5, 6, 7',
    description: 'Chia với số lớn hơn',
    content: JSON.stringify({
      theory: [
        '📊 **BẢNG CHIA 5, 6, 7**',
        '',
        '🔢 **CHIA 5:** 5÷5=1, 10÷5=2, 15÷5=3, 20÷5=4, 25÷5=5',
        '   30÷5=6, 35÷5=7, 40÷5=8, 45÷5=9',
        '',
        '🔢 **CHIA 6:** 6÷6=1, 12÷6=2, 18÷6=3, 24÷6=4, 30÷6=5',
        '   36÷6=6, 42÷6=7, 48÷6=8, 54÷6=9',
        '',
        '🔢 **CHIA 7:** 7÷7=1, 14÷7=2, 21÷7=3, 28÷7=4, 35÷7=5',
        '   42÷7=6, 49÷7=7, 56÷7=8, 63÷7=9',
        '',
        '💡 **MẸO CHIA 5:**',
        '   - Số chia hết cho 5: tận cùng 0 hoặc 5'
      ],
      practice: [
        { numbers: [25, 5], operation: '/', answer: 5 },
        { numbers: [30, 6], operation: '/', answer: 5 },
        { numbers: [35, 7], operation: '/', answer: 5 },
        { numbers: [35, 5], operation: '/', answer: 7 },
        { numbers: [36, 6], operation: '/', answer: 6 },
        { numbers: [42, 7], operation: '/', answer: 6 },
        { numbers: [40, 5], operation: '/', answer: 8 },
        { numbers: [42, 6], operation: '/', answer: 7 },
        { numbers: [49, 7], operation: '/', answer: 7 },
        { numbers: [45, 5], operation: '/', answer: 9 },
        { numbers: [48, 6], operation: '/', answer: 8 },
        { numbers: [56, 7], operation: '/', answer: 8 },
        { numbers: [50, 5], operation: '/', answer: 10 },
        { numbers: [54, 6], operation: '/', answer: 9 },
        { numbers: [63, 7], operation: '/', answer: 9 }
      ]
    })
  },

  // ===== LEVEL 14: CHIA NÂNG CAO =====
  {
    levelId: 14, lessonId: 1, order: 1,
    title: '➗ Chia cho 8, 9',
    description: 'Hoàn thành bảng chia',
    content: JSON.stringify({
      theory: [
        '📊 **BẢNG CHIA 8, 9**',
        '',
        '🔢 **CHIA 8:** 8÷8=1, 16÷8=2, 24÷8=3, 32÷8=4, 40÷8=5',
        '   48÷8=6, 56÷8=7, 64÷8=8, 72÷8=9',
        '',
        '🔢 **CHIA 9:** 9÷9=1, 18÷9=2, 27÷9=3, 36÷9=4, 45÷9=5',
        '   54÷9=6, 63÷9=7, 72÷9=8, 81÷9=9',
        '',
        '💡 **MẸO:**',
        '   - Chia 8: nhớ bảng nhân 8 ngược lại',
        '   - Chia 9: tổng chữ số chia hết cho 9',
        '',
        '🎯 **VÍ DỤ:** 72 chia được cho cả 8 và 9!'
      ],
      practice: [
        { numbers: [24, 8], operation: '/', answer: 3 },
        { numbers: [27, 9], operation: '/', answer: 3 },
        { numbers: [32, 8], operation: '/', answer: 4 },
        { numbers: [36, 9], operation: '/', answer: 4 },
        { numbers: [40, 8], operation: '/', answer: 5 },
        { numbers: [45, 9], operation: '/', answer: 5 },
        { numbers: [48, 8], operation: '/', answer: 6 },
        { numbers: [54, 9], operation: '/', answer: 6 },
        { numbers: [56, 8], operation: '/', answer: 7 },
        { numbers: [63, 9], operation: '/', answer: 7 },
        { numbers: [64, 8], operation: '/', answer: 8 },
        { numbers: [72, 9], operation: '/', answer: 8 },
        { numbers: [72, 8], operation: '/', answer: 9 },
        { numbers: [81, 9], operation: '/', answer: 9 },
        { numbers: [80, 8], operation: '/', answer: 10 }
      ]
    })
  },
  {
    levelId: 14, lessonId: 2, order: 2,
    title: '➗ Chia số 2 chữ số',
    description: 'Chia số lớn với 1 chữ số',
    content: JSON.stringify({
      theory: [
        '📝 **CHIA SỐ 2 CHỮ SỐ CHO 1 CHỮ SỐ**',
        '',
        '🔹 **CÁCH LÀM:**',
        '   1. Chia hàng chục trước',
        '   2. Lấy dư, gộp với hàng đơn vị',
        '   3. Tiếp tục chia',
        '',
        '💡 **VÍ DỤ: 84 ÷ 4**',
        '   Bước 1: 8 ÷ 4 = 2',
        '   Bước 2: 4 ÷ 4 = 1',
        '   ✅ Kết quả: 21',
        '',
        '🎯 **KIỂM TRA:** Thương × Số chia = Số bị chia'
      ],
      practice: [
        { numbers: [42, 2], operation: '/', answer: 21 },
        { numbers: [63, 3], operation: '/', answer: 21 },
        { numbers: [84, 4], operation: '/', answer: 21 },
        { numbers: [55, 5], operation: '/', answer: 11 },
        { numbers: [66, 6], operation: '/', answer: 11 },
        { numbers: [77, 7], operation: '/', answer: 11 },
        { numbers: [48, 2], operation: '/', answer: 24 },
        { numbers: [69, 3], operation: '/', answer: 23 },
        { numbers: [96, 4], operation: '/', answer: 24 },
        { numbers: [75, 5], operation: '/', answer: 15 },
        { numbers: [78, 6], operation: '/', answer: 13 },
        { numbers: [91, 7], operation: '/', answer: 13 },
        { numbers: [88, 8], operation: '/', answer: 11 },
        { numbers: [99, 9], operation: '/', answer: 11 },
        { numbers: [96, 8], operation: '/', answer: 12 }
      ]
    })
  },
  {
    levelId: 14, lessonId: 3, order: 3,
    title: '➗ Luyện tập chia',
    description: 'Tổng hợp các phép chia',
    content: JSON.stringify({
      theory: [
        '🏋️ **LUYỆN TẬP TỔNG HỢP CHIA**',
        '',
        '📋 **ÔN LẠI:**',
        '✅ Bảng chia 2-9',
        '✅ Chia số 2 chữ số cho 1 chữ số',
        '✅ Mối quan hệ nhân - chia',
        '',
        '💡 **MẸO TÍNH NHANH:**',
        '   🔹 Chia 5: nhân 2, chia 10',
        '   🔹 Chia 9: dùng quy tắc tổng chữ số',
        '',
        '🎯 **KIỂM TRA:** Luôn nhân lại để kiểm tra!'
      ],
      practice: [
        { numbers: [56, 7], operation: '/', answer: 8 },
        { numbers: [72, 8], operation: '/', answer: 9 },
        { numbers: [81, 9], operation: '/', answer: 9 },
        { numbers: [48, 4], operation: '/', answer: 12 },
        { numbers: [65, 5], operation: '/', answer: 13 },
        { numbers: [72, 6], operation: '/', answer: 12 },
        { numbers: [84, 7], operation: '/', answer: 12 },
        { numbers: [96, 8], operation: '/', answer: 12 },
        { numbers: [90, 9], operation: '/', answer: 10 },
        { numbers: [52, 4], operation: '/', answer: 13 },
        { numbers: [70, 5], operation: '/', answer: 14 },
        { numbers: [84, 6], operation: '/', answer: 14 },
        { numbers: [98, 7], operation: '/', answer: 14 },
        { numbers: [88, 8], operation: '/', answer: 11 },
        { numbers: [108, 9], operation: '/', answer: 12 }
      ]
    })
  },

  // ===== LEVEL 15: TÍNH NHẨM 1 - BẮT ĐẦU ANZAN =====
  {
    levelId: 15, lessonId: 1, order: 1,
    title: '🧠 Giới thiệu Anzan',
    description: 'Bắt đầu tập tính nhẩm với Soroban ảo',
    content: JSON.stringify({
      theory: [
        '🧠 **ANZAN LÀ GÌ?**',
        '',
        '✨ Anzan (暗算) = Tính toán trong đầu',
        '   - "An" (暗) = tối, ẩn',
        '   - "Zan" (算) = tính toán',
        '',
        '🎯 **SOROBAN ẢO:**',
        'Thay vì dùng Soroban thật, bạn sẽ TƯỞNG TƯỢNG',
        'một chiếc Soroban trong đầu và di chuyển các',
        'hạt trong tưởng tượng!',
        '',
        '📐 **CÁCH HÌNH DUNG SOROBAN ẢO:**',
        '',
        '1️⃣ **Nhắm mắt lại** (hoặc nhìn vào khoảng trống)',
        '',
        '2️⃣ **Tưởng tượng khung Soroban:**',
        '   - Thanh ngang ở giữa',
        '   - 5 hạt mỗi cột (1 trên, 4 dưới)',
        '   - Bắt đầu với hình ảnh số 0',
        '',
        '3️⃣ **Hình dung RÕ RÀNG:**',
        '   - Màu sắc hạt (đen/nâu)',
        '   - Thanh gỗ vàng',
        '   - Vị trí từng hạt',
        '',
        '💡 **BÀI TẬP TẬP TRUNG:**',
        '   - Nhắm mắt 10 giây',
        '   - Hình dung Soroban trống',
        '   - Giữ hình ảnh ổn định'
      ],
      practice: [
        { type: 'mental', problem: '1 + 1', answer: 2, timeLimit: 15 },
        { type: 'mental', problem: '2 + 1', answer: 3, timeLimit: 15 },
        { type: 'mental', problem: '1 + 2', answer: 3, timeLimit: 15 },
        { type: 'mental', problem: '2 + 2', answer: 4, timeLimit: 15 },
        { type: 'mental', problem: '3 + 1', answer: 4, timeLimit: 15 },
        { type: 'mental', problem: '1 + 3', answer: 4, timeLimit: 15 },
        { type: 'mental', problem: '2 + 3', answer: 5, timeLimit: 15 },
        { type: 'mental', problem: '3 + 2', answer: 5, timeLimit: 15 },
        { type: 'mental', problem: '4 + 1', answer: 5, timeLimit: 15 },
        { type: 'mental', problem: '3 + 3', answer: 6, timeLimit: 15 },
        { type: 'mental', problem: '4 + 2', answer: 6, timeLimit: 15 },
        { type: 'mental', problem: '5 + 1', answer: 6, timeLimit: 15 },
        { type: 'mental', problem: '3 + 4', answer: 7, timeLimit: 15 },
        { type: 'mental', problem: '4 + 3', answer: 7, timeLimit: 15 },
        { type: 'mental', problem: '4 + 4', answer: 8, timeLimit: 15 }
      ]
    })
  },
  {
    levelId: 15, lessonId: 2, order: 2,
    title: '🧠 Tưởng tượng số 1-9',
    description: 'Hình dung các số trên Soroban ảo',
    content: JSON.stringify({
      theory: [
        '🖼️ **HÌNH DUNG SỐ 0-9 TRONG ĐẦU**',
        '',
        '🔹 **SỐ 0:** Tất cả hạt xa thanh ngang (tối)',
        '   Hình dung: 🟤 / 🟤🟤🟤🟤',
        '',
        '🔹 **SỐ 1-4:** Chỉ có hạt dưới gần thanh (sáng)',
        '   1: 🟤 / 🟡🟤🟤🟤',
        '   2: 🟤 / 🟡🟡🟤🟤',
        '   3: 🟤 / 🟡🟡🟡🟤',
        '   4: 🟤 / 🟡🟡🟡🟡',
        '',
        '🔹 **SỐ 5:** Chỉ có hạt trên gần thanh (sáng)',
        '   5: 🟡 / 🟤🟤🟤🟤',
        '',
        '🔹 **SỐ 6-9:** Cả hạt trên và hạt dưới gần thanh',
        '   6: 🟡 / 🟡🟤🟤🟤',
        '   7: 🟡 / 🟡🟡🟤🟤',
        '   8: 🟡 / 🟡🟡🟡🟤',
        '   9: 🟡 / 🟡🟡🟡🟡',
        '',
        '🎯 **BÀI TẬP:**',
        '1. Nhắm mắt, hình dung số 0',
        '2. "Gạt" hạt để tạo số 1, 2, 3...',
        '3. Luyện đến khi thấy rõ ràng'
      ],
      practice: [
        { type: 'mental', problem: '5 + 1', answer: 6, timeLimit: 12 },
        { type: 'mental', problem: '5 + 2', answer: 7, timeLimit: 12 },
        { type: 'mental', problem: '5 + 3', answer: 8, timeLimit: 12 },
        { type: 'mental', problem: '5 + 4', answer: 9, timeLimit: 12 },
        { type: 'mental', problem: '6 + 1', answer: 7, timeLimit: 12 },
        { type: 'mental', problem: '7 + 1', answer: 8, timeLimit: 12 },
        { type: 'mental', problem: '8 + 1', answer: 9, timeLimit: 12 },
        { type: 'mental', problem: '6 + 2', answer: 8, timeLimit: 12 },
        { type: 'mental', problem: '7 + 2', answer: 9, timeLimit: 12 },
        { type: 'mental', problem: '6 + 3', answer: 9, timeLimit: 12 },
        { type: 'mental', problem: '9 - 1', answer: 8, timeLimit: 12 },
        { type: 'mental', problem: '8 - 1', answer: 7, timeLimit: 12 },
        { type: 'mental', problem: '7 - 1', answer: 6, timeLimit: 12 },
        { type: 'mental', problem: '6 - 1', answer: 5, timeLimit: 12 },
        { type: 'mental', problem: '5 - 1', answer: 4, timeLimit: 12 }
      ]
    })
  },
  {
    levelId: 15, lessonId: 3, order: 3,
    title: '🧠 Phép tính nhẩm cơ bản',
    description: 'Cộng trừ đơn giản bằng Soroban ảo',
    content: JSON.stringify({
      theory: [
        '🧮 **TÍNH NHẨM VỚI SOROBAN ẢO**',
        '',
        '📐 **QUY TRÌNH ANZAN:**',
        '',
        '1️⃣ **Đọc số đầu tiên**',
        '   → Hình dung số đó trên Soroban ảo',
        '',
        '2️⃣ **Đọc phép tính**',
        '   → Chuẩn bị "gạt" hạt trong đầu',
        '',
        '3️⃣ **Thực hiện di chuyển ẢO**',
        '   → Tưởng tượng tay gạt hạt',
        '   → NHÌN hạt di chuyển trong đầu',
        '',
        '4️⃣ **Đọc kết quả**',
        '   → Nhìn Soroban ảo, đọc số hiện tại',
        '',
        '💡 **VÍ DỤ: 3 + 2 = 5**',
        '   Bước 1: Hình dung số 3 (🟡🟡🟡 gần thanh)',
        '   Bước 2: Dùng Bạn nhỏ! +5, -3',
        '   Bước 3: Đọc: 🟡 / 🟤🟤🟤🟤 = 5 ✅',
        '',
        '🎯 **MẸO:**',
        '   - Bắt đầu với phép tính đơn giản',
        '   - Làm CHẬM và RÕ RÀNG',
        '   - Tăng tốc dần khi quen'
      ],
      practice: [
        { type: 'mental', problem: '2 + 5', answer: 7, timeLimit: 10 },
        { type: 'mental', problem: '3 + 5', answer: 8, timeLimit: 10 },
        { type: 'mental', problem: '4 + 5', answer: 9, timeLimit: 10 },
        { type: 'mental', problem: '1 + 6', answer: 7, timeLimit: 10 },
        { type: 'mental', problem: '2 + 6', answer: 8, timeLimit: 10 },
        { type: 'mental', problem: '3 + 6', answer: 9, timeLimit: 10 },
        { type: 'mental', problem: '1 + 7', answer: 8, timeLimit: 10 },
        { type: 'mental', problem: '2 + 7', answer: 9, timeLimit: 10 },
        { type: 'mental', problem: '1 + 8', answer: 9, timeLimit: 10 },
        { type: 'mental', problem: '9 - 2', answer: 7, timeLimit: 10 },
        { type: 'mental', problem: '9 - 3', answer: 6, timeLimit: 10 },
        { type: 'mental', problem: '9 - 4', answer: 5, timeLimit: 10 },
        { type: 'mental', problem: '8 - 3', answer: 5, timeLimit: 10 },
        { type: 'mental', problem: '7 - 2', answer: 5, timeLimit: 10 },
        { type: 'mental', problem: '6 - 1', answer: 5, timeLimit: 10 }
      ]
    })
  }
];

async function main() {
  console.log('🌱 Bắt đầu seed bài học Level 11-15...\n');
  
  for (const lesson of lessons) {
    const existing = await prisma.lesson.findFirst({
      where: { levelId: lesson.levelId, lessonId: lesson.lessonId }
    });
    
    if (existing) {
      await prisma.lesson.update({ where: { id: existing.id }, data: lesson });
      console.log(`   🔄 Updated: Level ${lesson.levelId} - ${lesson.title}`);
    } else {
      await prisma.lesson.create({ data: lesson });
      console.log(`   ✅ Level ${lesson.levelId} - Bài ${lesson.order}: ${lesson.title}`);
    }
  }
  
  console.log(`\n🎉 Đã seed ${lessons.length} bài học (Level 11-15)!`);
  console.log('\n📝 Level 15 bắt đầu có hướng dẫn Anzan (Soroban ảo)');
}

main()
  .catch(e => { console.error('❌ Lỗi:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
