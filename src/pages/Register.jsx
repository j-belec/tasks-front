import { Form, useActionData, redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const errors = useActionData();

  return (
    <section className="w-[calc(100%-24rem)] min-h-screen ml-auto bg-main-bg">
      <div className="h-[10rem] flex items-center border-b-[1px] border-[#0000001f]">
        <h1 className="text-[3rem] pl-[3rem] font-bold">Register</h1>
      </div>
      <div className="w-full h-[calc(100vh-10rem)] flex items-center justify-center flex-col text-[2rem]">
        <div className="flex flex-col w-[55rem] bg-white rounded-[4px] py-[1.5rem] px-[4rem] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
          <h2 className="text-[2.2rem] font-semibold pb-[1.5rem] mb-[3rem] border-b-[1px] border-[#0000001f]">
            Create your account here!
          </h2>
          <Form method="post" className="flex flex-col">
            <div className="flex flex-col gap-[0.5rem] mb-[2rem]">
              <label
                htmlFor="name"
                className={`${errors?.name ? "text-red-600" : ""}`}
              >
                User name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className={`h-[3.5rem] bg-[#e9ecef] rounded-[4px] px-[0.5rem] ${
                  errors?.name ? "border-[1px] border-red-600" : ""
                }`}
              />
              <p className="text-red-600 text-[1.5rem] mt-[-0.3rem]">
                {errors?.name}
              </p>
            </div>
            <div className="flex flex-col gap-[0.5rem] mb-[2rem]">
              <label
                htmlFor=""
                className={`${errors?.name ? "text-red-600" : ""}`}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`h-[3.5rem] bg-[#e9ecef] rounded-[4px] px-[0.5rem] ${
                  errors?.name ? "border-[1px] border-red-600" : ""
                }`}
              />
              <p className="text-red-600 text-[1.5rem] mt-[-0.3rem]">
                {errors?.email}
              </p>
            </div>
            <div className="flex flex-col gap-[0.5rem] mb-[4rem]">
              <label
                htmlFor=""
                className={`${errors?.password ? "text-red-600" : ""}`}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className={`h-[3.5rem] bg-[#e9ecef] rounded-[4px] px-[0.5rem] ${
                  errors?.password ? "border-[1px] border-red-600" : ""
                }`}
              />
              <p className="text-red-600 text-[1.5rem] mt-[-0.3rem]">
                {errors?.password}
              </p>
            </div>
            <button
              className="text-[1.8rem] text-white font-medium bg-secondary-color shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] px-[4rem] py-[0.8rem] rounded-[4px] self-end"
              type="submit"
            >
              Create
            </button>
          </Form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}

export default Register;

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  console.log(data);

  let errors = {
    name: "",
    email: "",
    password: "",
  };

  if (data.name.length === 0) {
    errors.name = "Name is required";
  }
  if (data.email.length === 0) {
    errors.email = "Email is required";
  }
  if (data.password.length === 0) {
    errors.password = "Password is required";
  }

  if (errors.name || errors.email || errors.password) {
    return errors;
  }

  const response = await fetch("http://localhost:3100/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const reponseData = await response.json();

  if (!response.ok) {
    return toast.error(reponseData.message);
  }

  return redirect("/login");
}
