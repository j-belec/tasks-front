function ListModalDelete(props) {
  const handleClickParentDiv = (event) => {
    if (event.target === event.currentTarget) {
      props.onDeleteListHandler(props.index, false); //cierro el modal
    }
  };

  console.log(props.listId);

  const deleteTask = async () => {
    const response = await fetch("http://localhost:3100/list/delete-list", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listId: props.listId }),
    });

    const responseData = await response.json();

    props.onDeleteListHandler(props.index, false);

    props.onDecreaseAmountTasks();

    console.log(responseData);
  };

  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#0000007c] z-20"
      onClick={handleClickParentDiv}
    >
      <div className="flex flex-col w-[40vw]  bg-white rounded-[4px] py-[1.5rem] px-[2.5rem]">
        <h2 className="text-[2.2rem] font-medium pb-[1.5rem] mb-[3rem] border-b-[1px] border-[#0000001f]">
          Delete Task
        </h2>
        <p className="text-[2rem] mb-[4rem]">
          Do you want to delete this list?
        </p>
        <div className="flex justify-end gap-[1.5rem] font-medium">
          <button
            type="button"
            className="w-[10rem] text-[1.6rem] text-white bg-[#3636367c] rounded-[4px] px-[1.6rem] py-[0.8rem] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
            onClick={deleteTask}
          >
            Yes
          </button>
          <button
            className="w-[10rem] text-[1.6rem] text-white bg-secondary-color rounded-[4px] px-[1.6rem] py-[0.8rem] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
            onClick={() => props.onDeleteListHandler(props.index, false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListModalDelete;
