import { useState } from "react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "../dialog";
import { Button } from "../button";
import { MdDelete } from "react-icons/md";

export const ConfirmationDialog = ({
  message,
  onConfirm,
  buttonText = "Open",
  buttonStyle = "",
  buttonVariant = "default",
  showIcon = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);

  const closeDialog = () => setIsOpen(false);

  return (
    <>
      {!isOpen && (
        <Button
          variant={buttonVariant}
          onClick={openDialog}
          className={cn("", buttonStyle)}
        >
          {<MdDelete />} {buttonText}
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-50" />
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
          <DialogTitle className="text-xl font-semibold mb-4">
            Confirm Action
          </DialogTitle>
          <p className="mb-4 text-gray-700">{message}</p>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
              onClick={closeDialog}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={() => {
                onConfirm();
                closeDialog();
              }}
            >
              Confirm
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
