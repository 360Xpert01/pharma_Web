import React from "react";

// LoaderOverlay using global color theme (CSS variables)
const LoaderOverlay: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all">
      <div className="flex flex-col items-center">
        {/* Animated spinner */}
        <div className="relative mb-6">
          <span
            className="animate-spin-slow block h-10 w-10 rounded-full border-4 border-b-primary border-l-transparent border-r-transparent border-t-primary sm:h-16 sm:w-16 md:h-20 md:w-20"
            style={{
              borderTopColor: "var(--color-primary, #2563eb)",
              borderBottomColor: "var(--color-primary, #2563eb)",
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
            }}
          ></span>
          <span
            className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 sm:h-8 sm:w-8 md:h-10 md:w-10"
            style={{
              backgroundColor: "var(--color-primary, #2563eb)",
            }}
          ></span>
        </div>
        <span
          className="animate-pulse text-xl font-extrabold tracking-wider drop-shadow-lg sm:text-2xl md:text-3xl"
          style={{
            color: "var(--color-on-primary, #fff)",
            textShadow: "0 2px 8px var(--color-primary, #2563eb)",
          }}
        >
          Floormaster
        </span>
      </div>
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .animate-spin-slow {
          animation: spin-slow 1.2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoaderOverlay;
