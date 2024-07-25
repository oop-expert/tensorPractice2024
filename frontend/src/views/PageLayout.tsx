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
      evt.stopImmediatePropagation();
      dispatch({type: WebSocketActionTypes.QUIT_GAME, payload: {gameCode: '', username: '', avatarId: 0}});
    }
  };

  const onBackButtonClick = (evt: PopStateEvent) => {
      evt.preventDefault();
      evt.stopImmediatePropagation();
      const result = confirm();

      if(result) {
        dispatch({type: WebSocketActionTypes.QUIT_GAME, payload: {gameCode: '', username: '', avatarId: 0}});
      }
  };

  const onEscDown = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape') {
      dispatch(openQuitPopup(true));
    }
  }

  useEffect(() => {
    window.addEventListener('beforeunload', onWindowClose);
    window.addEventListener('popstate', onBackButtonClick);
    document.addEventListener('keydown', onEscDown);

    return () => {
      window.removeEventListener('beforeunload', onWindowClose);
      window.removeEventListener('popstate', onBackButtonClick);
      document.removeEventListener('keydown', onEscDown);
    };
  });

  return (
    <>
      <MainAppBar />
      <Router />
    </>
  );
}
