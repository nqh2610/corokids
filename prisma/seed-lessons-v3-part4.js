const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Level 16-18: Tính nhẩm 2, Tốc độ, Thi đấu
const lessons = [
  // ===== LEVEL 16: TÍNH NHẨM 2 - ANZAN NÂNG CAO =====
  {
    levelId: 16, lessonId: 1, order: 1,
    title: '🧠 Soroban ảo nâng cao',
    description: 'Kỹ thuật tưởng tượng Soroban ảo chi tiết',
    content: JSON.stringify({
      theory: [
        '🎯 **KỸ THUẬT TƯỞNG TƯỢNG SOROBAN ẢO CHI TIẾT**',
        '',
        '📐 **BƯỚC 1: XÂY DỰNG HÌNH ẢNH CƠ BẢN**',
        '',
        '1️⃣ **Tạo khung Soroban trong đầu:**',
        '   - Tưởng tượng một khung gỗ màu vàng/nâu',
        '   - Có thanh ngang (beam) ở giữa chia 2 phần',
        '   - Phần trên: 1 hạt mỗi cột (hạt Trời)',
        '   - Phần dưới: 4 hạt mỗi cột (hạt Đất)',
        '',
        '2️⃣ **Chi tiết hạt:**',
        '   - Hạt hình tròn/oval, màu đen hoặc nâu',
        '   - Kích thước vừa đủ để thấy rõ',
        '   - Hạt "sáng" khi được gạt về thanh',
        '',
        '📐 **BƯỚC 2: KỸ THUẬT GHI NHỚ VỊ TRÍ**',
        '',
        '🔹 **Cột đơn vị (phải nhất):**',
        '   - Luôn bắt đầu từ cột này',
        '   - Hình dung nó LỚN hơn các cột khác',
        '',
        '🔹 **Cột chục (bên trái cột đơn vị):**',
        '   - Hình dung có chấm đỏ đánh dấu',
        '',
        '🔹 **Cột trăm, nghìn:**',
        '   - Thêm dần khi cần',
        '',
        '📐 **BƯỚC 3: HOẠT HÌNH TRONG ĐẦU**',
        '',
        '✨ **Khi cộng số:**',
        '   - "Nhìn" ngón tay ẢO gạt hạt lên',
        '   - Nghe tiếng "click" trong đầu',
        '   - Thấy hạt di chuyển CHẬM RÃI',
        '',
        '✨ **Khi trừ số:**',
        '   - "Nhìn" ngón tay ẢO gạt hạt xuống',
        '   - Hạt rời khỏi thanh',
        '',
        '💡 **MẸO QUAN TRỌNG:**',
        '   - Ban đầu làm RẤT CHẬM',
        '   - Nói thầm các bước trong đầu',
        '   - Luyện mỗi ngày 5-10 phút'
      ],
      practice: [
        { type: 'mental', problem: '12 + 3', answer: 15, timeLimit: 15 },
        { type: 'mental', problem: '15 + 4', answer: 19, timeLimit: 15 },
        { type: 'mental', problem: '11 + 8', answer: 19, timeLimit: 15 },
        { type: 'mental', problem: '13 + 6', answer: 19, timeLimit: 15 },
        { type: 'mental', problem: '14 + 5', answer: 19, timeLimit: 15 },
        { type: 'mental', problem: '16 + 3', answer: 19, timeLimit: 12 },
        { type: 'mental', problem: '17 + 2', answer: 19, timeLimit: 12 },
        { type: 'mental', problem: '19 - 4', answer: 15, timeLimit: 12 },
        { type: 'mental', problem: '18 - 3', answer: 15, timeLimit: 12 },
        { type: 'mental', problem: '17 - 2', answer: 15, timeLimit: 12 },
        { type: 'mental', problem: '16 - 1', answer: 15, timeLimit: 10 },
        { type: 'mental', problem: '15 - 5', answer: 10, timeLimit: 10 },
        { type: 'mental', problem: '14 - 4', answer: 10, timeLimit: 10 },
        { type: 'mental', problem: '13 - 3', answer: 10, timeLimit: 10 },
        { type: 'mental', problem: '12 - 2', answer: 10, timeLimit: 10 }
      ]
    })
  },
  {
    levelId: 16, lessonId: 2, order: 2,
    title: '🧠 Tính nhẩm 2 chữ số',
    description: 'Anzan với số 2 chữ số',
    content: JSON.stringify({
      theory: [
        '🔢 **ANZAN VỚI SỐ 2 CHỮ SỐ**',
        '',
        '📐 **CÁCH HÌNH DUNG SỐ 2 CHỮ SỐ:**',
        '',
        '💡 **VÍ DỤ: Số 23**',
        '   - Hình dung 2 CỘT Soroban:',
        '   - Cột TRÁI (hàng chục): số 2 → 🟤 / 🟡🟡🟤🟤',
        '   - Cột PHẢI (hàng đơn vị): số 3 → 🟤 / 🟡🟡🟡🟤',
        '',
        '💡 **VÍ DỤ: Số 57**',
        '   - Cột TRÁI (chục): 5 → 🟡 / 🟤🟤🟤🟤',
        '   - Cột PHẢI (đơn vị): 7 → 🟡 / 🟡🟡🟤🟤',
        '',
        '📐 **PHÉP CỘNG 2 CHỮ SỐ:**',
        '',
        '💡 **VÍ DỤ: 23 + 14**',
        '   Bước 1: Hình dung 23 (2 cột)',
        '   Bước 2: Cộng 4 vào cột đơn vị → 7',
        '   Bước 3: Cộng 1 vào cột chục → 3',
        '   Bước 4: Đọc: 37 ✅',
        '',
        '⚠️ **KHI CÓ NHỚ:**',
        '   VD: 28 + 15',
        '   - Cột đơn vị: 8 + 5 = 13 → ghi 3, nhớ 1',
        '   - Cột chục: 2 + 1 + 1(nhớ) = 4',
        '   - Kết quả: 43 ✅',
        '',
        '🎯 **MẸO:**',
        '   - LUÔN bắt đầu từ cột PHẢI (đơn vị)',
        '   - Nhớ số cần nhớ bằng hình ảnh "chấm đỏ"'
      ],
      practice: [
        { type: 'mental', problem: '23 + 14', answer: 37, timeLimit: 20 },
        { type: 'mental', problem: '31 + 25', answer: 56, timeLimit: 20 },
        { type: 'mental', problem: '42 + 33', answer: 75, timeLimit: 20 },
        { type: 'mental', problem: '15 + 24', answer: 39, timeLimit: 18 },
        { type: 'mental', problem: '28 + 15', answer: 43, timeLimit: 18 },
        { type: 'mental', problem: '37 + 26', answer: 63, timeLimit: 18 },
        { type: 'mental', problem: '45 + 38', answer: 83, timeLimit: 15 },
        { type: 'mental', problem: '56 + 27', answer: 83, timeLimit: 15 },
        { type: 'mental', problem: '63 + 18', answer: 81, timeLimit: 15 },
        { type: 'mental', problem: '47 + 35', answer: 82, timeLimit: 15 },
        { type: 'mental', problem: '38 + 44', answer: 82, timeLimit: 12 },
        { type: 'mental', problem: '29 + 53', answer: 82, timeLimit: 12 },
        { type: 'mental', problem: '54 + 28', answer: 82, timeLimit: 12 },
        { type: 'mental', problem: '67 + 15', answer: 82, timeLimit: 12 },
        { type: 'mental', problem: '71 + 11', answer: 82, timeLimit: 10 }
      ]
    })
  },
  {
    levelId: 16, lessonId: 3, order: 3,
    title: '🧠 Trừ nhẩm 2 chữ số',
    description: 'Anzan phép trừ nâng cao',
    content: JSON.stringify({
      theory: [
        '➖ **ANZAN PHÉP TRỪ 2 CHỮ SỐ**',
        '',
        '📐 **QUY TRÌNH:**',
        '',
        '💡 **VÍ DỤ: 45 - 23**',
        '   Bước 1: Hình dung 45 trên Soroban ảo',
        '   Bước 2: Trừ 3 ở cột đơn vị → 2',
        '   Bước 3: Trừ 2 ở cột chục → 2',
        '   Bước 4: Đọc: 22 ✅',
        '',
        '⚠️ **KHI CẦN MƯỢN:**',
        '',
        '💡 **VÍ DỤ: 52 - 18**',
        '   Bước 1: Hình dung 52',
        '   Bước 2: 2 - 8 không đủ!',
        '   Bước 3: Mượn 1 chục → 12 - 8 = 4',
        '   Bước 4: Cột chục: 5 - 1(mượn) - 1 = 3',
        '   Bước 5: Đọc: 34 ✅',
        '',
        '🎯 **KỸ THUẬT HÌNH DUNG MƯỢN:**',
        '   - Khi mượn, "nhìn" 1 hạt ở cột chục biến mất',
        '   - Đồng thời cột đơn vị "sáng lên" thêm 10',
        '   - Tưởng tượng như có ánh sáng chuyển từ trái sang phải',
        '',
        '💡 **MẸO:**',
        '   - Ước lượng trước: 52 - 18 ≈ 50 - 20 = 30',
        '   - Kết quả thực tế gần 30 → 34 ✅'
      ],
      practice: [
        { type: 'mental', problem: '45 - 23', answer: 22, timeLimit: 20 },
        { type: 'mental', problem: '67 - 34', answer: 33, timeLimit: 20 },
        { type: 'mental', problem: '89 - 45', answer: 44, timeLimit: 20 },
        { type: 'mental', problem: '52 - 18', answer: 34, timeLimit: 18 },
        { type: 'mental', problem: '63 - 27', answer: 36, timeLimit: 18 },
        { type: 'mental', problem: '74 - 38', answer: 36, timeLimit: 18 },
        { type: 'mental', problem: '85 - 49', answer: 36, timeLimit: 15 },
        { type: 'mental', problem: '91 - 56', answer: 35, timeLimit: 15 },
        { type: 'mental', problem: '80 - 35', answer: 45, timeLimit: 15 },
        { type: 'mental', problem: '70 - 28', answer: 42, timeLimit: 12 },
        { type: 'mental', problem: '60 - 17', answer: 43, timeLimit: 12 },
        { type: 'mental', problem: '50 - 26', answer: 24, timeLimit: 12 },
        { type: 'mental', problem: '43 - 15', answer: 28, timeLimit: 10 },
        { type: 'mental', problem: '36 - 19', answer: 17, timeLimit: 10 },
        { type: 'mental', problem: '72 - 45', answer: 27, timeLimit: 10 }
      ]
    })
  },

  // ===== LEVEL 17: TỐC ĐỘ =====
  {
    levelId: 17, lessonId: 1, order: 1,
    title: '⚡ Tốc độ cơ bản',
    description: 'Luyện tính nhanh với số đơn',
    content: JSON.stringify({
      theory: [
        '⚡ **LUYỆN TỐC ĐỘ - CẤP ĐỘ 1**',
        '',
        '🎯 **MỤC TIÊU:**',
        '   - Tính 10 phép tính trong 30 giây',
        '   - Phép cộng/trừ 1 chữ số',
        '',
        '📐 **KỸ THUẬT TĂNG TỐC:**',
        '',
        '1️⃣ **Không nói thầm:**',
        '   - Đừng đọc "3 cộng 4 bằng..."',
        '   - Chỉ NHÌN số → Thấy kết quả',
        '',
        '2️⃣ **Phản xạ tự động:**',
        '   - 3 + 4 → 7 (không cần nghĩ)',
        '   - Như nhìn chữ → đọc được ngay',
        '',
        '3️⃣ **Nhịp đều:**',
        '   - Giữ nhịp 3 giây/câu',
        '   - Đừng dừng lại quá lâu ở câu khó',
        '',
        '💡 **BÀI TẬP:**',
        '   - Nhìn số → Gạt Soroban ảo → Đọc kết quả',
        '   - Mỗi bước dưới 1 giây',
        '   - Lặp lại nhiều lần'
      ],
      practice: [
        { type: 'speed', count: 5, difficulty: 'easy', timeLimit: 30 },
        { type: 'speed', count: 8, difficulty: 'easy', timeLimit: 45 },
        { type: 'speed', count: 10, difficulty: 'easy', timeLimit: 60 }
      ]
    })
  },
  {
    levelId: 17, lessonId: 2, order: 2,
    title: '⚡ Tốc độ nâng cao',
    description: 'Luyện tính nhanh với số 2 chữ số',
    content: JSON.stringify({
      theory: [
        '⚡ **LUYỆN TỐC ĐỘ - CẤP ĐỘ 2**',
        '',
        '🎯 **MỤC TIÊU:**',
        '   - Tính 10 phép tính trong 60 giây',
        '   - Phép cộng/trừ 2 chữ số',
        '',
        '📐 **KỸ THUẬT:**',
        '',
        '1️⃣ **Xử lý song song:**',
        '   - Nhìn cả 2 số cùng lúc',
        '   - Ước lượng kết quả ngay',
        '',
        '2️⃣ **Pattern Recognition:**',
        '   - Nhận ra các mẫu quen thuộc',
        '   - 25 + 25 = 50 (nhớ ngay)',
        '   - 11 + 11 = 22 (không cần tính)',
        '',
        '3️⃣ **Làm tròn & điều chỉnh:**',
        '   - 28 + 15 ≈ 30 + 15 - 2 = 43',
        '   - Nhanh hơn tính từng hàng',
        '',
        '💡 **MẸO PRO:**',
        '   - Số tròn chục dễ hơn',
        '   - Đưa về số tròn nếu được',
        '   - Tin vào phản xạ của bạn!'
      ],
      practice: [
        { type: 'speed', count: 5, difficulty: 'medium', timeLimit: 40 },
        { type: 'speed', count: 8, difficulty: 'medium', timeLimit: 60 },
        { type: 'speed', count: 10, difficulty: 'medium', timeLimit: 90 }
      ]
    })
  },
  {
    levelId: 17, lessonId: 3, order: 3,
    title: '⚡ Thử thách tốc độ',
    description: 'Bài tập tốc độ tổng hợp',
    content: JSON.stringify({
      theory: [
        '🏆 **THỬ THÁCH TỐC ĐỘ**',
        '',
        '🎯 **MỤC TIÊU CUỐI:**',
        '   - 15 phép tính trong 60 giây',
        '   - Độ chính xác > 90%',
        '',
        '📐 **CHIẾN THUẬT THI:**',
        '',
        '1️⃣ **Đọc lướt trước:**',
        '   - Nhìn nhanh tất cả các câu',
        '   - Làm câu dễ trước',
        '',
        '2️⃣ **Không quay lại:**',
        '   - Đã chọn đáp án thì đi tiếp',
        '   - Tiết kiệm thời gian',
        '',
        '3️⃣ **Ước lượng nhanh:**',
        '   - Loại đáp án sai rõ ràng',
        '   - Chọn đáp án gần nhất',
        '',
        '⏱️ **QUẢN LÝ THỜI GIAN:**',
        '   - Câu dễ: 2-3 giây',
        '   - Câu khó: 5-6 giây',
        '   - Câu rất khó: bỏ qua, quay lại sau',
        '',
        '💪 **TÂM LÝ THI:**',
        '   - Bình tĩnh, thở đều',
        '   - Tin vào bản thân',
        '   - Sai 1-2 câu không sao!'
      ],
      practice: [
        { type: 'speed', count: 10, difficulty: 'medium', timeLimit: 60 },
        { type: 'speed', count: 12, difficulty: 'medium', timeLimit: 75 },
        { type: 'speed', count: 15, difficulty: 'hard', timeLimit: 90 }
      ]
    })
  },

  // ===== LEVEL 18: THI ĐẤU =====
  {
    levelId: 18, lessonId: 1, order: 1,
    title: '🏆 Luật thi Soroban',
    description: 'Tìm hiểu các giải thi Soroban',
    content: JSON.stringify({
      theory: [
        '🏆 **GIẢI THI SOROBAN**',
        '',
        '📜 **CÁC CẤP ĐỘ THI:**',
        '',
        '🥉 **Cấp 10-7 (Beginner):**',
        '   - Cộng/trừ số 1-2 chữ số',
        '   - Thời gian: 3-5 phút',
        '   - Số câu: 10-20 câu',
        '',
        '🥈 **Cấp 6-4 (Intermediate):**',
        '   - Cộng/trừ số 3-4 chữ số',
        '   - Nhân/chia đơn giản',
        '   - Thời gian: 5-7 phút',
        '',
        '🥇 **Cấp 3-1 (Advanced):**',
        '   - Các phép tính phức tạp',
        '   - Thời gian ngắn hơn',
        '',
        '🏅 **Cấp Đan (Master):**',
        '   - Flash Anzan (tính nhẩm siêu tốc)',
        '   - Thi đấu quốc tế',
        '',
        '📐 **HÌNH THỨC THI:**',
        '   - Thi viết trên giấy',
        '   - Thi trên máy tính',
        '   - Thi đọc số (nghe và tính)',
        '   - Flash Anzan (nhìn số chớp nhoáng)'
      ],
      practice: [
        { numbers: [123, 456], operation: '+', answer: 579 },
        { numbers: [234, 567], operation: '+', answer: 801 },
        { numbers: [345, 678], operation: '+', answer: 1023 },
        { numbers: [456, 789], operation: '+', answer: 1245 },
        { numbers: [567, 234], operation: '+', answer: 801 },
        { numbers: [678, 123], operation: '+', answer: 801 },
        { numbers: [789, 111], operation: '+', answer: 900 },
        { numbers: [800, -234], operation: '+', answer: 566 },
        { numbers: [700, -345], operation: '+', answer: 355 },
        { numbers: [600, -456], operation: '+', answer: 144 },
        { numbers: [500, -123], operation: '+', answer: 377 },
        { numbers: [400, -156], operation: '+', answer: 244 },
        { numbers: [300, -189], operation: '+', answer: 111 },
        { numbers: [1000, -567], operation: '+', answer: 433 },
        { numbers: [999, -111], operation: '+', answer: 888 }
      ]
    })
  },
  {
    levelId: 18, lessonId: 2, order: 2,
    title: '🏆 Mô phỏng thi',
    description: 'Bài thi thử cấp độ cơ bản',
    content: JSON.stringify({
      theory: [
        '📝 **BÀI THI THỬ - CẤP 10**',
        '',
        '⏱️ **THÔNG TIN:**',
        '   - Thời gian: 3 phút',
        '   - Số câu: 15 câu',
        '   - Đỗ: Đúng ≥ 12 câu (80%)',
        '',
        '📐 **NỘI DUNG:**',
        '   - Cộng/trừ số 1-2 chữ số',
        '   - Mỗi phép tính 2 số',
        '',
        '💡 **HƯỚNG DẪN:**',
        '   1. Đọc kỹ đề trước khi bắt đầu',
        '   2. Bắt đầu từ câu dễ nhất',
        '   3. Không dành quá 15 giây/câu',
        '   4. Kiểm tra lại nếu còn thời gian',
        '',
        '🎯 **CHIẾN THUẬT:**',
        '   - 15 câu ÷ 3 phút = 12 giây/câu',
        '   - Câu dễ: 8-10 giây',
        '   - Câu khó: 15-20 giây',
        '   - Để dành 30 giây kiểm tra',
        '',
        '💪 **SẴN SÀNG CHƯA?**',
        '   - Hít thở sâu 3 lần',
        '   - Tập trung 100%',
        '   - BẮT ĐẦU!'
      ],
      practice: [
        { numbers: [15, 23], operation: '+', answer: 38 },
        { numbers: [27, 18], operation: '+', answer: 45 },
        { numbers: [34, 29], operation: '+', answer: 63 },
        { numbers: [46, 37], operation: '+', answer: 83 },
        { numbers: [52, 41], operation: '+', answer: 93 },
        { numbers: [68, -25], operation: '+', answer: 43 },
        { numbers: [75, -38], operation: '+', answer: 37 },
        { numbers: [84, -46], operation: '+', answer: 38 },
        { numbers: [91, -54], operation: '+', answer: 37 },
        { numbers: [100, -67], operation: '+', answer: 33 },
        { numbers: [33, 44], operation: '+', answer: 77 },
        { numbers: [55, 22], operation: '+', answer: 77 },
        { numbers: [66, 11], operation: '+', answer: 77 },
        { numbers: [88, -11], operation: '+', answer: 77 },
        { numbers: [99, -22], operation: '+', answer: 77 }
      ]
    })
  },
  {
    levelId: 18, lessonId: 3, order: 3,
    title: '🏆 Thi đấu nâng cao',
    description: 'Bài thi thử nâng cao',
    content: JSON.stringify({
      theory: [
        '🏆 **BÀI THI THỬ - CẤP 8**',
        '',
        '⏱️ **THÔNG TIN:**',
        '   - Thời gian: 5 phút',
        '   - Số câu: 20 câu',
        '   - Đỗ: Đúng ≥ 16 câu (80%)',
        '',
        '📐 **NỘI DUNG:**',
        '   - Cộng/trừ số 2-3 chữ số',
        '   - Mỗi phép tính 2-3 số',
        '',
        '🎯 **MỤC TIÊU NÂNG CAO:**',
        '',
        '✅ **Sau khi hoàn thành Level 18:**',
        '   - Tính nhẩm 2 chữ số trong 5 giây',
        '   - Độ chính xác > 90%',
        '   - Sẵn sàng thi cấp 10-8',
        '',
        '🚀 **TIẾP THEO:**',
        '   - Luyện tập mỗi ngày 10-15 phút',
        '   - Tăng dần độ khó',
        '   - Tham gia thi thử online',
        '   - Đăng ký thi chính thức',
        '',
        '🌟 **CHÚC MỪNG!**',
        '   Bạn đã hoàn thành chương trình cơ bản!',
        '   Tiếp tục luyện tập để thành master Soroban! 🏆'
      ],
      practice: [
        { numbers: [125, 237], operation: '+', answer: 362 },
        { numbers: [248, 356], operation: '+', answer: 604 },
        { numbers: [369, 478], operation: '+', answer: 847 },
        { numbers: [457, 389], operation: '+', answer: 846 },
        { numbers: [568, 234], operation: '+', answer: 802 },
        { numbers: [679, 125], operation: '+', answer: 804 },
        { numbers: [785, 119], operation: '+', answer: 904 },
        { numbers: [892, 108], operation: '+', answer: 1000 },
        { numbers: [500, -167], operation: '+', answer: 333 },
        { numbers: [600, -278], operation: '+', answer: 322 },
        { numbers: [700, -389], operation: '+', answer: 311 },
        { numbers: [800, -499], operation: '+', answer: 301 },
        { numbers: [900, -588], operation: '+', answer: 312 },
        { numbers: [1000, -678], operation: '+', answer: 322 },
        { numbers: [345, 123, 234], operation: '+', answer: 702 }
      ]
    })
  }
];

async function main() {
  console.log('🌱 Bắt đầu seed bài học Level 16-18...\n');
  
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
  
  console.log(`\n🎉 Đã seed ${lessons.length} bài học (Level 16-18)!`);
  console.log('\n📝 Level 16 có hướng dẫn chi tiết về Soroban ảo');
  console.log('📝 Level 17-18 là Tốc độ và Thi đấu');
}

main()
  .catch(e => { console.error('❌ Lỗi:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
