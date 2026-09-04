import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  sectionName?: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SectionErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error(`[SectionErrorBoundary:${this.props.sectionName || "Unknown"}]`, error, errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full bg-slate-50 border-y border-slate-200 py-12 px-6 text-center">
          <div className="max-w-md mx-auto flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              {this.props.sectionName ? `${this.props.sectionName} Temporarily Unavailable` : "Content Temporarily Unavailable"}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              This manufacturing section encountered a minor display issue. All other operations are functioning normally.
            </p>
            <button
              type="button"
              onClick={this.handleRetry}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-navy-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-navy-900"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Retry Component</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SectionErrorBoundary;
