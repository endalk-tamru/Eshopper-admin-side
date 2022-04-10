import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import ContactMessages from "../components/ContactMessages";
import {
  fetchMessages,
  updateSeenMessages,
} from "../features/contacts/contactSlice";

const Contact = () => {
  const dispatch = useDispatch();
  const { isLoading, messages } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchMessages());

    return () => {
      dispatch(updateSeenMessages({ isSeen: true }));
    };
  }, [dispatch]);

  if (isLoading)
    return (
      <Typography variant="h3" component="h5">
        Loading...
      </Typography>
    );

  return (
    <>
      {messages.length > 0 ? (
        messages.map((msg) => <ContactMessages key={msg._id} msg={msg} />)
      ) : (
        <Typography variant="h5" component="h5">
          Message box is empty
        </Typography>
      )}
    </>
  );
};

export default Contact;
