import { IconBrandGithub } from "@tabler/icons-react";
import text from "../../locales/default.json"

function Header() {
  return (
    <nav>
      <div className="container">
        <div className="header-wrapper">
          <h1>{text.header.title}</h1>
          <span>{text.header.subtitle}</span>
        </div>
        <div className="socials-wrapper">
          <a href="https://github.com/dariodumlijan/project-status" target="_blank">
            <IconBrandGithub size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Header;
