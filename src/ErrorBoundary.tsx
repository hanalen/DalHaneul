import React, { useEffect, useState } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface CustomFallbackProps {
  error: ErrorEvent;
  resetErrorBoundary: () => void;
}

const CustomFallback: React.FC<CustomFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div>
      <h1>에러가 발생했습니다.</h1>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </div>
  );
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.log('에러가 발생했습니다:', error.error);
      setHasError(true);
    };

    // 에러 이벤트 리스너 등록
    window.addEventListener('error', errorHandler);

    // 컴포넌트가 언마운트되면 리스너 제거
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  const resetErrorBoundary = () => {
    setHasError(false);
  };

  return hasError ? (
    <CustomFallback
      error={new ErrorEvent('')}
      resetErrorBoundary={resetErrorBoundary}
    />
  ) : (
    <>{children}</>
  );
};

export { ErrorBoundary };
