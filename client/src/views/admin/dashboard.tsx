const adminDashboard = (): JSX.Element => (
  <div>
    <ul>
      <h3>Modules</h3>
      <li><a className="link" href="/admin/modules/all">All modules</a></li>
      <li><a className="link" href="/admin/modules/new">New module</a></li>
    </ul>
    <ul>
      <h3>Lessons</h3>
      <li><a className="link" href="/admin/lessons/all">All lessons</a></li>
      <li><a className="link" href="/admin/lessons/new">New lesson</a></li>
    </ul>
    <ul>
      <h3>Users</h3>
      <li><a className="link" href="/admin/users/all">All users</a></li>
      <li><a className="link" href="/admin/users/new">New user</a></li>
    </ul>
  </div>
)

export default adminDashboard;