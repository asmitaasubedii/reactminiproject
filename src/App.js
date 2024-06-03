import { TaskTracker } from "./Components/pages/taskTracker";
import { Timer } from "./Components/pages/timer";
import { Todo } from "./Components/pages/todo";

import "./Styling/App.css";

function App() {
  return (
    <div className="App">
      <TaskTracker />
    </div>
  );
}

export default App;
