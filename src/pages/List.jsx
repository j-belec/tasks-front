import Task from "../components/Task";
import TaskModalCreate from "../components/TaskModalCreate";
import TaskModalUpdate from "../components/TaskModalUpdate";
import TaskModalDelete from "../components/TaskModalDelete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

function List() {
  const listData = useLoaderData();
  const [addTask, setAddTask] = useState(false); //para activar el modal de crear un nuevo task
  const [tasks, setTasks] = useState([]); //para traerme todos los tasks de la bd
  const [states, setStates] = useState([]);
  const [delteStates, setDeleteStates] = useState([]); //para el arr con los estados de cada boton de borrar un task
  const [amountTasks, setAmounTasks] = useState(0);

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
      setDeleteStates(Array(reversedResponseData.length).fill(false));
      setAmounTasks(reversedResponseData.length);
    };

    getAllTasks();
  }, [addTask, listData.id, amountTasks]);

  const addTaskHandler = (est) => {
    setAddTask(est);
  };

  const taskHandler = (index, state) => {
    setStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = state;
      return newStates;
    });
  };

  const detailTaskHandler = (e, i) => {
    //solo abro el detalle del Task si no toco en el icono de delete
    if (!e.target.closest("svg")) {
      taskHandler(i, true);
    }
  };

  const deleteTaskHandler = (index, state, erase = false) => {
    if (erase) {
      setDeleteStates((prevStates) => {
        return prevStates.filter((_, i) => i !== index);
      });
    } else {
      setDeleteStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = state;
        return newStates;
      });
    }
  };

  const decreaseTasks = () => {
    setAmounTasks((prevStates) => {
      const newStates = prevStates - 1;
      return newStates;
    });
  };

  return (
    <section className="w-[calc(100%-24rem)] min-h-screen ml-auto bg-main-bg">
      <div className="h-[10rem] flex items-center border-b-[1px] border-[#0000001f]">
        <h1 className="text-[3rem] pl-[3rem] font-bold">{listData.name}</h1>
      </div>
      <div className="w-[70%] mx-auto flex justify-between items-center mt-[4rem] mb-[5rem]">
        <h1 className="text-[2.5rem] font-bold">Tasks</h1>
        <button
          className="text-[2rem] font-medium text-white bg-[#4e2775] rounded-[4px] px-[2rem] py-[1rem]"
          onClick={() => setAddTask((previousValue) => !previousValue)}
        >
          <FontAwesomeIcon icon={faPlus} className="text-[2.5rem]" />
        </button>
      </div>
      <div className="flex flex-col gap-[1.3rem] w-[70%] mx-auto">
        <div className="w-[100%] h-[4rem] text-[1.6rem] text-[#6d6d6d] font-medium mx-auto flex items-center justify-between rounded-[4px] px-[5rem]">
          <p>Task Name</p>
          <div className="flex gap-[2rem]">
            <p className=" w-[8.5rem] ">Status</p>
            <p className="w-[8.5rem]">Priority</p>
            <div className="w-[2.5rem]"></div>
          </div>
        </div>
        {tasks.map((task, i) => {
          return (
            <>
              <div
                className=""
                key={`${task.user_id}-${task.id}`}
                onClick={(e) => detailTaskHandler(e, i)}
              >
                <Task
                  name={task.name}
                  status={task.status}
                  priority={task.priority}
                  onDeleteTaskHandler={deleteTaskHandler}
                  index={i}
                />
              </div>
              {states[i] && (
                <TaskModalUpdate
                  taskId={task.id}
                  listId={listData.id}
                  index={i}
                  onTaskHandler={taskHandler}
                />
              )}
              {delteStates[i] && (
                <TaskModalDelete
                  onDeleteTaskHandler={deleteTaskHandler}
                  listId={listData.id}
                  taskId={task.id}
                  index={i}
                  onDecreaseTasks={decreaseTasks}
                />
              )}
            </>
          );
        })}

        {tasks.length === 0 && (
          <div
            className="w-[100%] h-[4rem] border-[1px] border-black mx-auto flex items-center justify-center hover:cursor-pointer"
            onClick={() => setAddTask((previousValue) => !previousValue)}
          >
            <p className="text-[1.5rem]">Add Task +</p>
          </div>
        )}
      </div>

      {addTask && (
        <TaskModalCreate
          listName={listData.name}
          listId={listData.id}
          userId={listData.user_id}
          onAddTaskHandler={addTaskHandler}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </section>
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
