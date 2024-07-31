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

  const handleClickParentDiv = (event) => {
    if (event.target === event.currentTarget) {
      props.onAddTaskHandler(false); //cierro el modal
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#0000007c]"
      onClick={handleClickParentDiv}
    >
      <div className="flex flex-col w-[40vw]  bg-white rounded-[4px] py-[1.5rem] px-[2.5rem]">
        <h2 className="text-[2.2rem] font-medium pb-[1.5rem] mb-[3rem] border-b-[1px] border-[#0000001f]">
          Create Task
        </h2>
        <form
          className="flex flex-col gap-[0.5rem] text-[2rem]"
          onSubmit={submitHandler}
        >
          <p className="">Task Name</p>
          <input
            type="text"
            name="task-name"
            id=""
            className="h-[3.5rem] bg-[#e9ecef] rounded-[4px] px-[0.5rem] mb-[2rem]"
          />

          <p className="">Description</p>
          <textarea
            name="task-description"
            rows="8"
            className="bg-[#e9ecef] rounded-[4px] px-[0.5rem] mb-[2rem]"
          />

          <p className="">Status</p>
          <select
            name="status"
            className="h-[3.5rem] bg-[#e9ecef] rounded-[4px] mb-[2rem]"
          >
            <option value="1">Open</option>
            <option value="2">In progress</option>
            <option value="3">Completed</option>
          </select>

          <p className="">Priority</p>
          <select
            name="priority"
            className="h-[3.5rem] bg-[#e9ecef] rounded-[4px] mb-[4rem]"
          >
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>

          <div className="flex justify-end gap-[1.5rem] font-medium">
            <button
              type="button"
              className="w-[10rem] text-[1.6rem] text-white bg-[#3636367c] rounded-[4px] px-[1.6rem] py-[0.8rem] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
              onClick={() => props.onAddTaskHandler(false)}
            >
              Cancel
            </button>
            <button className="w-[10rem] text-[1.6rem] text-white bg-secondary-color rounded-[4px] px-[1.6rem] py-[0.8rem] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModalCreate;
