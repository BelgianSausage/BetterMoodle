import './IconButton.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface IconButtonProps {
  icon: IconDefinition;
  href?: string;
  title?: string;
  onClick?: () => void;
}

const IconButton = (props: IconButtonProps): JSX.Element => {
  const element: JSX.Element = (
    <div className="app-icon-button" onClick={props.onClick}>
      <FontAwesomeIcon icon={props.icon} />
    </div>
  )

  return props.href ? <Link to={props.href} title={props.title}>{element}</Link> : element;
}

export default IconButton;