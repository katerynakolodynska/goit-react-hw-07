import s from "./Contact.module.css";
import { IoMdCall } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <ul className={s.list}>
        <li className={s.info}>
          <FaUser className={s.icon} />
          <p>{contact.name}</p>
        </li>
        <li className={s.info}>
          <IoMdCall className={s.icon} />
          <p>{contact.number}</p>
        </li>
      </ul>
      <button
        type="button"
        className={s.button}
        onClick={() => dispatch(deleteContact(contact.id))}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
