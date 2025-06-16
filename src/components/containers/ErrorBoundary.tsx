import { Component } from 'react';
import text from "../../locales/default.json"

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean,
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  handleReload() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-wrapper">
          <div className="error-boundary-content">
            <h1 className="code">{text.error.code}</h1>
            <h2 className="title">{text.error.title}</h2>
            <span className="description">{text.error.message}</span>
            <button className="reload-button" onClick={this.handleReload}>
              {text.error.action}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary as React.ComponentType<Props>;
