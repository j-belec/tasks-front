import { Form, useActionData, redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const errors = useActionData();

  return (
    <section className="h-[calc(100vh-65px)] flex items-center justify-center flex-col text-[2rem] ">
      <Form
        method="post"
        className="border py-[2rem] px-[4rem] flex flex-col items-center"
      >
        <h2 className="text-center text-[2.5rem] font-medium mb-[3rem]">
          Register
        </h2>
        <div className="flex flex-col gap-1 mb-[2rem]">
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
            className={`border-[1px] border-black ${
              errors?.name ? "border-red-600" : ""
            }`}
          />
          <p className="text-red-600 text-[1.5rem] mt-[-0.3rem]">
            {errors?.name}
          </p>
        </div>
        <div className="flex flex-col gap-1 mb-[2rem]">
          <label htmlFor="" className={`${errors?.name ? "text-red-600" : ""}`}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`border-[1px] border-black ${
              errors?.name ? "border-red-600" : ""
            }`}
          />
          <p className="text-red-600 text-[1.5rem] mt-[-0.3rem]">
            {errors?.email}
          </p>
        </div>
        <div className="flex flex-col gap-1 mb-[4rem]">
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
            className={`border-[1px] border-black ${
              errors?.password ? "border-red-600" : ""
            }`}
          />
          <p className="text-red-600 text-[1.5rem] mt-[-0.3rem]">
            {errors?.password}
          </p>
        </div>
        <button className="w-[80%] bg-[rgb(99,102,241)]" type="submit">
          Send
        </button>
      </Form>
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
