import Button from "./Buttons";
import Modal from "./Modal";
import CreateCabinForm from "../Features/Cabins/CreateCabinForm";
import CabinTable from "../Features/Cabins/CabinTable"


const AddButton = () => {
    return (
        <Modal>
            <Modal.Open opens="cabin-form" >
                <Button>Add New Cabin</Button>
            </Modal.Open>
            <Modal.Window name='cabin-form'>
                <CreateCabinForm />
            </Modal.Window>
            <Modal.Open opens="table" >
                <Button>Add New Cabin</Button>
            </Modal.Open>
            <Modal.Window name='table'>
                <CabinTable />
            </Modal.Window>
        </Modal>
    )
}

export default AddButton



// const AddButton = () => {
//     const [showform, setshowform] = useState(false)
//     return (
//         <>
//             <Button $variations="primary"
//                 onClick={() => {
//                     setshowform(!showform);
//                 }}>
//                 Add New Cabin
//             </Button>
//             {showform && <Modal onClick={() => setshowform(false)}><CreateCabinForm onClicked={() => setshowform(false)} /></Modal>}
//         </>
//     )
// }
