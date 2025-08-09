// 서버에서 데이터를 가져오는 느린 함수
async function getSlowData() {
  console.log('데이터 가져오기 시작...');
  
  // 3초 지연 시뮬레이션 (실제 API 호출 시뮬레이션)
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  console.log('데이터 가져오기 완료!');
  return {
    message: '서버에서 가져온 데이터입니다!',
    timestamp: new Date().toISOString(),
    servers: [
      { name: '웹서버-1', status: 'online', cpu: '45%' },
      { name: '데이터베이스', status: 'online', cpu: '67%' },
      { name: '캐시서버', status: 'maintenance', cpu: '12%' }
    ]
  };
}

// 서버 컴포넌트 (기본)
export default async function SlowServerPage() {
  // 이 부분에서 로딩이 표시됩니다!
  const data = await getSlowData();
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">느린 서버 페이지</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">서버 데이터</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{data.message}</p>
        <p className="text-sm text-gray-500 mb-6">로딩 시간: {data.timestamp}</p>
        
        <div className="space-y-3">
          <h3 className="font-medium">서버 목록:</h3>
          {data.servers.map((server, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <span className="font-medium">{server.name}</span>
              <div className="flex gap-4">
                <span className={`px-2 py-1 rounded text-xs ${
                  server.status === 'online' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {server.status}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-300">CPU: {server.cpu}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-blue-800 dark:text-blue-200">
          ✅ 이 페이지로 이동할 때 loading.tsx가 3초간 표시됩니다!
        </p>
      </div>
    </div>
  );
}
