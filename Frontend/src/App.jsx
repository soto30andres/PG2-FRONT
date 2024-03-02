import './App.css';
import { Route } from 'wouter';
import { Login } from './pages/Login';
import { Tasks } from './pages/Tasks';
import { Register } from './pages/Register';

const App = () => (
  <div>
    <Route path="/" component={Login} />
    <Route path="/tasks" component={Tasks} />
    <Route path="/login" component={Login} />
    <Route path="/signUp" component={Register} />
  </div>
);

export default App;
