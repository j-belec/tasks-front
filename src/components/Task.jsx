import {
  getStatus,
  getStatusColor,
  getPriority,
  getPriorityColor,
} from "../utilities/taskUtilities";

function Task(props) {
  let statusColor = getStatusColor(props.status);
  let priorityColor = getPriorityColor(props.priority);

  return (
    <div className="w-[100%] h-[4rem] bg-white mx-auto flex items-center justify-between rounded-[4px] hover:cursor-pointer px-[5rem] font-medium">
      <p className="text-[1.8rem]">{props.name}</p>
      <div className="flex gap-[2rem]">
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
      </div>
    </div>
  );
}

export default Task;
