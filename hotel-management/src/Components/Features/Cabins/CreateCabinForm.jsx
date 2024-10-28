import PropTypes from 'prop-types';
import { useForm } from "react-hook-form"
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Buttons";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRows from "../../ui/FormRows";
import useCreateCabinHook from './useCreateCabinHook';
import useEditCabinHook from './useEditCabinHook';

function CreateCabinForm({ EditCabin = {}, onClicked }) { //CabinRows sy editcabin aya h
  const { id: Editid, ...EditValues } = EditCabin
  const isEdited = Boolean(Editid)
  const { register, handleSubmit, reset, getValues, formState } = useForm({ defaultValues: isEdited ? EditValues : {} })
  const { isLoading, mutate } = useCreateCabinHook()
  const { Editcabin, EditLoading } = useEditCabinHook()
  const { errors } = formState;
  console.log(errors);



  const isworking = isLoading || EditLoading
  const submithandler = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0]
    if (isEdited) Editcabin({ newCabin: { ...data, image }, id: Editid }, { onSuccess: () => { reset(); onClicked?.() } })
    else
      mutate({ ...data, image: image }, { onSuccess: () => { reset(), onClicked?.() } })
    // mutate(data)
    console.log(data);
  }
  const onErrorHandler = (err) => {
    console.log(err);
  }

  // console.log(getValues().regularPrice >= getValues().discount);
  // console.log(getValues().regularPrice);
  // console.log(getValues().discount);

  return (
    <Form onSubmit={handleSubmit(submithandler, onErrorHandler)} type={onClicked ? "modal" : "regular"}>
      {/* <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name", { required: "This field is required" })} />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow> */}
      <FormRows label="name" errors={errors?.name?.message}>
        <Input disabled={isworking} type="text" id="name" {...register("name", { required: "This field is required" })} />
      </FormRows>

      <FormRows label="maxCapacity" errors={errors?.maxCapacity?.message}>
        <Input disabled={isworking} type="number" id="maxCapacity" {...register("maxCapacity", { required: "This field is required", min: { value: 1, message: "MaxCapaity should be atleast 1" } })} />
      </FormRows>

      <FormRows label="regularPrice" errors={errors?.regularPrice?.message}>
        <Input disabled={isworking} type="number" id="regularPrice" {...register('regularPrice', { required: "This field is required", min: { value: 1, message: "Capacity should be atleast 1" } })} />
      </FormRows>

      <FormRows label="discount" errors={errors?.discount?.message}>
        <Input disabled={isworking} type="number" id="discount" defaultValue={0}  {...register('discount', { required: "This field is required", validate: getValues().discount <= getValues().regularPrice || "Discount should be less than the regular price" })} />
      </FormRows>

      <FormRows label="description" errors={errors?.description?.message}>
        <Textarea disabled={isworking} type="number" id="description" defaultValue=""  {...register('description', { required: "This field is required" })} />
      </FormRows>

      <FormRows label="Cabin Photo">
        <FileInput id="image" accept="image/*" type="file"
          {...register('image', { required: isEdited ? false : "This field is required" })} />
      </FormRows>

      <FormRows>
        {/* type is an HTML attribute! */}
        <Button $variations="secondary" type="reset" onClick={() => onClicked?.()}>
          Cancel
        </Button>
        <Button disabled={isworking}>{isEdited ? "Edit Cabin" : "Add cabin"}</Button>
      </FormRows>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  EditCabin: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,

  }),

  onClicked: PropTypes.func.isRequired,
};

export default CreateCabinForm;