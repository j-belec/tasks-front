import { useEffect, useState } from "react";

function TaskModalUpdate(props) {
  const [task, setTask] = useState({});

  useEffect(() => {
    console.log(props.listId);
    const getTask = async () => {
      const response = await fetch("http://localhost:3100/list/get-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId: props.taskId, listId: props.listId }),
      });

      const responseData = await response.json();

      setTask(responseData);

      // console.log(responseData);
    };
    getTask();
  }, [props.taskId, props.listId]);

  const handleClickParentDiv = (event) => {
    if (event.target === event.currentTarget) {
      props.onTaskHandler(props.index, false); //cierro el modal
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#0000007c] z-10"
      onClick={handleClickParentDiv}
    >
      <div className="flex flex-col w-[40vw]  bg-white rounded-[4px] py-[1.5rem] px-[2.5rem]">
        <h2 className="text-[2.2rem] font-medium pb-[1.5rem] mb-[3rem] border-b-[1px] border-[#0000001f]">
          Edit Task
        </h2>
        <form className="flex flex-col gap-[0.5rem] text-[2rem]">
          <p className="font-medium">Task Name</p>
          <input
            type="text"
            name="task-name"
            id=""
            className="h-[3.5rem] bg-[#e9ecef] rounded-[4px] px-[0.5rem] mb-[2rem]"
            value={task.name}
          />

          <p className="font-medium">Description</p>
          <textarea
            name="task-description"
            value={task.description}
            rows="8"
            className="bg-[#e9ecef] rounded-[4px] px-[0.5rem] mb-[2rem]"
          />

          <p className="font-medium">Status</p>
          <select
            name="select"
            className="h-[3.5rem] bg-[#e9ecef] rounded-[4px] mb-[2rem]"
          >
            <option value="value1">Open</option>
            <option value="value2">In progress</option>
            <option value="value3">Completed</option>
          </select>

          <p className="font-medium">Priority</p>
          <select
            name="select"
            className="h-[3.5rem] bg-[#e9ecef] rounded-[4px] mb-[4rem]"
          >
            <option value="value1">Low</option>
            <option value="value2">Medium</option>
            <option value="value3">High</option>
          </select>

          <div className="flex justify-end gap-[1.5rem] font-medium">
            <button
              type="button"
              className="w-[10rem] text-[1.6rem] text-white bg-[#3636367c] rounded-[4px] px-[1.6rem] py-[0.8rem] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
              onClick={() => props.onTaskHandler(props.index, false)}
            >
              Cancel
            </button>
            <button className="w-[10rem] text-[1.6rem] text-white bg-secondary-color rounded-[4px] px-[1.6rem] py-[0.8rem] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModalUpdate;
