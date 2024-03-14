// import Header from "./Header";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import Food from "./Food";
import Header from "./Header";
import diet from "../assets/diet.png";
import {BACKEND_URL}  from "../../config";


function Tracking() {
  const loggedData = useContext(UserContext);

  const [foodItems, setFoodItems] = useState([]);

  const [food, setFood] = useState(null);

  function searchFood(event) {
    if (event.target.value.length !== 0) {
      fetch(`${BACKEND_URL}/foods/${event.target.value}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + loggedData.loggedUser.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === undefined) {
            setFoodItems(data);
          } else {
            setFoodItems([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFoodItems([]);
      setFood(null);
    }
  }

  return (
    <>
      <section className="bg-slate-800 text-white h-screen mx-auto">
        <Header />

        <div className="w-full">
          <input
            type="search"
            onChange={searchFood}
            className="w-3/4 md:w-1/4 h-6 indent-3 rounded-lg text-gray-500 focus:text-gray-900"
            style={{ display: "block", margin: "0 auto" }}
            placeholder="Search Food Item"
          />

          {foodItems.length === 0 && (
            <div className="flex flex-col items-center">
              <h2 className="text-xl my-6 mx-2 text-center">
                Please search for a meal <br /> to get the nutrient content.
              </h2>
              <img
                src={diet}
                alt="pie chart of food groups with real food images"
                className="w-3/4 md:w-1/4 mx-auto"
              />
            </div>
          )}

          {foodItems.length !== 0 ? (
            <div className="w-full md:w-1/3  md:mx-auto bg-slate-800 rounded-lg text-lg mt-3 p-1 ">
              {foodItems.map((item) => {
                return (
                  <div
                    className="w-3/4 mx-auto px-3 my-3 bg-gray-600 rounded-lg  cursor-pointer hover:border hover:bg-gray-500 hover:font-bold"
                    key={item._id}
                  >
                    <p
                      className=""
                      onClick={() => {
                        setFood(item);
                        setFoodItems([item]); // test
                      }}
                    >
                      <span className="font-bold text-xl">{item.name}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <div>{food !== null ? <Food food={food} /> : null}</div>
      </section>
    </>
  );
}

export default Tracking;
