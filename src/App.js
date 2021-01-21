import Header from './component/Header'
import Tasks from './component/Tasks'
import AddTasks from './component/AddTasks'
import Footer from './component/Footer'
import About from './component/About'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
const url = window.location.protocol + "//" + window.location.hostname + ":5000/tasks";
function App() {
  const [showAddTasks, setShowAddTasks] = useState(false)
  const [tasks, setTasks] = useState([

  ]);
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])
  const fetchTasks = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data
  }
  const fetchTask = async (id) => {
    const response = await fetch(url + `/${id}`);
    const data = await response.json();
    return data
  }
  const deleteTask = async (id) => {
    await fetch(url + `/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }
  const toggleRemider = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(url + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
    setTasks(
      tasks.map((task) =>
        task.id === id ? {
          ...task, reminder:
            data.reminder
        } : task
      )
    )
  };
  const addTask = async (task) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])

  };
  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTasks(!showAddTasks)} showAdd={showAddTasks} />

        <Route path='/' exact render={(props) => (
          <>
            {showAddTasks && <AddTasks onAdd={addTask} />}
            {tasks.length > 0 ? (<Tasks tasks={tasks}
              onDelete={deleteTask} onToggle={toggleRemider} />) : ('no tasks to show')}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
