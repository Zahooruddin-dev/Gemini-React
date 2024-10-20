import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Welcome from './components/Welcome';
import NotFound from './components/NotFoundPage/NotFound';
import Login from './components/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/'>
						<Route index element={<SearchBar />}></Route>
						<Route path='/login' element={<Login />}></Route>


						<Route path='*' element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
