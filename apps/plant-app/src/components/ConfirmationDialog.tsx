import React from 'react';
import FormButton from "@plantApp/src/components/forms/forms-components/FormButton";

interface ConfirmationDialogProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-surface dark:bg-dark-surface text-onSurface dark:text-dark-onSurface p-6 rounded-lg shadow-lg w-1/3">
        {/* <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3> */}
        <p>{message}</p>
        <div className="flex justify-end gap-4 mt-4">
          <FormButton type="button" variant="primary" onClick={onConfirm}>
            Yes, Delete
          </FormButton>
          <FormButton type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </FormButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
