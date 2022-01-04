import PropTypes from "prop-types";
import { ModalDiv, Overlay } from "../styles/styled";

export default function Modal({ imgLink, onClick }) {
  return (
    <Overlay onClick={onClick}>
      <ModalDiv>
        <img src={imgLink} alt="" width="100%" />
      </ModalDiv>
    </Overlay>
  );
}

Modal.propTypes = {
  imgLink: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
