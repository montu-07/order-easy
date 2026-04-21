import React from "react";

class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.error("Remote Error:", error);
  }

  render() {
    if (this.state.hasError) return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 font-semibold text-lg mb-2">Remote Component Error</div>
        <div className="text-red-500">The remote component failed to load. Please try refreshing the page.</div>
      </div>
    );
    return this.props.children;
  }
}

export default ErrorBoundary;