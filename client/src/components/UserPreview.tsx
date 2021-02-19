import './UserPreview.css';

import { Link } from 'react-router-dom';
import { IUser } from '../api/Interfaces';

const UserPreview = (props: IUser): JSX.Element => (
  <Link to={props.slug}>
    <div className="app-user-preview">
      <div className="app-user-preview__picture"></div>
      <div className="app-user-preview__details">
        <div>{props.firstName} {props.lastName}</div>
        <div>Member since: {props.createdAt?.toLocaleDateString()}</div>
      </div>
    </div>
  </Link>
)

export default UserPreview;