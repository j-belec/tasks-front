import { Form, useActionData } from "react-router-dom";

function ListModal(props) {
  const errors = useActionData();

  const handleClickParentDiv = (event) => {
    if (event.target === event.currentTarget) {
      props.onNewListHandler(false); //cierro el modal
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#0000007c]"
      onClick={handleClickParentDiv}
    >
      <div className="flex flex-col w-[55rem] bg-white rounded-[4px] py-[1.5rem] px-[2.5rem]">
        <h2 className="text-[2.2rem] font-medium pb-[1.5rem] mb-[3rem] border-b-[1px] border-[#0000001f]">
          New List
        </h2>
        <Form method="post" action="/" className="text-[2rem]">
          <div className="flex flex-col gap-[0.5rem]">
            <label className={`${errors?.title ? "text-red-600" : ""}`}>
              List title
            </label>
            <input
              type="text"
              name="title"
              className={`text-[1.8rem] w-full bg-[#e9ecef] rounded-[4px] h-[3.5rem] font-normal ${
                errors?.title ? "border-red-600" : ""
              }`}
            />
            <p>{errors?.title}</p>
          </div>
          <div className="flex justify-end gap-[1.5rem] mt-[4rem] font-medium">
            <button
              type="button"
              className="w-[10rem] text-[1.6rem] text-white bg-[#3636367c] rounded-[4px] px-[1.6rem] py-[0.8rem] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
              onClick={() => props.onNewListHandler(false)}
            >
              Cancel
            </button>
            <button className="w-[10rem] text-[1.6rem] text-white bg-secondary-color rounded-[4px] px-[1.6rem] py-[0.8rem] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ListModal;
