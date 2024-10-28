import styled from "styled-components"
import Logo from "./Logo"
import MainNav from "./MainNav"
const Aside = styled.aside`
    background-color: var(--color-grey-0);
    padding: 2rem;
    grid-row: 1/-1;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
`

const Sidebar = () => {
    return (
        <Aside>
            <Logo />
            <MainNav />

        </Aside>
    )
}

export default Sidebar