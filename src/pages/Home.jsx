import ListModal from "../components/ListModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, redirect } from "react-router-dom";

let id = 1;

function Home() {
  const login = useSelector((state) => state.value);
  const user = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);
  const [lists, setLists] = useState([]);

  // id = user.id;

  useEffect(() => {
    const getLists = async () => {
      // if (login) {
      const response = await fetch("http://localhost:3100/list/get-all-lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_user: id }),
      });

      const responseData = await response.json();

      if (!response.ok) return;

      setLists(responseData);
      // }
    };

    getLists();
  }, [login]);

  const newListHandler = (state) => {
    setModal(state);
  };

  // if (!login) {
  //   return (
  //     <div className="h-[calc(100vh-65px)] flex items-center justify-center">
  //       <p className="text-[2rem]">You have to be logged in!</p>
  //     </div>
  //   );
  // }

  return (
    <section className="w-[calc(100%-24rem)] min-h-screen ml-auto bg-main-bg">
      <div className="h-[10rem] flex items-center border-b-[1px] border-[#0000001f]">
        <h1 className="text-[3rem] pl-[3rem] font-bold">Home</h1>
      </div>
      <div className="w-[70%] mx-auto flex justify-between items-center mt-[4rem] mb-[6rem]">
        <h1 className="text-[2.5rem] font-bold">My Lists</h1>
        <button
          className="text-[2rem] font-medium text-white bg-[#4E2775] rounded-[4px] px-[2rem] py-[1rem]"
          onClick={() => newListHandler(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="text-[2.5rem]" />
        </button>
        {modal && <ListModal onNewListHandler={newListHandler} />}
      </div>
      <div className="w-[70%] flex flex-wrap gap-x-[2rem] gap-y-[3rem] justify-center mx-auto pb-[10rem]">
        {lists.map((list) => {
          return (
            <Link
              to={`/lists/${list.user_id}/${list.id}/${list.slug}`}
              className="w-[31%] h-[15rem] bg-white p-[2rem] hover:scale-[1.02] duration-150 rounded-[4px] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] flex flex-col justify-between"
            >
              <div className="flex items-center gap-[0.5rem]">
                <FontAwesomeIcon
                  icon={faList}
                  className="text-[2rem] text-[#4e2775a4] pt-[2px]"
                />
                <p className="text-[2rem] font-medium ">{list.name}</p>
              </div>
              <div className="flex flex-col items-end text-[1.4rem] font-medium text-[#6d6d6d] mt-auto">
                <p>Open tasks: {list.open_tasks}</p>
                <p>In progress tasks: {list.inprogress_tasks}</p>
                <p>Completed tasks: {list.completed_tasks}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Home;

//Action de ListModal
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = {
    title: "",
  };

  if (data.title.length === 0) {
    errors.title = "Title es required";
  }

  if (errors.title) {
    return errors;
  }

  const finalData = {
    userId: id,
    title: data.title,
  };

  const response = await fetch("http://localhost:3100/list/create-list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(finalData),
  });

  if (!response.ok) {
    return null;
  }

  const responseData = await response.json();

  return redirect(
    `/lists/${responseData.user_id}/${responseData.id}/${responseData.slug}`
  );
}
