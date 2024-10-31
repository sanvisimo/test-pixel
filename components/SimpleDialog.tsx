import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { PaymentButton } from "@/components/PaymentButton";

export interface SimpleDialogProps {
  open: boolean;
  onClose: (pixels: number) => void;
}

export function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;
  const [quantity, setQuantity] = useState(0);

  const handleClose = () => {
    onClose(0);
  };

  const handleSuccess = () => {
    onClose(quantity);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
      }}
    >
      <DialogTitle>ERASE THEM!</DialogTitle>
      <DialogContent>
        <DialogContentText>cancel one pixel for just 1$</DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="pixels"
          name="pixels"
          label="Pixels"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {!!quantity && (
          <PaymentButton
            key={quantity}
            pixels={quantity}
            onSuccess={handleSuccess}
          />
        )}
      </DialogActions>
    </Dialog>
  );
}
