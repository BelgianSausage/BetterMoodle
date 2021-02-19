import './Navigation.css';

import IconButton from './IconButton';
import AuthService from '../api/AuthService';

import { Link, useHistory } from "react-router-dom";
import { faBell, faHome, faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

interface NavigationProps {
  currentPage?: string;
}

const Navigation = (props: NavigationProps): JSX.Element => {

  let history = useHistory();

  const signOut = () => {
    AuthService.instance.signOut().then(() => {
      history.push("/");
    });
  }

  const getLinkClass = (path: string): string => {
    return props.currentPage?.toLowerCase() === path.toLowerCase() ? "active" : "";
  }

  return (
    <div className="app-nav">
      <div className="app-nav__group">
        <IconButton icon={faHome} href="/dashboard" title="Dashboard" />
      </div>
      <div className="app-nav__group">
        <Link to="/schedule" className={getLinkClass("Schedule")}>Schedule</Link>
        <Link to="/timetable" className={getLinkClass("Timetable")}>Timetable</Link>
        <Link to="/modules" className={getLinkClass("Modules")}>Modules</Link>
        <Link to="/notes" className={getLinkClass("Notes")}>Notes</Link>
      </div>
      <div className="app-nav__group">
        <IconButton icon={faPlus} href={`${props.currentPage}/new`} title="New" />
        <IconButton icon={faBell} href="/notifications" title="Notifications" />
        <IconButton icon={faSignOutAlt} onClick={signOut} />
      </div>
    </div>
  )
}

export default Navigation;