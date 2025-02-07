

export default function Loading() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-[999]">
        <div className="flex flex-col items-center space-y-6">
                
          {/* Text animation with slide effect */}
          <h2 className="text-5xl font-extrabold text-white animate-slide-in">
            JUST DO IT
          </h2>
  
          {/* Progressive loading dots with Nike color scheme */}
          <div className="flex space-x-3 mt-8">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-4 h-4 rounded-full bg-gradient-to-br from-red-500 to-orange-400 animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  boxShadow: `0 0 12px rgba(255,${50 + (i * 50)},0,0.5)`
                }}
              />
            ))}
          </div>
  
          {/* Progress bar */}
          <div className="w-64 h-1.5 bg-gray-800 rounded-full mt-6 overflow-hidden">
            <div className="w-1/2 h-full bg-gradient-to-r from-red-500 to-orange-400 animate-progress" />
          </div>
        </div>
      </div>
    )
  }