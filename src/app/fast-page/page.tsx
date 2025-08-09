// 즉시 렌더링되는 페이지 (데이터 페칭 없음)
export default function FastPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">빠른 페이지</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">정적 컨텐츠</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          이 페이지는 서버에서 데이터를 가져오지 않기 때문에 즉시 로딩됩니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded">
            <h3 className="font-semibold text-green-800 dark:text-green-200">빠른 렌더링</h3>
            <p className="text-green-600 dark:text-green-300 text-sm">로딩 UI가 표시되지 않습니다</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200">즉시 사용 가능</h3>
            <p className="text-blue-600 dark:text-blue-300 text-sm">사용자가 바로 상호작용 가능</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-yellow-800 dark:text-yellow-200">
          ⚡ 이 페이지는 loading.tsx가 표시되지 않습니다 (즉시 렌더링)
        </p>
      </div>
    </div>
  );
}
