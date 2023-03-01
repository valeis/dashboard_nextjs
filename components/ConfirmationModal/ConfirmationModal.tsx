import React from "react";
import { UseMutationResult } from "react-query";
import { Button, Modal, Space } from "ebs-design";
import "./ConfirmationModal";
import { MdLeakRemove } from "react-icons/md";

type ConfirmationModalProps = {
  id?: string;
  title?: string;
  type?: string;
  setElementToDelete?: (id: string) => void;
  deleteElementHandler?: UseMutationResult<any, unknown, string, unknown>;
  setDeleting?: (type: boolean) => void;
  deleteComment?: any;
  setDeleteModalState?: (type: boolean) => void;
};

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const deleteElement = () => {
    if (props.type == "comment" || props.type == "reply") {
      props.deleteComment();
      props.setDeleteModalState!(false);
    } else {
      props.deleteElementHandler!.mutate(props.id!);
      props.setElementToDelete!("");
    }
  };

  const cancelDeleteComment = () => {
    props.setDeleting!(false);
    props.setDeleteModalState!(false);
  };

  return (
    <Modal
      closeOnClickOutside
      mask
      open
      size="small"
      title={
        props.type != "comment" && props.type !="reply"
          ? `Delete "${props.title?.substring(0, 26)} ${
              props.title!.length > 26 ? "..." : ""
            }" ?`
          : "Are you sure you want to delete this comment?\n This can't be undone."
      }
      onClose={() => {
        props.type == "comment" || props.type == "reply"
          ? cancelDeleteComment()
          : props.setElementToDelete!("");
      }}
      className="delete-confirmation-wrapper"
    >
      <div>
        <Modal.Content>
          <div className="btn-container">
            <button
              onClick={() => {
                props.type == "comment" || props.type == "reply"
                  ? cancelDeleteComment()
                  : props.setElementToDelete!("");
              }}
              className={`button-modal cancel-btn`}
            >
              NO, CANCEL
            </button>
            <button
              onClick={() => deleteElement()}
              className={`button-modal delete-btn`}
            >
              YES, DELETE
            </button>
          </div>
        </Modal.Content>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
