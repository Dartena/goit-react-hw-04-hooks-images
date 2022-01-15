import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { ModalDiv, Overlay } from "../styles/styled";
import Loader from "../Loader/Loader";

const modalRoot = document.getElementById("modal-root");
export default function Modal({
  imgLink,
  closeModalHandle,
  loading,
  loaderSize,
  onLoad,
}) {
  useEffect(() => {
    window.addEventListener("keydown", escKeyHandle);
    return () => {
      window.removeEventListener("keydown", escKeyHandle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const escKeyHandle = (event) => {
    if (event.keyCode === 27) {
      closeModalHandle();
    }
  };

  return createPortal(
    <Overlay onClick={closeModalHandle}>
      <Loader loading={loading} size={loaderSize} />
      <ModalDiv>
        <img
          src={imgLink}
          alt=""
          width="100%"
          onLoad={onLoad}
          style={{ display: loading ? "none" : "block" }}
        />
      </ModalDiv>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  imgLink: PropTypes.string.isRequired,
  closeModalHandle: PropTypes.func.isRequired,

  loading: PropTypes.bool.isRequired,
  loaderSize: PropTypes.number.isRequired,
  onLoad: PropTypes.func.isRequired,
};
