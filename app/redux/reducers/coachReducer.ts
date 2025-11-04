  
  interface Coach {
    id: number;
    name: string;
    surname: string;
    town: string;
    sport: string;
    stadiums: string[];
  }

  interface Payload{
    type:string;
    payload:Coach[];
  }
  
  interface State {
    coaches: Coach[];
  }
   
const coachReducer = (state : State, action:Payload) => {
  switch (action.type) {
    case 'SET_COACHES':
      return {
        ...state,
        coaches:action.payload
    }
    case 'ADD_COACHES':
      // Add multiple coaches (avoiding duplicates based on ID)
      const newCoaches = action.payload.filter(
        (newCoach) => !state.coaches.some((coach) => coach.id === newCoach.id)
      );
      return {
        ...state,
        coaches: [...state.coaches, ...newCoaches],
      };

    case 'UPDATE_COACHES':
      // Update multiple coaches
      const updatedCoaches = state.coaches.map((coach) => {
        const update = action.payload.find((updateCoach) => updateCoach.id === coach.id);
        return update ? { ...coach, ...update } : coach;
      });
      return {
        ...state,
        coaches: updatedCoaches,
      };

    case 'DELETE_COACHES':
      // Delete coaches by ID
      return {
        ...state,
        coaches: action.payload.filter(
          (newCoach) => !state.coaches.some((coach) => coach.id === newCoach.id)
        )
      };
    default:
      return state;
  }
};

export default coachReducer;
