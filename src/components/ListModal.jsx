import { Form, useActionData } from "react-router-dom";

function ListModal(props) {
  const errors = useActionData();

  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#0000007c] font-medium">
      <div className="flex flex-col w-[55rem] bg-[#e9ecef] rounded-[4px] py-[1.5rem] px-[2.5rem]">
        <h2 className="text-[2rem] font-semibold pb-[1.5rem] mb-[2rem] border-b-[1px] border-[#0000001f]">
          New List
        </h2>
        <Form method="post" action="/">
          <p
            className={`text-[1.8rem] mx-auto ${
              errors?.title ? "text-red-600" : ""
            }`}
          >
            List title
          </p>
          <input
            type="text"
            name="title"
            className={`text-[1.8rem] w-full rounded-[4px] h-[3rem] mb-[4rem] font-normal ${
              errors?.title ? "border-red-600" : ""
            }`}
          />
          <p>{errors?.title}</p>
          <div className="mt-auto flex justify-end gap-[1.5rem]">
            <button
              type="button"
              className="w-[10rem] text-[1.6rem] text-white bg-[#3636367c] rounded-[4px] px-[1.6rem] py-[0.8rem]"
              onClick={() => props.onNewListHandler(false)}
            >
              Cancel
            </button>
            <button className="w-[10rem] text-[1.6rem] text-white bg-[#943edf] rounded-[4px] px-[1.6rem] py-[0.8rem]">
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ListModal;
