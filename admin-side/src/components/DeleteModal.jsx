import { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: 400 },
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({ deleteItem, title }) {
  const { isLoading } = useSelector((state) => state.products);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton
        color="error"
        onClick={handleOpen}
        aria-label="delete product"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete
          </Typography>

          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            {title}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancle
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={isLoading}
              onClick={deleteItem}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
