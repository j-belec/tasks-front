import {
  getStatus,
  getStatusColor,
  getPriority,
  getPriorityColor,
} from "../utilities/taskUtilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function Task(props) {
  let statusColor = getStatusColor(props.status);
  let priorityColor = getPriorityColor(props.priority);

  return (
    <div className="w-[100%] h-[4rem] bg-white mx-auto flex items-center justify-between rounded-[4px] hover:cursor-pointer px-[5rem] font-medium shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] transition-transform duration-300 transform hover:scale-[1.01]">
      <p className="text-[1.8rem]">{props.name}</p>
      <div className="flex items-center gap-[2rem]">
        <p
          className="text-[1.4rem] w-[8.5rem] text-white text-center px-[0.5rem] py-[0.2rem] rounded-[4px]"
          style={{ backgroundColor: statusColor }}
        >
          {getStatus(props.status)}
        </p>
        <p
          className="text-[1.4rem] w-[8.5rem] text-center text-white px-[0.5rem] py-[0.2rem] rounded-[4px]"
          style={{ backgroundColor: priorityColor }}
        >
          {getPriority(props.priority)}
        </p>
        <FontAwesomeIcon
          icon={faTrashCan}
          className="trash-can text-[1.8rem] text-[#6d6d6d] hover:text-[#ff282879] transition-all duration-200 p-[0.5rem]"
          onClick={() => props.onDeleteTaskHandler(props.index, true)}
        />
      </div>
    </div>
  );
}

export default Task;
