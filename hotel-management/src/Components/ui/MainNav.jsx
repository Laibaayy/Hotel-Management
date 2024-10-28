import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineCalendar, HiOutlineCog, HiOutlineHome, HiOutlineUser, HiOfficeBuilding } from "react-icons/hi";
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;



export default function MainNav() {
  return (
    <NavList>
      <ul>
        <li>
          <StyledNavLink to="Dashboard"><HiOutlineHome /><span>Home</span></StyledNavLink>
          <StyledNavLink to="Booking"><HiOutlineCalendar /><span>Booking</span></StyledNavLink>
          <StyledNavLink to="Cabins"><HiOfficeBuilding /><span>Cabins</span></StyledNavLink>
          <StyledNavLink to="User"><HiOutlineUser /><span>Users</span></StyledNavLink>
          <StyledNavLink to="Setting"><HiOutlineCog /><span>Settings</span></StyledNavLink>
        </li>
      </ul>
    </NavList>
  )
}
