import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // log error if needed
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl bg-red-700 text-white p-6 mt-8 shadow-2xl flex flex-col items-center">
          <div className="font-bold text-lg mb-2">Leaderboard failed to load</div>
          <div className="text-base">{this.state.error?.message || "Unknown error."}</div>
        </div>
      );
    }
    return this.props.children;
  }
}
