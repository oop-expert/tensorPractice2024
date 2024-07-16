import { useLocation } from "react-router-dom";
import MainAppBar from "../components/MainAppBar";
import Router from "./Router";

const MAIN_PAGE_PATHNAME_LENGTH = 2;

export default function PageLayout() {
  const {pathname} = useLocation();

  return (
    <>
      {pathname.length < MAIN_PAGE_PATHNAME_LENGTH || <MainAppBar />}
      <Router/>
    </>
  );
}
