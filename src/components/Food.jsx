/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {BACKEND_URL}  from "../../config";


function Food(props) {
  const navigate = useNavigate();

  const [eatenQuantity, setEatenQuantity] = useState(100);
  const [food, setFood] = useState({});
  const [foodInitial, setFoodInitial] = useState({});

  let loggedData = useContext(UserContext);
  

  useEffect(() => {
    setFood(props.food);
    setFoodInitial(props.food);
  }, [props.food]);

  function calcMacros(event) {
    if (event.target.value.length !== 0) {
      let quantity = Number(event.target.value);
      setEatenQuantity(quantity);

      let copyFood = { ...food };

      copyFood.protein = (foodInitial.protein * quantity) / 100;
      copyFood.carbohydrates = (foodInitial.carbohydrates * quantity) / 100;
      copyFood.fat = (foodInitial.fat * quantity) / 100;
      copyFood.fiber = (foodInitial.fiber * quantity) / 100;
      copyFood.calories = (foodInitial.calories * quantity) / 100;

      

      setFood(copyFood);
    }
  }

  function trackFoodItem() {
    let trackedItem = {
      userId: loggedData.loggedUser.userid,
      foodId: food._id,
      details: {
        calories: food.calories,
        protein: food.protein,
        carbohydrates: food.carbohydrates,
        fat: food.fat,
        fibre: food.fibre,
      },
      quantity: eatenQuantity,
    };
    

    fetch(`${BACKEND_URL}/tracking`, {
      method: "POST",
      body: JSON.stringify(trackedItem),
      headers: {
        Authorization: "Bearer " + loggedData.loggedUser.token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data: ", data);
        navigate("/diet");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="w-full bg-slate-800 gap-y-3 flex flex-col ">
      <div className="w-full">
        <img className="w-1/2 md:w-1/4 rounded-lg mx-auto" src={food.image} />
      </div>
      <div className="mx-auto text-center mb-3">
        {/* <h3 className="text-xl font-bold">{food.name}</h3> */}
        <p className="text-sm font-bold">
          ({food.calories} Kcal for {eatenQuantity}g)
        </p>
      </div>

      <div className=" w-3/4 md:w-1/4 flex m-auto gap-x-3 mb-3">
        <p className="n-title">protein {food.protein}g</p>

        <p className="n-title">carbs {food.carbohydrates}g</p>

        <p className="n-title">fat {food.fat}g</p>

        <p className="n-title">fiber {food.fibre}g</p>
      </div>

      <div className="w-full md:w-1/3 flex flex-col items-center gap-y-4 m-auto">
        <input
          type="number"
          onChange={calcMacros}
          className="h-6 indent-3 text-base rounded-lg text-gray-500 focus:text-gray-900 w-3/4"
          placeholder="quantity in grams"
        />

        <button
          className="bg-orange-500 px-3  uppercase cursor-pointer rounded-xl  hover:bg-green-600 w-3/4"
          onClick={trackFoodItem}
        >
          Track
        </button>
      </div>
    </div>
  );
}

export default Food;
