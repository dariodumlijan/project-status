import text from "../locales/default.json"

function Header() {
  return (
    <nav>
      <div className="container">
        <div className="header-wrapper">
          <h1>{text.header.title}</h1>
          <span>{text.header.subtitle}</span>
        </div>
        <div className="theme-wrapper"></div>
      </div>
    </nav>
  );
}

export default Header;
