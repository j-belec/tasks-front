import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Task from "../components/Task";
import TaskModalCreate from "../components/TaskModalCreate";
import TaskModalUpdate from "../components/TaskModalUpdate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function List() {
  const listData = useLoaderData();
  const [tasks, setTasks] = useState([]); //para traerme todos los tasks de la bd
  const [addTask, setAddTask] = useState(false); //para activar el modal de crear un nuevo task
  const [states, setStates] = useState([]);

  useEffect(() => {
    const getAllTasks = async () => {
      const response = await fetch(
        "http://localhost:3100/list/get-list-tasks",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ listId: listData.id }),
        }
      );

      const responseData = await response.json();
      const reversedResponseData = responseData.reverse();

      setTasks(reversedResponseData);
      setStates(Array(reversedResponseData.length).fill(false));
    };

    getAllTasks();
  }, [addTask, listData.id]);

  const addTaskHandler = (est) => {
    setAddTask(est);
  };

  const taskHandler = (index) => {
    setStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = true;
      // console.log(index);
      return newStates;
    });
  };

  return (
    <div>
      <h1 className="text-[3rem] font-medium text-center my-[2rem]">
        {listData.name}
      </h1>
      <div className="flex flex-col gap-[1rem]">
        {tasks.map((task, i) => {
          return (
            <>
              <div
                className="w-[70%] m-auto"
                key={`${task.user_id}-${task.id}`}
                onClick={() => taskHandler(i)}
              >
                <Task name={task.name} />
              </div>
              {states[i] && (
                <TaskModalUpdate taskId={task.id} listId={listData.id} />
              )}
            </>
          );
        })}

        <div
          className="w-[70%] h-[4rem] border-[1px] border-black mx-auto flex items-center justify-center hover:cursor-pointer"
          onClick={() => setAddTask((previousValue) => !previousValue)}
        >
          <p className="text-[1.5rem]">Add Task +</p>
        </div>
      </div>
      {addTask && (
        <TaskModalCreate
          listName={listData.name}
          listId={listData.id}
          userId={listData.user_id}
          manageTask={addTaskHandler}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default List;

export async function loader({ params }) {
  const { id_list } = params;

  const response = await fetch("http://localhost:3100/list/get-list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_list: id_list }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    return toast.error(responseData.error);
  }

  return responseData;
}
