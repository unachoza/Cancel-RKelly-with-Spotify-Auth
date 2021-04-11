import NavigationActionTypes from 'Redux/navigation/navigation.types';

export const switchPage = event => ({
  type: NavigationActionTypes.SWITCH_PAGES,
  payload: event.target,
});
