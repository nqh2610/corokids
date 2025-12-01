-- ============================================================
-- SOROKIDS SEED DATA EXPORT
-- Version: 1.0.0
-- Backup Date: 2025-12-01
-- Description: Initial seed data for restoration
-- ============================================================

USE `sorokids`;

-- ============================================================
-- USERS DATA
-- ============================================================
-- Password for all users: 123456 (bcrypt hashed)
-- Hash: $2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4bDAMkCbpyhAqOOe

INSERT INTO `users` (`id`, `email`, `username`, `password`, `name`, `avatar`, `level`, `totalStars`, `diamonds`, `streak`, `role`, `lastLoginDate`, `createdAt`, `updatedAt`) VALUES
('demo-user-001', 'demo@sorokids.com', 'demo_user', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4bDAMkCbpyhAqOOe', 'Demo User', 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo', 5, 450, 25, 7, 'student', NOW(), NOW(), NOW()),
('user-alice-001', 'alice@sorokids.com', 'alice_nguyen', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4bDAMkCbpyhAqOOe', 'Alice Nguyễn', NULL, 8, 850, 120, 15, 'student', NOW(), NOW(), NOW()),
('user-bob-002', 'bob@sorokids.com', 'bob_tran', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4bDAMkCbpyhAqOOe', 'Bob Trần', NULL, 7, 720, 95, 10, 'student', NOW(), NOW(), NOW()),
('user-charlie-003', 'charlie@sorokids.com', 'charlie_le', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4bDAMkCbpyhAqOOe', 'Charlie Lê', NULL, 6, 680, 80, 8, 'student', NOW(), NOW(), NOW()),
('user-diana-004', 'diana@sorokids.com', 'diana_pham', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4bDAMkCbpyhAqOOe', 'Diana Phạm', NULL, 6, 590, 75, 12, 'student', NOW(), NOW(), NOW()),
('user-evan-005', 'evan@sorokids.com', 'evan_vo', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4bDAMkCbpyhAqOOe', 'Evan Võ', NULL, 5, 520, 60, 5, 'student', NOW(), NOW(), NOW()),
('user-fiona-006', 'fiona@sorokids.com', 'fiona_hoang', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4bDAMkCbpyhAqOOe', 'Fiona Hoàng', NULL, 5, 480, 55, 7, 'student', NOW(), NOW(), NOW()),
('user-george-007', 'george@sorokids.com', 'george_dang', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4bDAMkCbpyhAqOOe', 'George Đặng', NULL, 4, 420, 45, 4, 'student', NOW(), NOW(), NOW()),
('user-hannah-008', 'hannah@sorokids.com', 'hannah_bui', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4bDAMkCbpyhAqOOe', 'Hannah Bùi', NULL, 4, 380, 40, 6, 'student', NOW(), NOW(), NOW()),
('user-ivan-009', 'ivan@sorokids.com', 'ivan_do', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4bDAMkCbpyhAqOOe', 'Ivan Đỗ', NULL, 3, 340, 35, 3, 'student', NOW(), NOW(), NOW()),
('user-julia-010', 'julia@sorokids.com', 'julia_ngo', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4bDAMkCbpyhAqOOe', 'Julia Ngô', NULL, 3, 290, 30, 2, 'student', NOW(), NOW(), NOW())
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- ============================================================
-- ACHIEVEMENTS DATA
-- ============================================================
INSERT INTO `achievements` (`id`, `name`, `description`, `icon`, `category`, `requirement`, `stars`, `diamonds`, `createdAt`) VALUES
(UUID(), 'Người mới bắt đầu', 'Hoàn thành bài học đầu tiên', '🌱', 'learning', '{"type":"complete_lessons","count":1}', 50, 5, NOW()),
(UUID(), 'Học sinh chăm chỉ', 'Hoàn thành 10 bài học', '📚', 'learning', '{"type":"complete_lessons","count":10}', 100, 10, NOW()),
(UUID(), 'Bậc thầy Soroban', 'Hoàn thành tất cả bài học', '🏆', 'learning', '{"type":"complete_all_lessons"}', 500, 50, NOW()),
(UUID(), 'Chuỗi ngày 3', 'Học 3 ngày liên tiếp', '🔥', 'streak', '{"type":"streak","count":3}', 30, 3, NOW()),
(UUID(), 'Chuỗi ngày 7', 'Học 7 ngày liên tiếp', '⚡', 'streak', '{"type":"streak","count":7}', 70, 7, NOW()),
(UUID(), 'Chuỗi ngày 30', 'Học 30 ngày liên tiếp', '💎', 'streak', '{"type":"streak","count":30}', 300, 30, NOW()),
(UUID(), 'Tay nhanh', 'Hoàn thành 50 bài tập', '⚡', 'practice', '{"type":"complete_exercises","count":50}', 100, 10, NOW()),
(UUID(), 'Siêu tốc', 'Hoàn thành 200 bài tập', '🚀', 'practice', '{"type":"complete_exercises","count":200}', 300, 25, NOW()),
(UUID(), 'Chính xác tuyệt đối', 'Đạt 100% độ chính xác trong 20 bài tập liên tiếp', '🎯', 'accuracy', '{"type":"perfect_accuracy","count":20}', 200, 20, NOW()),
(UUID(), 'Người bạn tốt', 'Kết bạn với 5 người', '👥', 'social', '{"type":"friends","count":5}', 50, 5, NOW()),
(UUID(), 'Nhà vô địch', 'Giành chiến thắng trong 10 thử thách', '👑', 'challenge', '{"type":"win_challenges","count":10}', 500, 50, NOW())
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);

-- ============================================================
-- LESSONS DATA
-- ============================================================
INSERT INTO `lessons` (`id`, `levelId`, `lessonId`, `title`, `description`, `content`, `difficulty`, `duration`, `stars`, `order`, `isLocked`, `createdAt`, `updatedAt`) VALUES
(UUID(), 1, 1, 'Giới thiệu bàn tính Soroban', 'Tìm hiểu về lịch sử và cấu tạo của bàn tính Soroban', '{"steps":[{"type":"text","content":"Soroban là bàn tính Nhật Bản, được phát triển từ bàn tính Trung Quốc (Abacus)."},{"type":"image","content":"/images/soroban-history.jpg","alt":"Lịch sử Soroban"},{"type":"text","content":"Bàn tính Soroban gồm 2 phần: Hạt trên (Heaven bead) có giá trị 5 và hạt dưới (Earth beads) mỗi hạt có giá trị 1."},{"type":"interactive","content":"soroban-demo","data":{"mode":"explore"}},{"type":"quiz","question":"Hạt trên có giá trị bao nhiêu?","options":["1","5","10","0"],"answer":1}]}', 1, 10, 10, 1, 0, NOW(), NOW()),
(UUID(), 1, 2, 'Biểu diễn số 0-4', 'Học cách biểu diễn các số từ 0 đến 4 bằng hạt dưới', '{"steps":[{"type":"text","content":"Số 0: Tất cả hạt dưới ở vị trí xuống dưới, hạt trên ở vị trí trên."},{"type":"interactive","content":"soroban-demo","data":{"target":0,"hint":true}},{"type":"text","content":"Số 1-4: Đẩy từng hạt dưới lên một để tạo thành số tương ứng."},{"type":"practice","exercises":[{"instruction":"Tạo số 2","target":2},{"instruction":"Tạo số 4","target":4},{"instruction":"Tạo số 3","target":3}]}]}', 1, 15, 15, 2, 0, NOW(), NOW()),
(UUID(), 1, 3, 'Biểu diễn số 5-9', 'Học cách sử dụng hạt trên để biểu diễn số 5-9', '{"steps":[{"type":"text","content":"Số 5: Đẩy hạt trên xuống, tất cả hạt dưới ở vị trí xuống."},{"type":"interactive","content":"soroban-demo","data":{"target":5,"hint":true}},{"type":"text","content":"Số 6-9: Hạt trên xuống (5) + hạt dưới tương ứng (1-4)."},{"type":"practice","exercises":[{"instruction":"Tạo số 7","target":7},{"instruction":"Tạo số 9","target":9},{"instruction":"Tạo số 6","target":6}]}]}', 1, 15, 15, 3, 0, NOW(), NOW()),
(UUID(), 1, 4, 'Cộng đơn giản (0-4)', 'Thực hiện phép cộng đơn giản không cần nhớ', '{"steps":[{"type":"text","content":"Phép cộng đơn giản: Chỉ cần đẩy thêm hạt dưới lên."},{"type":"example","problem":"2 + 1","solution":"Bắt đầu với 2 (2 hạt dưới), đẩy thêm 1 hạt nữa → kết quả 3"},{"type":"interactive","content":"soroban-demo","data":{"operation":"add","num1":2,"num2":1}},{"type":"practice","exercises":[{"instruction":"Tính 1 + 2","answer":3},{"instruction":"Tính 2 + 2","answer":4},{"instruction":"Tính 1 + 3","answer":4}]}]}', 1, 20, 20, 4, 0, NOW(), NOW()),
(UUID(), 1, 5, 'Trừ đơn giản (0-4)', 'Thực hiện phép trừ đơn giản', '{"steps":[{"type":"text","content":"Phép trừ đơn giản: Đẩy hạt dưới xuống để trừ."},{"type":"example","problem":"4 - 1","solution":"Bắt đầu với 4 (4 hạt dưới), đẩy 1 hạt xuống → kết quả 3"},{"type":"practice","exercises":[{"instruction":"Tính 3 - 1","answer":2},{"instruction":"Tính 4 - 2","answer":2},{"instruction":"Tính 3 - 2","answer":1}]}]}', 1, 20, 20, 5, 0, NOW(), NOW()),
(UUID(), 1, 6, 'Cộng với số 5', 'Học kỹ thuật cộng sử dụng hạt trên', '{"steps":[{"type":"text","content":"Khi cộng với 5, ta sử dụng hạt trên."},{"type":"example","problem":"2 + 5","solution":"Bắt đầu với 2, đẩy hạt trên xuống (thêm 5), đẩy 2 hạt dưới xuống → kết quả 7"},{"type":"practice","exercises":[{"instruction":"Tính 1 + 5","answer":6},{"instruction":"Tính 3 + 5","answer":8},{"instruction":"Tính 4 + 5","answer":9}]}]}', 2, 25, 25, 6, 0, NOW(), NOW()),
(UUID(), 1, 7, 'Trừ với số 5', 'Học kỹ thuật trừ sử dụng hạt trên', '{"steps":[{"type":"text","content":"Khi trừ với 5, ta sử dụng hạt trên."},{"type":"example","problem":"7 - 5","solution":"Bắt đầu với 7, đẩy hạt trên lên (trừ 5) → kết quả 2"},{"type":"practice","exercises":[{"instruction":"Tính 6 - 5","answer":1},{"instruction":"Tính 9 - 5","answer":4},{"instruction":"Tính 8 - 5","answer":3}]}]}', 2, 25, 25, 7, 0, NOW(), NOW()),
(UUID(), 1, 8, 'Ôn tập Level 1', 'Tổng hợp kiến thức Level 1', '{"steps":[{"type":"text","content":"Hãy thực hiện các bài tập tổng hợp để củng cố kiến thức!"},{"type":"practice","exercises":[{"instruction":"Tạo số 8","target":8},{"instruction":"Tính 3 + 2","answer":5},{"instruction":"Tính 7 - 3","answer":4},{"instruction":"Tính 4 + 5","answer":9},{"instruction":"Tính 9 - 5","answer":4}]},{"type":"quiz","question":"Số 7 được tạo bằng cách nào?","options":["7 hạt dưới","Hạt trên + 2 hạt dưới","1 hạt trên + 7 hạt dưới","Không thể tạo"],"answer":1}]}', 2, 30, 30, 8, 0, NOW(), NOW()),
(UUID(), 2, 1, 'Số 2 chữ số', 'Học cách biểu diễn và thao tác với số 2 chữ số', '{"steps":[{"type":"text","content":"Với số 2 chữ số, ta sử dụng 2 cột trên bàn tính. Cột trái là chục, cột phải là đơn vị."},{"type":"example","problem":"Số 25","solution":"Cột chục: 2, Cột đơn vị: 5"},{"type":"interactive","content":"soroban-demo","data":{"target":25,"columns":2}},{"type":"practice","exercises":[{"instruction":"Tạo số 37","target":37},{"instruction":"Tạo số 68","target":68},{"instruction":"Tạo số 94","target":94}]}]}', 2, 20, 20, 1, 0, NOW(), NOW()),
(UUID(), 2, 2, 'Cộng không nhớ', 'Cộng 2 chữ số không có nhớ', '{"steps":[{"type":"text","content":"Cộng từng cột riêng biệt, bắt đầu từ đơn vị."},{"type":"example","problem":"23 + 15","solution":"Đơn vị: 3 + 5 = 8, Chục: 2 + 1 = 3 → Kết quả: 38"},{"type":"practice","exercises":[{"instruction":"Tính 12 + 17","answer":29},{"instruction":"Tính 34 + 24","answer":58},{"instruction":"Tính 41 + 32","answer":73}]}]}', 2, 25, 25, 2, 0, NOW(), NOW()),
(UUID(), 2, 3, 'Cộng có nhớ cơ bản', 'Học kỹ thuật cộng có nhớ', '{"steps":[{"type":"text","content":"Khi đơn vị > 9, ta phải nhớ sang hàng chục."},{"type":"example","problem":"18 + 7","solution":"8 + 7 = 15 → Viết 5, nhớ 1 → 1 + 1 = 2 → Kết quả: 25"},{"type":"practice","exercises":[{"instruction":"Tính 16 + 8","answer":24},{"instruction":"Tính 27 + 9","answer":36},{"instruction":"Tính 35 + 8","answer":43}]}]}', 3, 30, 30, 3, 0, NOW(), NOW()),
(UUID(), 2, 4, 'Trừ không mượn', 'Trừ 2 chữ số không cần mượn', '{"steps":[{"type":"text","content":"Trừ từng cột riêng biệt, bắt đầu từ đơn vị."},{"type":"example","problem":"58 - 23","solution":"Đơn vị: 8 - 3 = 5, Chục: 5 - 2 = 3 → Kết quả: 35"},{"type":"practice","exercises":[{"instruction":"Tính 67 - 34","answer":33},{"instruction":"Tính 89 - 42","answer":47},{"instruction":"Tính 75 - 51","answer":24}]}]}', 2, 25, 25, 4, 0, NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- ============================================================
-- QUESTS DATA
-- ============================================================
INSERT INTO `quests` (`id`, `title`, `description`, `type`, `category`, `requirement`, `stars`, `diamonds`, `isActive`, `createdAt`) VALUES
(UUID(), 'Luyện tập hàng ngày', 'Hoàn thành 5 bài tập', 'daily', 'practice', '{"type":"complete_exercises","count":5}', 50, 5, 1, NOW()),
(UUID(), 'Học bài mới', 'Hoàn thành 1 bài học', 'daily', 'lesson', '{"type":"complete_lessons","count":1}', 100, 10, 1, NOW()),
(UUID(), 'Giữ streak', 'Đăng nhập hàng ngày', 'daily', 'streak', '{"type":"login"}', 20, 2, 1, NOW()),
(UUID(), 'Chiến binh cuối tuần', 'Hoàn thành 20 bài tập trong tuần', 'weekly', 'practice', '{"type":"complete_exercises","count":20}', 200, 20, 1, NOW()),
(UUID(), 'Học giỏi', 'Hoàn thành 3 bài học trong tuần', 'weekly', 'lesson', '{"type":"complete_lessons","count":3}', 300, 30, 1, NOW());

-- ============================================================
-- SHOP ITEMS DATA
-- ============================================================
INSERT INTO `shop_items` (`id`, `name`, `description`, `icon`, `category`, `price`, `type`, `data`, `isActive`, `createdAt`) VALUES
(UUID(), 'Avatar Ninja', 'Avatar độc đáo hình ninja', '🥷', 'avatar', 50, 'permanent', '{"avatarId":"ninja"}', 1, NOW()),
(UUID(), 'Avatar Robot', 'Avatar robot công nghệ cao', '🤖', 'avatar', 50, 'permanent', '{"avatarId":"robot"}', 1, NOW()),
(UUID(), 'Avatar Công chúa', 'Avatar công chúa xinh đẹp', '👸', 'avatar', 50, 'permanent', '{"avatarId":"princess"}', 1, NOW()),
(UUID(), 'Gợi ý thông minh', 'Nhận gợi ý khi làm bài', '💡', 'power-up', 10, 'consumable', '{"powerUpType":"hint","uses":5}', 1, NOW()),
(UUID(), 'Thời gian thêm', 'Thêm 30 giây làm bài', '⏱️', 'power-up', 15, 'consumable', '{"powerUpType":"time","seconds":30}', 1, NOW()),
(UUID(), 'Gấp đôi sao', 'Nhận gấp đôi sao trong 1 giờ', '⭐', 'power-up', 30, 'consumable', '{"powerUpType":"double_stars","duration":3600}', 1, NOW()),
(UUID(), 'Theme Tối', 'Giao diện tối bảo vệ mắt', '🌙', 'theme', 100, 'permanent', '{"themeId":"dark"}', 1, NOW()),
(UUID(), 'Theme Rừng nhiệt đới', 'Giao diện rừng xanh mát', '🌴', 'theme', 150, 'permanent', '{"themeId":"forest"}', 1, NOW());
