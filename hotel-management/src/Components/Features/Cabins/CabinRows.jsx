import PropTypes from 'prop-types';
import styled from "styled-components";
import { useState } from 'react';
import useCreateCabinHook from './useCreateCabinHook';
import useCabinDeleteHook from './useCabinDeleteHook';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import CreateCabinForm from './CreateCabinForm';
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;



const MenuRows = ({ cabin }) => {
  const [showForm, setShowForm] = useState(false)
  const { isLoading: isDeleting, mutate: DeleteCabin } = useCabinDeleteHook();
  const { isLoading: isCreating, mutate: createCabin } = useCreateCabinHook();
  if (!cabin) return null;

  const { id, image, name, maxCapacity, regularPrice, discount, description } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }
  return (
    <>
      <TableRow className="flex flex-row items-center justify-between border-b">
        <Img className="w-20 h-20" src={image} alt={name} />
        <Cabin className="py-2 px-6">{name}</Cabin>
        <div className="py-2 px-6">{maxCapacity}</div>
        <Price className="py-2 px-6">{regularPrice}</Price>
        <Discount className="py-2 px-6">{discount}</Discount>

        <div>
          <button disabled={isCreating} onClick={handleDuplicate}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm((show) => !show)}>
            <HiPencil />
          </button>
          <button onClick={() => DeleteCabin(id)} disabled={isDeleting}>
            <HiTrash />
          </button>
        </div>
      </TableRow >
      {showForm && <CreateCabinForm cabinToEdit={cabin} />
      }
    </>
  );
}

MenuRows.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    quantityavailable: PropTypes.number.isRequired,
  }).isRequired,
};

export default MenuRows;
