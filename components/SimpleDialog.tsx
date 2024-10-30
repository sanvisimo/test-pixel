import {
     Button,
    Dialog,
    DialogActions, DialogContent, DialogContentText,
    DialogTitle,
     TextField
} from "@mui/material";



export interface SimpleDialogProps {
    open: boolean;
    onClose: (pixels: number) => void;
}


export function SimpleDialog(props: SimpleDialogProps) {
    const { onClose,  open } = props;

    const handleClose = () => {
        onClose(0);
    };

    const onPixelSelect =  (pixels: number) => {
        onClose(pixels);
    };


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData).entries());
                    const pixels = formJson.pixels;
                    console.log(pixels);

                    onPixelSelect(Number(pixels));
                },
            }}
        >
            <DialogTitle>Cancel woke culture!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To Cancel the woke please subscribe! <br />
                    1€ for pixel
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="pixels"
                    name="pixels"
                    label="pixels"
                    type="number"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
}
