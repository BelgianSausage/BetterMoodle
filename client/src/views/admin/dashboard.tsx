const adminDashboard = (): JSX.Element => (
  <div>
    <ul>
      <h3>Modules</h3>
      <li><a className="link" href="/admin/modules/all">All modules</a></li>
      <li><a className="link" href="/admin/modules/new">New module</a></li>
    </ul>
  </div>
)

export default adminDashboard;