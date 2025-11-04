const SET_COACHES = 'coach/set'
const ADD_COACHES = 'coach/add'
const UPDATE_COACHES = 'coach/update'
const DELETE_COACHES = 'coach/delete'

interface Coach {
  id: number;
  name: string;
  surname: string;
  town: string;
  sport: string;
  stadiums: string[];
}

export const setCoaches = (coaches:Coach) => ({
  type: SET_COACHES,
  payload: coaches,
});

// Add multiple coaches
export const addCoaches = (coaches:Coach) => ({
  type: ADD_COACHES,
  payload: coaches,
});

// Update multiple coaches
export const updateCoaches = (coaches:Coach) => ({
  type: UPDATE_COACHES,
  payload: coaches,
});

// Delete multiple coaches
export const deleteCoaches = (coaches:Coach) => ({
  type: DELETE_COACHES,
  payload: coaches, // Array of IDs to delete
});
