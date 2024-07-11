import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ErrorPage from './ErrorPage';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path='lobby/:id' element={<ErrorPage message='Эта страница ещё не готова'/>} />
      <Route path='room/:id' element={<ErrorPage message='Эта страница ещё не готова'/>} />
      <Route path='results/:id'element={<ErrorPage message='Эта страница ещё не готова'/>} />
      <Route path='*' element={<ErrorPage message='Такой страницы не существует'/>} />
    </Routes>
  );
}
