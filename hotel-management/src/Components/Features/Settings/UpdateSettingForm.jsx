import Form from '../../ui/Form';
import FormRow from "../../ui/FormRows";
import Input from "../../ui/Input";
import Spinner from '../../ui/Spinner';
import useSettingsHook from './useSettingsHook';
import useUpdateSettingHook from './useUpdateSettingHook';

function UpdateSettingsForm() {
    const { isLoading, data: {
        minBookingLength,
        maxBookingLength,
        maxGuestPerBooking,
        breakFastPrice,
    } = {}
    } = useSettingsHook()

    const { mutate, isLoading: UpdatLoading } = useUpdateSettingHook()
    if (isLoading) return <Spinner />

    const minHnadledata = (e, Field) => {
        const data = e.target.value;
        console.log(data);
        if (!data) return;
        mutate({ [Field]: data })
    }

    return (
        <Form>
            <FormRow label='Minimum nights/booking'>
                <Input type='number' id='min-nights' defaultValue={minBookingLength} onBlur={(e) => minHnadledata(e, "minBookingLength")} disabled={UpdatLoading} />
            </FormRow>
            <FormRow label='Maximum nights/booking'>
                <Input type='number' id='max-nights' defaultValue={maxBookingLength} onBlur={(e) => minHnadledata(e, "maxBookingLength")} disabled={UpdatLoading} />
            </FormRow>
            <FormRow label='Maximum guests/booking'>
                <Input type='number' id='max-guests' defaultValue={maxGuestPerBooking} onBlur={(e) => minHnadledata(e, "maxGuestPerBooking")} disabled={UpdatLoading} />
            </FormRow>
            <FormRow label='Breakfast price'>
                <Input type='number' id='breakfast-price' defaultValue={breakFastPrice} onBlur={(e) => minHnadledata(e, "breakFastPrice")} disabled={UpdatLoading} />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;