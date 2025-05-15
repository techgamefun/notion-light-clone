import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    // Hide cursor globally
    document.body.style.cursor = "none";

    // Cleanup: Restore cursor when unmounted
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default Loading;
