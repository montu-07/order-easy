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
    if (this.state.hasError) return <div>Remote crashed</div>;
    return this.props.children;
  }
}

export default ErrorBoundary;