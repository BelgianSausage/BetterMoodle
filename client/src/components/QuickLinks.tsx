import './QuickLinks.css';

import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface QuickLink {
  slug: string;
  title: string;
}

interface QuickLinkProps {
  links: QuickLink[];
  prefix?: string;
}

const QuickLinks = (props: QuickLinkProps): JSX.Element => {

  const limitCharacters = (str: string, length: number): string => {
    if (str.length === 0) return "";
    if (str.length < length) return str;
    return str.substring(0, length) + "...";
  }

  return (
    <div className="app-quick-links">
      <h3>Quick links</h3>
      {
        props.links.map((m: QuickLink, n: number) => {
          return (
            <Link key={n} to={`${props.prefix || ""}${m.slug}`} title={m.title}>
              <div className="app-link">
                <FontAwesomeIcon icon={faHashtag} />
                <div>{limitCharacters(m.title, 30)}</div>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}

export default QuickLinks;