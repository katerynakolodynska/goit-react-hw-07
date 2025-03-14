import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import s from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

const ContactForm = () => {
  const nameId = useId();
  const numberId = useId();
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    number: "",
    id: "",
  };

  const handleSubmit = (values, actions) => {
    const newContact = { ...values, id: nanoid() };
    dispatch(addContact(newContact));
    actions.resetForm();
  };

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required!")
      .min(3, "Too Short!")
      .max(50, "Too long"),
    number: Yup.string()
      .required("Required!")
      .matches(/^\d{3}-\d{2}-\d{2}$/, "Format: 123-23-23"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={s.form}>
        <div className={s.info}>
          <label htmlFor="nameId">Name</label>
          <Field className={s.field} type="text" name="name" id={nameId} />
          <ErrorMessage className={s.error} name="name" component="p" />
        </div>
        <div className={s.info}>
          <label htmlFor="numberId">Number</label>
          <Field className={s.field} type="text" name="number" id={numberId} />
          <ErrorMessage className={s.error} name="number" component="p" />
        </div>
        <button className={s.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
export default ContactForm;
