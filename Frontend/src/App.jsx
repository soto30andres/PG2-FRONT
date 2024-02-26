import './App.css';
import { Route } from 'wouter';
import { Login } from './pages/Login';
import { Tasks } from './pages/Tasks';

const App = () => (
  <div>
    <Route path="/" component={Tasks} />
    <Route path="/tasks" component={Tasks} />
    <Route path="/login" component={Login} />
  </div>
);

export default App;
