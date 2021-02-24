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

/**
 * Render an icon button component with the desired icon.
 * If a href is provided then render the component inside a
 * link. 
 * 
 * @param props 
 */
const IconButton = (props: IconButtonProps): JSX.Element => {
  const element: JSX.Element = (
    <div className="app-icon-button" onClick={props.onClick}>
      <FontAwesomeIcon icon={props.icon} />
    </div>
  )

  return props.href ? <Link to={props.href} title={props.title}>{element}</Link> : element;
}

export default IconButton;