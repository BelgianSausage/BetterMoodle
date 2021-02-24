import './Panel.css';

const Panel = (props: any) => (
  <div className="app-panel">
    <div className="app-panel__wrapper">
      {props.children}
    </div>
  </div>
)

export default Panel;