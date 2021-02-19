import './Modal.css';

const Modal = (props: any): JSX.Element => (
  <div className="overlay">
    <div className="modal">
      {props.children}
    </div>
  </div>
)

export default Modal;