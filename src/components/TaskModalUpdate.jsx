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
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[40vw] h-[60vh] text-[1.5rem] py-[2rem] px-[4rem] bg-slate-400">
      <h2 className="text-center text-[2rem] mb-[2rem] font-medium">
        {props.listName}
      </h2>
      <form className="flex flex-col gap-[0.8rem] h-[calc(100%-50px)]">
        <p className="font-medium">Task Name</p>
        <input
          type="text"
          name="task-name"
          id=""
          className="mb-[2rem]"
          value={task.name}
        />
        <p className="font-medium">Description</p>
        <textarea name="task-description" value={task.description} />
        <button className="mt-auto">Save</button>
      </form>
    </div>
  );
}

export default TaskModalUpdate;
