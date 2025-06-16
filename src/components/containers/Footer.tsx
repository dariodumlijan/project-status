import text from "../../locales/default.json"

function Footer() {
  return (
    <footer>
      <div className="container">
        <span>{text.header.title} &copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

export default Footer;
