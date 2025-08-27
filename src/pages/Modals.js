import React from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";

// Controlled modal component. Provide `isOpen`, `onClose`, `header`, and `body` props.
function Modals({
  isOpen = false,
  onClose = () => {},
  header = null,
  body = null,
  mode = null, // "detail" or "delete"
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>{body}</ModalBody>
        {mode ? (
          <ModalFooter>
            <div className="hidden sm:block">
              <Button layout="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
            <div className="hidden sm:block">
              {mode === "delete" ? (
                <Button
                  style={{ backgroundColor: "#ef4444" }}
                  className="text-white hover:bg-red-600"
                >
                  Delete
                </Button>
              ) : null}
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              {mode === "delete" ? (
                <Button
                  style={{ backgroundColor: "#ef4444" }}
                  className="text-white w-full hover:bg-red-600"
                >
                  Delete
                </Button>
              ) : null}
            </div>
          </ModalFooter>
        ) : null}
      </Modal>
    </>
  );
}

export default Modals;
