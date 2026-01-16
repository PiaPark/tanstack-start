export function AppLoading() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-400">앱 정보 로딩 중...</p>
      </div>
    </div>
  )
}
