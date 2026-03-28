'use client'

export default function CardSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(15,23,41,0.7)',
        border: '1px solid rgba(0,245,255,0.06)',
      }}
    >
      {/* Image placeholder */}
      <div className="w-full aspect-[5/7] shimmer" />

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-4 rounded shimmer" style={{ width: '70%' }} />
        <div className="h-3 rounded shimmer" style={{ width: '50%' }} />

        <div className="flex justify-between items-center pt-1">
          <div className="h-5 rounded shimmer" style={{ width: '40%' }} />
          <div className="h-4 rounded shimmer" style={{ width: '30%' }} />
        </div>

        <div className="flex gap-2 pt-1">
          <div className="h-6 rounded-full shimmer" style={{ width: '60px' }} />
          <div className="h-6 rounded-full shimmer" style={{ width: '80px' }} />
        </div>
      </div>
    </div>
  )
}
