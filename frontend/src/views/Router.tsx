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
      <Route path='lobby/:id' element={<LobbyPage/>} />
      <Route path='room/:id' element={<RoomPage name={'Екатерина'}/>} />
      <Route path='results/:id'element={<ResultsPage name={'Екатерина'}/>} />
      <Route path='*' element={<ErrorPage message='Такой страницы не существует'/>} />
    </Routes>
  );
}
