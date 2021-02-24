import './UserPreview.css';

import { Link } from 'react-router-dom';
import { IUser } from '../api/Interfaces';

interface UserPreviewProps extends IUser {
  className?: string;
}

/**
 * Render a user preview component. This appears as a card
 * which a preview of user details. When clicked the card will
 * redirect to the user profile. 
 * 
 * @param props 
 */
const UserPreview = (props: UserPreviewProps): JSX.Element => (
  <Link to={props.slug}>
    <div className={`app-user-preview ${props.className}`}>
      <div className="app-user-preview__picture"></div>
      <div className="app-user-preview__details">
        <div>{props.firstName} {props.lastName}</div>
        <div>Member since: {props.createdAt?.toLocaleDateString()}</div>
      </div>
    </div>
  </Link>
)

export default UserPreview;