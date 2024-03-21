import { FC } from "react";

export const NavigationBar: FC = () => {
  return (
    <div className="navigation-bar">
      <div className="nav-item logo">Collisum AI</div>
      <div className="nav-item">
        <a href="/">AI Interactive</a>
      </div>
      <div className="nav-item">
        <a href="/analytics">Analytics</a>
      </div>
      <div className="nav-item">
        <a href="/">Site Management</a>
      </div>
      <div className="nav-item">
        <a href="/">Explorer</a>
      </div>
      <div className="nav-item">
        <a href="/">Upload</a>
      </div>
    </div>
  );
};

