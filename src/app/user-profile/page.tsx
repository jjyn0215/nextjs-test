// 실제 API 호출 시뮬레이션
async function fetchUserData() {
  console.log('🚀 API 호출 시작...');
  
  // 실제 API 호출처럼 시간이 걸리는 작업
  const response = await new Promise<{
    user: { name: string; email: string };
    posts: { id: number; title: string }[];
    stats: { views: number; likes: number };
  }>(resolve => {
    setTimeout(() => {
      resolve({
        user: { name: '김철수', email: 'kim@example.com' },
        posts: [
          { id: 1, title: '첫 번째 포스트' },
          { id: 2, title: '두 번째 포스트' }
        ],
        stats: { views: 1234, likes: 56 }
      });
    }, 2000); // 2초 대기
  });
  
  console.log('✅ API 호출 완료!');
  return response;
}

// 이 컴포넌트는 fetch가 완료되어야만 렌더링됩니다
export default async function UserProfilePage() {
  console.log('⏳ 페이지 렌더링 시작...');
  
  // 이 await가 완료될 때까지 loading.tsx가 표시됩니다!
  const userData = await fetchUserData();
  
  console.log('🎉 페이지 렌더링 완료!');
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">사용자 프로필</h1>
      
      {/* fetch 완료 후에만 이 내용이 표시됩니다 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">사용자 정보</h2>
        <p><strong>이름:</strong> {userData.user.name}</p>
        <p><strong>이메일:</strong> {userData.user.email}</p>
        
        <h3 className="text-md font-semibold mt-6 mb-2">포스트 목록</h3>
        <ul className="space-y-2">
          {userData.posts.map((post: { id: number; title: string }) => (
            <li key={post.id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
              {post.title}
            </li>
          ))}
        </ul>
        
        <div className="mt-6 flex gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
            <span className="font-semibold">조회수:</span> {userData.stats.views}
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
            <span className="font-semibold">좋아요:</span> {userData.stats.likes}
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-yellow-800 dark:text-yellow-200">
          💡 이 모든 내용은 2초간의 API 호출이 완료된 후에만 표시됩니다!
        </p>
      </div>
    </div>
  );
}
