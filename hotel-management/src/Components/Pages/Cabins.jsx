
import CabinTable from "../Features/Cabins/CabinTable";
import CabinTableOperation from "../Features/Cabins/CabinTableOperation";
import AddButton from "../ui/AddButton";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
function Cabins() {


    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <CabinTableOperation />
            </Row>
            <Row>
                <CabinTable />
                <AddButton />
            </Row >
        </>
    );
}

export default Cabins;