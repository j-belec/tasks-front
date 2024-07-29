import { Form, useActionData } from "react-router-dom";

function ListModal() {
  const errors = useActionData();

  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center backdrop-blur-sm">
      <div className="flex flex-col w-[40rem] bg-slate-400 p-[1rem]">
        <h2 className="text-[1.6rem] self-center my-[1rem]">New List</h2>
        <Form method="post" action="/">
          <p
            className={`text-[1.4rem] w-[80%] mx-auto ${
              errors?.title ? "text-red-600" : ""
            }`}
          >
            List title
          </p>
          <input
            type="text"
            name="title"
            className={`text-[1.4rem] w-[80%] mx-auto mb-[3rem] ${
              errors?.title ? "border-red-600" : ""
            }`}
          />
          <p>{errors?.title}</p>
          <button type="submit" className="text-[1.4rem]">
            Create
          </button>
        </Form>
      </div>
    </div>
  );
}

export default ListModal;
