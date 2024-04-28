import { useReducer, useEffect, useMemo } from "react"
import { activityReducer, initialState } from "./reducers/activity-reducers"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

export default function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities]);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities])

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">Contador de Calorias</h1>

          
          <button
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold text-white uppercase cursor-pointer rounded-lg text-sm disabled:opacity-20"
            disabled={isEmptyActivities}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            reiniciar app
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            state={state}
            dispatch={dispatch}
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  )
}
