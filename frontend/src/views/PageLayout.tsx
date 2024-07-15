import { useLocation } from "react-router-dom";
import MainAppBar from "../components/MainAppBar";
import Router from "./Router";

export default function PageLayout() {
  const {pathname} = useLocation();

  return (
    <>
      {pathname.length < 2 || <MainAppBar />}
      <Router/>
    </>
  );
}
