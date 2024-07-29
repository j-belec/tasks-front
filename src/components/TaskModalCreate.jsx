function TaskModalCreate(props) {
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const taskName = formData.get("task-name");
    const taskDescription = formData.get("task-description");

    if (taskName.length === 0) {
      return;
    }

    const dataToSend = {
      listId: props.listId,
      taskName: taskName,
      taskDescription: taskDescription,
      userId: props.userId,
    };

    const response = await fetch("http://localhost:3100/list/create-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    const responseData = await response.json();

    props.manageTask(false);

    console.log(responseData);
  };

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[40vw] h-[60vh] text-[1.5rem] py-[2rem] px-[4rem] bg-slate-400">
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
        <textarea name="task-description" />
        <button className="mt-auto">Save</button>
      </form>
    </div>
  );
}

export default TaskModalCreate;
