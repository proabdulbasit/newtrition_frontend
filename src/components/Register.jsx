import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {BACKEND_URL}  from "../../config";

function Register() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const [message, setMessage] = useState({
    type: "invisible-msg",
    text: "dummy-msg",
  });

  function handleInput(event) {
    setUserDetails((prevDetails) => {
      return { ...prevDetails, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    

    fetch(`${BACKEND_URL}/register`, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage({
          type: "success",
          text: data.message,
        });

        setUserDetails({
          name: "",
          email: "",
          password: "",
          age: "",
        });

        setTimeout(() => {
          setMessage({
            type: "invisible-msg",
            text: "Dummy Msg",
          });
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }
 console.log("sjdhlfjlsdhf", BACKEND_URL);
  return (
    <section className="w-full bg-slate-800 text-white h-screen p-6 flex flex-col items-center">
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
          type="text"
          name="name"
          onChange={handleInput}
          placeholder="Enter name*"
          value={userDetails.name}
        />
        <input
          className="h-6 indent-3 text-base rounded-lg text-gray-500 focus:text-gray-900"
          required
          type="email"
          name="email"
          onChange={handleInput}
          placeholder="Enter email*"
          value={userDetails.email}
        />
        <input
          className="h-6 indent-3 text-base rounded-lg text-gray-500 focus:text-gray-900"
          required
          maxLength={8}
          type="password"
          name="password"
          onChange={handleInput}
          placeholder="Enter password*"
          value={userDetails.password}
        />
        <input
          className="h-6 indent-3 text-base rounded-lg text-gray-500 focus:text-gray-900"
          min={12}
          max={100}
          type="number"
          name="age"
          onChange={handleInput}
          placeholder="Enter age"
          value={userDetails.age}
        />

        <p className="text-right">required*</p>

        <button className="bg-orange-500 px-3 py-1 uppercase cursor-pointer rounded-xl mr-5 hover:bg-green-600 w-full">
          Register
        </button>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-lg text-center">Join Us For Fitness</p>
          <Link
            className="bg-orange-500 px-3 py-1 uppercase cursor-pointer rounded-xl text-sm  hover:bg-green-600 text-center mt-1"
            to="/login"
          >
            Login
          </Link>
        </div>

        {/* <p className={`w-full p-4 rounded-lg opacity-0 ${message.type}`}>
          {message.text}
        </p> */}
      </form>
    </section>
  );
}

export default Register;
