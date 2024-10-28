import styled from "styled-components";
import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;


const MenuContext = createContext()
const Menus = ({ children }) => {
  const [CurrentOpenID, setCurrentOpenID] = useState("")
  const [positionsss, setpositionsss] = useState("")
  const close = () => setCurrentOpenID("")
  const open = setCurrentOpenID
  return (
    <MenuContext.Provider value={{ CurrentOpenID, close, open, positionsss, setpositionsss }}>
      {children}
    </MenuContext.Provider>
  )
}

function Toggle({ id }) {
  const { CurrentOpenID, close, open, setpositionsss } = useContext(MenuContext)
  const handlingclick = (e) => {
    const rect = e.target.closest("button").getBoundingClientRect()
    console.log(rect);
    setpositionsss({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8
    })
    CurrentOpenID === "" || CurrentOpenID !== id ? open(id) : close()
  }

  return <StyledToggle onClick={handlingclick}>
    <HiEllipsisVertical />
  </StyledToggle>
}



function List({ id, children }) {
  const { CurrentOpenID, positionsss } = useContext(MenuContext)
  if (CurrentOpenID !== id) return null;
  return (
    <StyledList position={positionsss}>{children}</StyledList>
  )
}



function Button({ children, onClick, icon }) {
  const { close } = useContext(MenuContext)
  const buttonhandleclick = () => {
    onClick?.()
    close()
  }
  return <li>
    <StyledButton onClick={buttonhandleclick}>
      {icon}<span>{children}</span>
    </StyledButton>
  </li>
}


Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button


Menus.propTypes = {
  children: PropTypes.node.isRequired,
};

Toggle.propTypes = {
  id: PropTypes.string.isRequired,
};

List.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.node,

};
export default Menus