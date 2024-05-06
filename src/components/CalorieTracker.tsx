import CalorieDisplay from "./CalorieDisplay";
import useActivity from "../hooks/useActivity";

export default function CalorieTracker() {
  const { caloriesBurned, caloriesConsumed, netCalories } = useActivity();

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center"></h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay
          calories={caloriesConsumed}
          label="calorias consumidas"
        />
        <CalorieDisplay calories={caloriesBurned} label="calorias gastadas" />
        <CalorieDisplay calories={netCalories} label="calorias netas" />
      </div>
    </>
  );
}
