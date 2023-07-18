"use client";

import { Form } from "react-bootstrap";
import ReactModal from "react-modal";

const DeleteScheduleConfirmationModal = ({
  handle_modal_close_callback,
  all_schedules_data,
  pk_modal_state_pair,
}) => {
  let local_schedule_name = all_schedules_data.has(pk_modal_state_pair.pk)
    ? all_schedules_data.get(pk_modal_state_pair.pk).schedule_name
    : "";

  const deleteChangesButtonHandler = () => {
    handle_modal_close_callback(true, pk_modal_state_pair.pk);
  };

  const handleFormSubmitWithEnter = (e) => {
    e.preventDefault();
    handle_modal_close_callback(false);
  };

  const handleRequestCloseFunc = () => {
    handle_modal_close_callback(false);
  };

  return (
    <ReactModal
      isOpen={pk_modal_state_pair.modal_state}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={handleRequestCloseFunc}
      ariaHideApp={false}
      /* Above is a boolean indicating if the appElement should be hidden. Default true. Searched for other
           solutions but they are a pain and I don't see any particular problem with this being false */
      overlayClassName={"saveschedulemodaloverlay"}
      className={"saveschedulemodal"}
    >
      <Form onSubmit={handleFormSubmitWithEnter}>
        <Form.Group className="saveScheduleFormGroup">
          <Form.Label>
            Delete this schedule?
            <br />
            &quot;{local_schedule_name}&quot;
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <button
            className="saveChangesButton"
            onClick={() => handle_modal_close_callback(false)}
          >
            Cancel
          </button>
          <button
            className="saveChangesButton"
            onClick={deleteChangesButtonHandler}
          >
            Delete Schedule
          </button>
        </Form.Group>
      </Form>
    </ReactModal>
  );
};

export default DeleteScheduleConfirmationModal;
