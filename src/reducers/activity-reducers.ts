import { Activity } from "../types";

export type ActivityActions =
  | { type: "save-activity"; payload: { newActivity: Activity } }
  | { type: "set-activeId"; payload: { Id: Activity["id"] } }
  | { type: "delete-activity"; payload: { Id: Activity["id"] } }
  | { type: "restart-app" };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

function localStorageActivities(): Activity[] {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
}

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    let updateActivities: Activity[] = [];

    // Este codigo maneja la logica para actualizar la actividad
    if (state.activeId) {
      updateActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    }

    // Este codigo maneja la logica para insertar una nueva actividad
    else {
      updateActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updateActivities,
      activeId: "",
    };
  }

  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.Id,
    };
  }

  if (action.type === "delete-activity") {
    const updateActivities = state.activities.filter(
      (activity) => activity.id !== action.payload.Id
    );
    return {
      ...state,
      activeId: "",
      activities: updateActivities,
    };
  }

  if (action.type == "restart-app") {
    return {
      activities: [],
      activeId: "",
    };
  }

  return state;
};
