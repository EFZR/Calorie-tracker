import { createContext, ReactNode, useReducer } from "react";
import { activityReducer, initialState } from "../reducers/activity-reducers";
import { Activity } from "../types";

export type ActivityContextProps = {
  activities: Activity[];
  activeId: Activity["id"];
  saveActivity: (newActivity: Activity) => void;
  setActiveId: (id: Activity["id"]) => void;
  deleteActivity: (id: Activity["id"]) => void;
  restartApp: () => void;
};

export const ActivityContext = createContext<ActivityContextProps>({
  activities: [],
  activeId: "",
  saveActivity: () => {},
  setActiveId: () => {},
  deleteActivity: () => {},
  restartApp: () => {},
});

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  //#region States

  const [state, dispatch] = useReducer(activityReducer, initialState);

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
