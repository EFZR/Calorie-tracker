import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
  activities: Activity[]
}

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  const caloriesConsumed = useMemo(() => activities.reduce((acc, activity) => activity.category === 1 ? acc + activity.calories : acc, 0), [activities]);
  const caloriesBurned = useMemo(() => activities.reduce((acc, activity) => activity.category === 2 ? acc + activity.calories : acc, 0), [activities]);
  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesConsumed, caloriesBurned]);

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center"></h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} label="calorias consumidas" />
        <CalorieDisplay calories={caloriesBurned} label="calorias gastadas" />
        <CalorieDisplay calories={netCalories} label="calorias netas" />
      </div>
    </>
  )
}
