import "./Todo.css";
import {
  addTodoItem,
  deleteAllToDoItems,
  getTodoList,
  logout,
  updateTodoItemData,
} from "../../firebase.js";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { auth } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import PlusImg from "./slika/plus.png";

const App = (props) => {
  const [taskName, setTaskName] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const checkUserLoggedIn = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  };

  const consoleLog = async () => {
    try {
      const user = await checkUserLoggedIn();
      setLoggedIn(false);
      if (user?.uid) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Došlo je do greške pri proveri autentikacije:", error);
    }
  };

  consoleLog();
  const getAllItems = () => {
    getTodoList().then((data) => {
      setToDoList(data);
    });
  };
  useEffect(() => {
    getAllItems();
  }, []);
  const addNewTask = () => {
    const itemData = {
      tittle: taskName,
      date: new Date(),
      done: false,
    };
    addTodoItem(itemData).then(() => {
      getAllItems();
    });
  };
  const clearAllItems = () => {
    deleteAllToDoItems().then(() => {
      getAllItems();
    });
  };
  // const deleteItemById = ()=>{

  // }
  const seItemIsDone = (id, done) => {
    updateTodoItemData(id, { done: !done }).then(() => {
      getAllItems();
    });
  };
  return (
    <div className="container">
      {loggedIn ? (
        <Button
          variant="contained"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            navigate("/");
          }}
        >
          Login
        </Button>
      )}
      <div className="todo__box">
        <div className="title">
          <h2 className="h__todo">Todo App</h2>
        </div>
        <div className="form">
          <input
            id="taskName"
            placeholder="Add your new todo"
            value={taskName}
            onChange={(event) => {
              const taskNameValue = event.target.value;
              setTaskName(taskNameValue);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addNewTask();
              }
            }}
          />
          <Button variant="contained" onClick={() => addNewTask()}>
            <AddIcon />
          </Button>
        </div>
        <div id="list" className="d-grid gap-2 col-6 button">
          {toDoList.map((item, index) => {
            return (
              <button
                key={index}
                className="list-items"
                onClick={() => {
                  seItemIsDone(item.id, item.done);
                  console.log(item.done);
                }}
              >
                <p
                  style={{
                    textDecoration: item.done ? "line-through" : "none",
                  }}
                >
                  {item.tittle}
                </p>
              </button>
            );
          })}
        </div>
        <div className="footerr">
          <p className="p">
            You have <span id="numberOfItems">{toDoList.length}</span> pending
            tasks
          </p>
          <Button variant="contained" color="error" onClick={clearAllItems}>
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
