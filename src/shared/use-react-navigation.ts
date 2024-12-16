import {
  CommonActions,
  useNavigation as useStackNavigation,
  useNavigationState,
} from '@react-navigation/native';

export const useReactNavigation = () => {
  const openedScreen = useNavigationState(state =>
    !state?.routes ? '' : state.routes[state.index].name,
  );

  const {dispatch} = useStackNavigation();

  const navigateTo = (screen: ScreensPathes) => {
    if (openedScreen === screen) return;
    console.log('navigateTo', screen);
    dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: screen}],
      }),
    );
  };
  return {navigateTo, openedScreen};
};

export enum ScreensPathes {
  Loading = 'Loading',
  Onboarding = 'Onboarding',
  Profile = 'Profile',
  Ideas = 'Ideas',
  Saved = 'Saved',
  Day = 'Day',
}
