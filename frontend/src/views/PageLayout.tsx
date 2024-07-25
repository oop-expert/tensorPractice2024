import { useCallback, useEffect, useRef } from "react";
import MainAppBar from "../components/MainAppBar";
import Router from "./Router";
import { useAppDispatch } from "../store/storeHooks";
import { WebSocketActionTypes } from "../store/webSocketMiddleware";
import { useLocation } from "react-router-dom";
import { openQuitPopup } from "../store/popupSlice";

export default function PageLayout() {
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();

  const hiddenRef = useRef<HTMLButtonElement>(null);

  const onWindowClose = (evt: BeforeUnloadEvent) => {
    if(pathname.length > 1) {
      evt.preventDefault();
      evt.stopImmediatePropagation();
      dispatch({type: WebSocketActionTypes.QUIT_GAME, payload: {gameCode: '', username: '', avatarId: 0}});
    }
  };

  const setValueToHiddenInput = () => {
    hiddenRef.current?.onclick;
  };

  const onUrlChange = useCallback((url: string, replace: boolean = false) => {
    const method = replace ? 'replaceState' : 'pushState';
    window.history[method];
  }, []);

  const onPopState = (evt: PopStateEvent) => {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    dispatch({type: WebSocketActionTypes.QUIT_GAME, payload: {gameCode: '', username: '', avatarId: 0}});
  }

  /*useEffect(() => {
    onUrlChange(window.location.href);
    setValueToHiddenInput();

    return () => {
      dispatch(openQuitPopup(true))
    };
  }, []);*/

  useEffect(() => {
    setValueToHiddenInput();

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    }
  }, [hiddenRef, onUrlChange])

  const onEscDown = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape') {
      dispatch(openQuitPopup(true));
    }
  }

  useEffect(() => {
    window.addEventListener('beforeunload', onWindowClose);
    document.addEventListener('keydown', onEscDown);

    return () => {
      window.removeEventListener('beforeunload', onWindowClose);
      document.removeEventListener('keydown', onEscDown);
    };
  });

  return (
    <>
      <MainAppBar />
      <Router />
      <button ref={hiddenRef} style={{visibility: 'hidden'}}></button>
    </>
  );
}
