import styled from "styled-components";
import PropTypes from 'prop-types';
import { useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { cloneElement, createContext, useContext } from "react";
import { useEffect } from "react";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext()
function Modal({ children }) {
  const [OpenName, setOpenName] = useState("")
  const close = () => setOpenName("")
  const open = setOpenName;
  return <ModalContext.Provider value={{ OpenName, close, open }}>
    {children}
  </ModalContext.Provider>
}


function Open({ children, opens }) {
  const { open } = useContext(ModalContext)
  return cloneElement(children, { onClick: () => open?.(opens) })
}

const Window = ({ children, name }) => {
  const { OpenName, close } = useContext(ModalContext)
  const reff = useRef()
  useEffect(() => {
    function handleclick(e) {
      if (reff.current && !reff.current.contains(e.target)) {
        console.log("khj");
        close()
      }
    }
    document.addEventListener("Click", handleclick, true)

    return () => document.removeEventListener("Click", handleclick, true)
  }, [close, reff])
  if (name !== OpenName) return null
  return (
    <Overlay>
      <StyledModal ref={reff}>
        <Button onClick={close}><HiXMark /></Button>
        <div>{cloneElement(children, { onClicked: close })}</div>
      </StyledModal>

    </Overlay>
  )
}

Modal.Open = Open;
Modal.Window = Window;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

Window.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};
export default Modal


