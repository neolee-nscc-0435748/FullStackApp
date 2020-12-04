import restService from "../services/restService";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const DeleteForm = (props) => {
  const deleteProcess = () => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this homework?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            restService.deleteHomework(props.location.aboutProps._id, result => {
              if (!result) {
                alert("Delete a homework is failed!!!");
              }
              // else {
              //   alert("Delete a homework successfully!!!");
              // }
              props.history.goBack();
            });
          }
        },
        {
          label: 'No',
          onClick: () => props.history.goBack()
        }
      ]
    });
  }

  return (
    <>
      { deleteProcess() }
    </>
  );
}

export default DeleteForm;
