import React from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean,
};

class ErrorBoundary extends React.Component<Props, State> {
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
            <h1 className="code">500</h1>
            <h2 className="title">Internal Server Error</h2>
            <span className="description">We are sorry for the inconvenience. Please try to reload the page.</span>
            <button className="reload-button" onClick={this.handleReload}>
              Reload the page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary as React.ComponentType<Props>;
