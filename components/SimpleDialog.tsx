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
  const [quantity, setQuantity] = useState("1");

  const handleClose = () => {
    setQuantity("1");
    onClose(0);
  };

  const handleSuccess = () => {
    setQuantity("1");
    onClose(Number(quantity));
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
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {!!quantity && (
          <PaymentButton
            key={quantity}
            pixels={Number(quantity)}
            onSuccess={handleSuccess}
          />
        )}
      </DialogActions>
    </Dialog>
  );
}
