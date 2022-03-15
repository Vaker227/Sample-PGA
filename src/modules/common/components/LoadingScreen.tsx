import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-40 w-40 animate-spin rounded-full border-[6px] border-t-transparent"></div>
    </div>
  );
};

export default LoadingScreen;
