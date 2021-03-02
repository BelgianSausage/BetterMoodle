import './Navigation.css';

import IconButton from './IconButton';
import AuthService from '../api/AuthService';

import { Link, useHistory } from "react-router-dom";
import { faBell, faCog, faHome, faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

interface NavigationProps {
  currentPage?: string;
}

/**
 * Render the navigation bar, with the link representing the current
 * navigation context highlighted. 
 * 
 * TO-DO: Allow customisable central links based off children or a prop.
 * 
 * @param props 
 */
const Navigation = (props: NavigationProps): JSX.Element => {

  /**
   * Access the history hook to force navigation on sign out.
   */
  let history = useHistory();

  /**
   * Sign out through the auth service so page request will no longer
   * be authenticated, then redirect to the signin page.
   *  
   */
  const signOut = () => {
    AuthService.instance.signOut().then(() => {
      history.push("/");
    });
  }

  /**
   * Determine which of the central links should be highlighted
   * based on the context of the navigation.
   * 
   * @param path 
   */
  const getLinkClass = (path: string): string => {
    return props.currentPage?.toLowerCase() === path.toLowerCase() ? "active" : "";
  }

  return (
    <div className="app-nav">
      <div className="app-nav__group">
        <IconButton icon={faHome} href="/dashboard" title="Dashboard" />
      </div>
      <div className="app-nav__group">
        <Link to="/timetable" className={getLinkClass("Timetable")}>Timetable</Link>
        <Link to="/modules" className={getLinkClass("Modules")}>Modules</Link>
        <Link to="/notes" className={getLinkClass("Notes")}>Notes</Link>
      </div>
      <div className="app-nav__group">
        <IconButton icon={faPlus} href={`/notes/new`} title="Add new note" />
        <IconButton icon={faCog} href="/settings" title="Settings" />
        <IconButton icon={faSignOutAlt} onClick={signOut} />
      </div>
    </div>
  )
}

export default Navigation;