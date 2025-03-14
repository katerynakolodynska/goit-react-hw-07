import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contactsSlice";

const ContactList = () => {
  const { error } = useSelector((state) => state.contacts);
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={s.list}>
      {filteredContacts.length > 0 && !error ? (
        filteredContacts?.map((contact) => (
          <li key={contact.id} className={s.contact}>
            <Contact contact={contact} />
          </li>
        ))
      ) : (
        <li>
          <p className={s.emptyList}>List is empty</p>
        </li>
      )}
    </ul>
  );
};

export default ContactList;
