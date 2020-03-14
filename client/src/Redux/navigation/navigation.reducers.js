import NavigationActionTypes from './cart.types';

const INITIAL_STATE = {
  home: true,
  userPlaylists: false,
  howItWorks: false,
  aboutMe: false,
};

const navigationReducer = (state = INITIAL_STATE, action) => {
 switch (action.type) {
  case NavigationActionTypes.SWITCH_PAGE:
   return {
    ...state, 
    
    //  action.payload
   }
  default:
   return state
 }
}

export default navigationReducer