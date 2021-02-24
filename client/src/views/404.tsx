import './404.css';

import { Link } from "react-router-dom";

const NotFoundErrorView = (): JSX.Element => (
  <div className="app" id="not-found-error">
    <div className="app-page">
      <h1>404!</h1>
      <p>
        The requested resource could not be found. <Link className="link" to="/">Return home</Link>
      </p>
    </div>
  </div>
)

export default NotFoundErrorView;