function TaskModalCreate(props) {
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const taskName = formData.get("task-name");
    const taskDescription = formData.get("task-description");
    const status = formData.get("status");
    const priority = formData.get("priority");

    if (taskName.length === 0) {
      return;
    }

    const dataToSend = {
      listId: props.listId,
      taskName: taskName,
      taskDescription: taskDescription,
      userId: props.userId,
      taskStatus: status,
      taskPriority: priority,
    };

    const response = await fetch("http://localhost:3100/list/create-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    const responseData = await response.json();

    console.log(responseData);

    props.onAddTaskHandler(false);
  };

  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#0000007c] font-medium">
      <div className="flex flex-col w-[40vw] h-[60vh] bg-[#e9ecef] rounded-[4px] py-[1.5rem] px-[2.5rem]">
        <h2 className="text-center text-[2rem] mb-[2rem] font-medium">
          {props.listName}
        </h2>
        <form
          className="flex flex-col gap-[0.8rem] h-[calc(100%-50px)]"
          onSubmit={submitHandler}
        >
          <p className="font-medium">Task Name</p>
          <input type="text" name="task-name" id="" className="mb-[2rem]" />

          <p className="font-medium">Description</p>
          <textarea name="task-description" rows="8" />

          <p className="font-medium">Status</p>
          <select name="status" className="mb-[1rem]">
            <option value="1">Open</option>
            <option value="2">In progress</option>
            <option value="3">Completed</option>
          </select>

          <p className="font-medium">Priority</p>
          <select name="priority" className="mb-[1rem]">
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>

          <div className="mt-auto flex justify-end gap-[1.5rem]">
            <button
              type="button"
              className="w-[10rem] bg-slate-600 px-[1.6rem] py-[0.8rem]"
              onClick={() => props.onAddTaskHandler(false)}
            >
              Cancel
            </button>
            <button className="w-[10rem] bg-slate-600 px-[1.6rem] py-[0.8rem]">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModalCreate;
