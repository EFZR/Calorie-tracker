import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import useActivity from "../hooks/useActivity";
import { categories } from "../data/categories";
import type { Activity } from "../types";

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form() {
  //#region States

  const { activeId, activities, saveActivity } = useActivity();
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (activeId) {
      const currentActivity = activities.find(
        (activity) => activity.id === activeId
      );
      if (currentActivity) {
        setActivity(currentActivity);
      }
    }
  }, [activeId]);

  //#endregion

  //#region Functions

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    saveActivity({ ...activity, id: uuidv4() });
    clearForm();
  }

  function clearForm() {
    setActivity(initialState);
  }

  function isValidActivity() {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  }

  //#endregion

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoria:
        </label>
        <select
          id="category"
          className="border border-slate-300 p-2 w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          type="text"
          id="name"
          className="border border-slate-300 p-2"
          placeholder="Actividad ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          autoComplete="off"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          type="number"
          id="calories"
          className="border border-slate-300 p-2"
          placeholder="Calorias ej. 400, 600"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value={activity.category === 1 ? "Agregar Comida" : "Agregar Ejercicio"}
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-20"
        disabled={!isValidActivity()}
        onChange={handleChange}
      />
    </form>
  );
}
