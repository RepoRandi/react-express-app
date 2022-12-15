import React from 'react';
import './App.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import routes from './routes';

function App() {
	return (
		<React.Suspense fallback={<div>Loading...</div>}>
			<div className="App">
				<ul className="menu">
					<li>
						<NavLink to="/" activeClassName="active" exact>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/product" activeClassName="active">
							Product
						</NavLink>
					</li>
				</ul>
				<div className="main">
					<Switch>
						{routes.map((route, i) => {
							const { path, Component } = route;
							return (
								<Route key={i} path={path}>
									<Component />
								</Route>
							);
						})}
					</Switch>
				</div>
			</div>
		</React.Suspense>
	);
}

export default App;
