import { Form, useActionData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function Login() {
  const dispatch = useDispatch();
  const actionData = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.success) {
      dispatch(userActions.login());
      dispatch(
        userActions.setActualUser({
          id: actionData.id,
          name: actionData.name,
          email: actionData.email,
        })
      );
      navigate("/");
    }
  }, [actionData]);

  return (
    <section className="h-[calc(100vh-65px)] flex items-center justify-center flex-col text-[2rem]">
      <Form method="post" className="border py-[2rem] px-[4rem] flex flex-col">
        <h2 className="text-center text-[2.5rem] font-medium mb-[3rem]">
          Login
        </h2>
        <div className="flex flex-col gap-4 mb-[2rem]">
          <label
            htmlFor=""
            className={`${actionData?.email ? "text-red-600" : ""}`}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            className={`border-[1px] border-black ${
              actionData?.email ? "border-red-600" : ""
            }`}
          />
          <p className="text-red-600 text-[1.5rem] mt-[-0.3rem]">
            {actionData?.email}
          </p>
        </div>
        <div className="flex flex-col gap-4 mb-[4rem]">
          <label
            htmlFor=""
            className={`${actionData?.password ? "text-red-600" : ""}`}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className={`border-[1px] border-black ${
              actionData?.password ? "border-red-600" : ""
            }`}
          />
          <p className="text-red-600 text-[1.5rem] mt-[-0.3rem]">
            {actionData?.password}
          </p>
        </div>
        <button
          type="submit"
          className="self-center w-[80%] bg-[rgb(99,102,241)]"
        >
          Send
        </button>
      </Form>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}

export default Login;

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = {
    success: false,
    id: "",
    email: "",
    password: "",
  };

  if (data.email.length === 0) {
    errors.email = "Email is required";
  }

  if (data.password.length === 0) {
    errors.password = "Password is required";
  }

  if (errors.email || errors.password) {
    return errors;
  }

  const response = await fetch("http://localhost:3100/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    return toast.error(responseData.message);
  }

  errors.success = true;
  errors.id = responseData.id;
  errors.name = responseData.name;
  errors.email = responseData.email;

  // console.log(responseData);

  return errors;
}
