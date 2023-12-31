import "./Todo.css";
import {
  addTodoItem,
  deleteAllToDoItems,
  getTodoList,
  logout,
  updateTodoItemData,
  deleteTodo,
} from "../../firebase.js";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { auth } from "../../firebase.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";

const App = (props) => {
  const [taskName, setTaskName] = useState("");
  const [loading, setLoading] = useState(true);
  const authState = useSelector((state) => state.auth);

  const [toDoList, setToDoList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkAuth = (id) => {
    if (id) {
      setLoggedIn(true);
      console.log(id);
    }
  };

  const getAllItems = () => {
    getTodoList().then((data) => {
      setToDoList(data);
    });
  };
  // const test = useMemo(() => {
  //   return <div>a</div>;
  // }, [toDoList]);
  //u dep arrayu kad se desava kad se promeni todolist
  // value varijable test je ono sto usememo vraca

  // const test = useCallback(()=>{
  // getTodoList()
  // },[])
  // Kao useeffect posle mozemo test da stavljamo u dep array u useeffect
  const deleteHandler = async (id) => {
    try {
      await deleteTodo(id);
      getAllItems();
    } catch (err) {
      alert(err);
    }
  };

  const LoadingData = (id) => {
    setTimeout(() => {
      setLoading(false);
      getAllItems();
    }, 1000);
  };

  useEffect(() => {
    LoadingData();
  }, []);

  useEffect(() => {
    if (authState.id !== undefined) {
      checkAuth(authState.id);
    }
  }, [authState.id]);

  const addNewTask = () => {
    const itemData = {
      tittle: taskName,
      description: "",
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
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div className="container">
      {loggedIn ? (
        <Button
          className="butto"
          variant="contained"
          onClick={() => {
            logout();

            setLoggedIn(false);
            getAllItems();
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          className="butto"
          variant="contained"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
      )}

      {loggedIn ? (
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
                // const taskNameValue = event.target.value;
                setTaskName(event.target.value);
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: " 0px",
                    width: "100%",
                  }}
                >
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
                  <Box
                    onClick={() => deleteHandler(item.id)}
                    sx={{
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <DeleteIcon color="error" />
                  </Box>
                </Box>
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
      ) : (
        <div>U need to login first to use todolist!</div>
      )}
    </div>
  );
};

export default App;
