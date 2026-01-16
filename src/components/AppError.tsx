export function AppError({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-400 text-4xl mb-4">⚠️</div>
        <h1 className="text-white text-xl font-bold mb-2">오류가 발생했습니다</h1>
        <p className="text-gray-400 text-sm">{message}</p>
      </div>
    </div>
  )
}
