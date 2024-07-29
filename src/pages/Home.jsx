import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListModal from "../components/ListModal";
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

  const newListHandler = () => {
    setModal(true);
  };

  // if (!login) {
  //   return (
  //     <div className="h-[calc(100vh-65px)] flex items-center justify-center">
  //       <p className="text-[2rem]">You have to be logged in!</p>
  //     </div>
  //   );
  // }

  return (
    <div className="w-[70%] mx-auto mt-[6rem]">
      <div className="w-[70%] mx-auto flex justify-between items-center mb-[10rem]">
        <h1 className="text-[2.5rem] font-medium">My tasks lists</h1>
        <button
          className="text-[2rem] font-medium text-white bg-[rgb(99,102,241)] px-[2rem] py-[1rem]"
          onClick={newListHandler}
        >
          New List
        </button>
        {modal && <ListModal />}
      </div>
      <div className="flex flex-wrap gap-[2rem] justify-center mb-[10rem]">
        {lists.map((list) => {
          return (
            <Link
              to={`/lists/${list.user_id}/${list.id}/${list.slug}`}
              className="w-[20rem] h-[10rem] bg-slate-400 p-[1rem] hover:scale-[1.02] duration-150"
            >
              <p className="text-[1.5rem] font-medium ">{list.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
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
