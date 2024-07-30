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

      console.log(responseData);
    };
    getTask();
  }, [props.taskId, props.listId]);

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[40vw] h-[65vh] text-[1.5rem] py-[2rem] px-[4rem] bg-slate-400">
      <form className="flex flex-col gap-[0.8rem] h-[calc(100%-1rem)]">
        <p className="font-medium">Task Name</p>
        <input
          type="text"
          name="task-name"
          id=""
          className="mb-[1rem]"
          value={task.name}
        />

        <p className="font-medium">Description</p>
        <textarea
          name="task-description"
          value={task.description}
          rows="8"
          className="mb-[1rem]"
        />

        <p className="font-medium">Status</p>
        <select name="select" className="mb-[1rem]">
          <option value="value1">Open</option>
          <option value="value2">In progress</option>
          <option value="value3">Completed</option>
        </select>

        <p className="font-medium">Priority</p>
        <select name="select" className="mb-[1rem]">
          <option value="value1">Low</option>
          <option value="value2">Medium</option>
          <option value="value3">High</option>
        </select>

        <div className="mt-auto flex justify-end gap-[1.5rem]">
          <button
            type="button"
            className="w-[10rem] bg-slate-600 px-[1.6rem] py-[0.8rem]"
            onClick={() => props.onTaskHandler(props.index, false)}
          >
            Cancel
          </button>
          <button className="w-[10rem] bg-slate-600 px-[1.6rem] py-[0.8rem]">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskModalUpdate;
