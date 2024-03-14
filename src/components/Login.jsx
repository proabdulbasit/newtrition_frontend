import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {BACKEND_URL}  from "../../config";
function Login() {
  const navigate = useNavigate();

  const LoggedData = useContext(UserContext);

  const [userCreds, setUserCreds] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    type: "invisible-msg",
    text: "Dummy message",
  });

  function handleInput(event) {
    setUserCreds((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(userCreds);

    fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      body: JSON.stringify(userCreds),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse response only if it's okay
        } else {
          // Handle non-OK responses
          if (response.status === 404) {
            setMessage({
              type: "error",
              text: "Username or Email doesn't exist",
            });
          } else if (response.status === 401) {
            setMessage({ type: "error", text: "Incorrect Password or Email" });
          }

          setTimeout(() => {
            setMessage({ type: "invisible-msg", text: "Dummy Text" });
          }, 5000);

          throw new Error("Server responded with error status");
        }
      })
      .then((data) => {
        // Handle successful JSON response
        if (data.token !== undefined) {
          localStorage.setItem("newtrition-user", JSON.stringify(data));
          console.log(data);
          LoggedData.setLoggedUser(data);

          navigate("/tracking");
        }
      })
      .catch((err) => {
        // Handle errors during fetch or parsing JSON
        console.log(err);
        setMessage({
          type: "error",
          text: "Error occurred while fetching data",
        });
      });
  }

  return (
    <section className="max-w-m bg-slate-800 text-white h-screen p-6 flex-row items-center">
      <h1 className="text-4xl font-bold mt-6 mb-3 text-center">Newtrition</h1>
      <form
        className="w-full flex flex-col gap-3 mx-auto md:w-1/2 lg:w-1/4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl text-center mb-6">
          Track your daily nutrient intake
        </h2>

        <input
          className="h-6 indent-3 text-base rounded-lg text-gray-500 focus:text-gray-900"
          required
          type="email"
          onChange={handleInput}
          placeholder="Enter email*"
          name="email"
          value={userCreds.email}
        />
        <input
          className="h-6 indent-3 text-base rounded-lg text-gray-500 focus:text-gray-900"
          required
          maxLength={8}
          type="password"
          onChange={handleInput}
          placeholder="Enter password*"
          name="password"
          value={userCreds.password}
        />

        <p className="text-right">required*</p>

        <button className="bg-orange-500 px-3 py-1 uppercase cursor-pointer rounded-xl mr-5 hover:bg-green-600 w-full">
          Enter
        </button>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-lg text-center">No Account? </p>
          <Link
            className="bg-orange-500 px-3 py-1 uppercase cursor-pointer rounded-xl text-sm  hover:bg-green-600 mt-1 text-center"
            to="/register"
          >
            Register
          </Link>
        </div>
        <p className={`w-full p-4 rounded-lg opacity-0 ${message.type}`}>
          {message.text}
        </p>
      </form>
    </section>
  );
}

export default Login;
