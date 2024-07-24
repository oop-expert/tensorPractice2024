import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ErrorPage from './ErrorPage';
import RoomPage from './RoomPage';
import ResultsPage from './ResultsPage';
import LobbyPage from './LobbyPage';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path='lobby/:code' element={<LobbyPage/>} />
      <Route path='room/:code' element={<RoomPage/>} />
      <Route path='results/:code' element={<ResultsPage/>} />
      <Route path='test' element={<RoomPage/>} />
      <Route path='*' element={<ErrorPage message='Такой страницы не существует'/>} />
    </Routes>
  );
}
