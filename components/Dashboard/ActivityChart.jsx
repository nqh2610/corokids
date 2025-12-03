'use client';

/**
 * ActivityChart - Biểu đồ hoạt động 7 ngày
 * Hiển thị số sao kiếm được mỗi ngày trong tuần
 */
export default function ActivityChart({ data = [], compact = false }) {
  // Tìm giá trị max để scale
  const maxStars = Math.max(...data.map(d => d.stars), 1);

  if (compact) {
    return (
      <div className="flex items-end justify-between gap-2 h-24">
        {data.map((item, index) => {
          const height = maxStars > 0 ? (item.stars / maxStars) * 100 : 0;
          const isToday = item.isToday;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <span className={`text-xs font-bold ${isToday ? 'text-purple-600' : 'text-gray-400'}`}>
                {item.stars > 0 ? item.stars : ''}
              </span>
              <div className="w-full h-16 flex items-end justify-center">
                <div 
                  className={`w-full max-w-[24px] rounded-t transition-all duration-500 ${
                    isToday 
                      ? 'bg-gradient-to-t from-purple-600 to-purple-400' 
                      : item.stars > 0 
                        ? 'bg-gradient-to-t from-blue-400 to-blue-300'
                        : 'bg-gray-200'
                  }`}
                  style={{ 
                    height: `${Math.max(height, item.stars > 0 ? 15 : 8)}%`,
                    minHeight: '4px'
                  }}
                />
              </div>
              <span className={`text-xs ${isToday ? 'text-purple-600 font-bold' : 'text-gray-400'}`}>
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">📊</span>
        Hoạt động 7 ngày qua
      </h3>
      
      <div className="flex items-end justify-between gap-2 h-40 sm:h-48">
        {data.map((item, index) => {
          const height = maxStars > 0 ? (item.stars / maxStars) * 100 : 0;
          const isToday = item.isToday;
          
          return (
            <div 
              key={index} 
              className="flex-1 flex flex-col items-center gap-2"
            >
              {/* Số sao */}
              <span className={`text-xs sm:text-sm font-bold ${isToday ? 'text-purple-600' : 'text-gray-500'}`}>
                {item.stars > 0 ? item.stars : ''}
              </span>
              
              {/* Cột */}
              <div className="w-full h-32 sm:h-40 flex items-end justify-center">
                <div 
                  className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ${
                    isToday 
                      ? 'bg-gradient-to-t from-purple-600 to-purple-400 shadow-lg shadow-purple-200' 
                      : item.stars > 0 
                        ? 'bg-gradient-to-t from-blue-500 to-blue-300'
                        : 'bg-gray-200'
                  }`}
                  style={{ 
                    height: `${Math.max(height, item.stars > 0 ? 10 : 5)}%`,
                    minHeight: '8px'
                  }}
                />
              </div>
              
              {/* Ngày */}
              <span className={`text-xs sm:text-sm font-medium ${
                isToday ? 'text-purple-600 font-bold' : 'text-gray-500'
              }`}>
                {item.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-t from-purple-600 to-purple-400"></div>
          <span className="text-gray-600">Hôm nay</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-t from-blue-500 to-blue-300"></div>
          <span className="text-gray-600">Các ngày khác</span>
        </div>
      </div>
    </div>
  );
}
