import { useEffect } from "react";
import MainAppBar from "../components/MainAppBar";
import Router from "./Router";
import { useAppDispatch } from "../store/storeHooks";
import { WebSocketActionTypes } from "../store/webSocketMiddleware";
import { useLocation } from "react-router-dom";
import { openQuitPopup } from "../store/popupSlice";

export default function PageLayout() {
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();

  const onWindowClose = (evt: BeforeUnloadEvent) => {
    if(pathname.length > 1) {
      evt.preventDefault();
      dispatch({type: WebSocketActionTypes.QUIT_GAME, payload: {gameCode: '', username: '', avatarId: 0}});
    }
  };

  const onBackButtonClick = (evt: PopStateEvent) => {
    evt.preventDefault();

    if(pathname.length > 1) {
      dispatch(openQuitPopup(true));
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onWindowClose);
    window.addEventListener('popstate', onBackButtonClick);

    return () => {
      window.removeEventListener('beforeunload', onWindowClose);
      window.removeEventListener('popstate', onBackButtonClick);
    };
  });

  return (
    <>
      <MainAppBar />
      <Router />
    </>
  );
}
