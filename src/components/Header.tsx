import Logo from '../assets/images/logo.png';

function Header() {
  return (
    <nav className="header-wrapper">
      <div className="logo-wrapper">
        <img src={Logo} alt="logo" />
      </div>
    </nav>
  );
}

export default Header;
