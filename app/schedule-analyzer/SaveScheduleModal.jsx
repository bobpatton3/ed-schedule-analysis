"use client";

import { Form } from "react-bootstrap";
import ReactModal from "react-modal";

const SaveScheduleModal = ({
  modal_state,
  handle_modal_close_callback,
  current_schedule_name,
}) => {
  let local_schedule_name = current_schedule_name;

  const handleScheduleNameChange = (e) => {
    local_schedule_name = e.target.value;
  };

  const handleFormSubmitWithEnter = (e) => {
    e.preventDefault();
    handle_modal_close_callback(true, local_schedule_name);
  };

  const handleRequestCloseFunc = () => {
    handle_modal_close_callback(false);
  };

  return (
    <ReactModal
      isOpen={modal_state}
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
          <Form.Label>Save Schedule With Name:</Form.Label>
          <Form.Control
            type="text"
            defaultValue={local_schedule_name}
            onChange={handleScheduleNameChange}
          />
        </Form.Group>
        <Form.Group>
          <button
            type="button"
            className="saveChangesButton"
            onClick={() => handle_modal_close_callback(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="saveChangesButton"
          >
            Save Schedule
          </button>
        </Form.Group>
      </Form>
    </ReactModal>
  );
};

export default SaveScheduleModal;
