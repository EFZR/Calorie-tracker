import { createContext, ReactNode, useReducer,useMemo } from "react";
import { activityReducer, initialState } from "../reducers/activity-reducers";
import { Activity } from "../types";
import { categories } from "../data/categories";

export type ActivityContextProps = {
  activities: Activity[];
  activeId: Activity["id"];
  caloriesConsumed: number;
  caloriesBurned: number;
  netCalories: number;
  categoryName: (category: Activity["category"]) => string[];
  isEmptyActivities: boolean;
  saveActivity: (newActivity: Activity) => void;
  setActiveId: (id: Activity["id"]) => void;
  deleteActivity: (id: Activity["id"]) => void;
  restartApp: () => void;
};

export const ActivityContext = createContext<ActivityContextProps>({
  activities: [],
  activeId: "",
  caloriesConsumed: 0,
  caloriesBurned: 0,
  netCalories: 0,
  categoryName: () => [],
  isEmptyActivities: false,
  saveActivity: () => {},
  setActiveId: () => {},
  deleteActivity: () => {},
  restartApp: () => {},
});

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  //#region States

  const [state, dispatch] = useReducer(activityReducer, initialState);

  const caloriesConsumed = useMemo(() => state.activities.reduce((acc, activity) => activity.category === 1 ? acc + activity.calories : acc, 0), [state.activities]);
  const caloriesBurned = useMemo(() => state.activities.reduce((acc, activity) => activity.category === 2 ? acc + activity.calories : acc, 0), [state.activities]);
  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesConsumed, caloriesBurned]);

  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((item) => (item.id === category ? item.name : "")),
    [state.activities]
  );

  const isEmptyActivities = useMemo(
    () => state.activities.length === 0,
    [state.activities]
  );

  //#endregion

  //#region Functions

  function saveActivity(newActivity: Activity) {
    dispatch({ type: "save-activity", payload: { newActivity } });
  }

  function setActiveId(id: Activity["id"]) {
    dispatch({ type: "set-activeId", payload: { id } });
  }

  function deleteActivity(id: Activity["id"]) {
    dispatch({ type: "delete-activity", payload: { id } });
  }

  function restartApp() {
    dispatch({ type: "restart-app" });
  }

  //#endregion

  //#region Return

  return (
    <ActivityContext.Provider
      value={{
        activities: state.activities,
        activeId: state.activeId,
        caloriesConsumed,
        caloriesBurned,
        netCalories,
        categoryName,
        isEmptyActivities,
        saveActivity,
        setActiveId,
        deleteActivity,
        restartApp,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );

  //#endregion
};
