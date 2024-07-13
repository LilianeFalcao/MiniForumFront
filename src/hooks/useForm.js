import { useState } from "react";

const useForm = (initialValues) => {
    const [ form , setForm ] = useState(initialValues);

    const onChangeInputs = (e) => {
        const {name, value } = e.target;
        setForm({...form, [name]:value});
    };

    const clearInputs = () => {
        setForm(initialValues);
    };

    return { form, onChangeInputs, clearInputs };
};

export default useForm;
