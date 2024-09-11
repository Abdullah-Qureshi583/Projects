import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
uuidv4();

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [showFinished, setShowFinished] = useState(true);
  const [theme, setTheme] = useState("darkGreen");
  const inputRef = useRef(null);

  const saveToLocalStorage = (todos, theme) => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("theme", JSON.stringify(theme));
  };

  const handleDeleteAll = () => {
    setTodos([]);
    saveToLocalStorage(todos, theme);
    localStorage.removeItem("todos");
  };

  useEffect(() => {
    // save to local storage
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      try {
        const theme = JSON.parse(localStorage.getItem("theme"));
        const todos = JSON.parse(localStorage.getItem("todos"));
        setTodos(todos);
        setTheme(theme);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        console.log("THere is nothing in your local host to show it here");
      }
    }

    // add a cursor on input when page loads
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleShowFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleSave = () => {
    if (!todo.trim()) return;
    const newTodo = { todo, isCompleted: false, id: uuidv4() };
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];
      saveToLocalStorage(updatedTodos, theme);
      return updatedTodos;
    });
    setTodo("");
  };

  const handleEdit = (e, id) => {
    let extractedTodo = { ...todos.find((element) => element.id === id) };
    setTodo(extractedTodo.todo);
    let newTodos = todos.filter((element) => {
      return element.id !== extractedTodo.id;
    });
    setTodos(newTodos);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    saveToLocalStorage(newTodos, theme);
  };

  const handleDelete = (e, id) => {
    let extractedTodo = { ...todos.find((element) => element.id === id) };
    let newTodos = todos.filter((element) => {
      return element.id !== extractedTodo.id;
    });
    setTodos(newTodos);
    saveToLocalStorage(newTodos, theme);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e, id) => {
    let index = todos.findIndex((val) => val.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage(newTodos, theme);
  };

  const changeTheme = (themeName) => {
    saveToLocalStorage(todos, themeName);
    setTheme(themeName);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };
  return (
    <div
      className={
        theme === "darkGreen"
          ? "overflow-hidden bg-gradient-to-r from-[#636565] to-[#072e3f] text-[#f9e3e5] h-screen"
          : theme === "skyBlue"
          ? " overflow-hidden bg-gradient-to-r from-[#c0e6f7] to-[#ecf0f2] text-[#42433f] h-screen"
          : theme === "black"
          ? " overflow-hidden bg-gradient-to-r from-[#131f21] to-[#000000] text-[#fdfeff] h-screen"
          : ""
      }
    >
      <Navbar theme={theme} />
      <main className="p-8 pt-[63px] ">
        <div className="themes flex gap-2 fixed right-5 z-50 mt-2">
          <div
            onClick={() => {
              changeTheme("darkGreen");
            }}
            className="bg-gradient-to-r from-[#636565] to-[#072e3f] border h-8 rounded-full cursor-pointer w-8"
          ></div>
          <div
            onClick={() => {
              changeTheme("skyBlue");
            }}
            className="bg-gradient-to-r from-[#d6f2fe] to-[#ecf0f2] border border-[#93989a]  h-8 rounded-full cursor-pointer w-8"
          ></div>
          <div
            onClick={() => {
              changeTheme("black");
            }}
            className="bg-gradient-to-r from-[#131f21] to-[#000000] border h-8 rounded-full cursor-pointer w-8"
          ></div>
        </div>
        <div className="   px-7  container m-auto   flex items-center flex-col py-3">
          <div className="px-2 ">
            <h1 className="text-center font-semibold text-5xl mb-6 ">
              {/* Stay Organized with TaskFlow */}
              Just do it.<span className="font-extralight text-6xl">|</span>
            </h1>
            <h2 className="font-bold text-xl self-start mb-2">Add Todo...</h2>
            <div className="inputfield flex  h-9  ">
              <input
                ref={inputRef}
                className={
                  theme === "darkGreen"
                    ? "px-2 min-w-[40vw] rounded-s-full h-full focus:outline-none bg-[#111312] text-[#9c9fa1] placeholder-[#9c9fa1]"
                    : theme === "skyBlue"
                    ? "px-2 min-w-[40vw] rounded-s-full h-full focus:outline-none bg-[#afb3b6] text-[#252a2d] placeholder-[#252a2d]"
                    : theme === "black"
                    ? "px-2 min-w-[40vw] rounded-s-full h-full focus:outline-none bg-[#00364b] text-[#fffdfe] placeholder-[#e4e2e3]"
                    : ""
                }
                value={todo}
                onChange={handleChange}
                onKeyDown={handleEnterKey}
                type="text"
                placeholder="Type your task here..."
              />
              <button
                className={
                  theme === "darkGreen"
                    ? "h-full   rounded-e-full  px-4  hover:font-bold disabled:text-[#5f5b5b]  disabled:font-normal bg-[#f7e4e0] text-[#0d1013]"
                    : theme === "skyBlue"
                    ? "h-full   rounded-e-full  px-4  hover:font-bold disabled:text-[#5f5b5b]  disabled:font-normal bg-[#dae7ee] text-[#0d1013]"
                    : theme === "black"
                    ? "h-full   rounded-e-full  px-4  hover:font-bold disabled:text-[#7b898e]  disabled:font-normal bg-[#002c3e] text-[#d1f0f5]"
                    : ""
                }
                disabled={todo.length <= 0}
                onClick={handleSave}
              >
                save
              </button>
            </div>
            <div className="flex w-full justify-between">
              <div>
                <input
                  type="checkbox"
                  id="show"
                  className="mt-3 mr-3 cursor-pointer"
                  onChange={handleShowFinished}
                  checked={showFinished}
                />
                <label
                  className="font-semibold text-md  self-start cursor-pointer "
                  htmlFor="show"
                >
                  Show Finished
                </label>
              </div>

              <button
                onClick={handleDeleteAll}
                className={
                  theme === "darkGreen"
                    ? "rounded-md h-8 mt-2   px-4  hover:font-bold  bg-[#f7e4e0] text-[#0d1013]"
                    : theme === "skyBlue"
                    ? "rounded-md h-8 mt-2 px-4  hover:font-bold  bg-[#ccdbe3] text-[#0d1013]"
                    : theme === "black"
                    ? "rounded-md h-8 mt-2  px-4  hover:font-bold  bg-[#002c3e] text-[#d1f0f5]"
                    : ""
                }
              >
                Delete All
              </button>
            </div>
            <div className="h-[1px] bg-black w-3/4 m-auto md:mt-4 mt-2"></div>
            <section className=" mt-2 xsm:px-4  ">
              <div className=" bg-transparent space-y-2  w-10/12  m-auto">
                {todos.length > 0 ? (
                  <h2 className="font-bold text-xl self-start">Your Todos</h2>
                ) : (
                  <h2 className="font-bold text-xl self-start">
                    Add a todo to Preview it here{" "}
                  </h2>
                )}
                <div className="todos overflow-auto  md:h-[40vh] pb-4 sm:h-[50vh] xsm:h-[40vh]">
                  {todos.map((item) => {
                    return (
                      (showFinished || !item.isCompleted) && (
                        <div
                          key={uuidv4()}
                          className={
                            theme === "darkGreen"
                              ? "bg-[#111312]  todo flex py-1 px-1 items-center  mb-2 w-full justify-between  rounded-xl "
                              : theme === "skyBlue"
                              ? "bg-[#afb3b6]  todo flex py-1 px-1 items-center  mb-2 w-full justify-between  rounded-xl "
                              : theme === "black"
                              ? "bg-[#00364b]  todo flex py-1 px-1 items-center  mb-2 w-full justify-between  rounded-xl "
                              : ""
                          }
                        >
                          <input
                            onChange={(e) => {
                              handleCheckbox(e, item.id);
                            }}
                            type="checkbox"
                            className="w-5 h-5 mr-2 focus:border-slate-200 "
                            checked={item.isCompleted}
                            id=""
                          />
                          <div
                            className={
                              item.isCompleted
                                ? "line-through w-full text-start "
                                : "w-full text-start  "
                            }
                          >
                            {item.todo}
                          </div>
                          <div className="buttons h-7 flex gap-1 ">
                            <button
                              onClick={(e) => {
                                handleEdit(e, item.id);
                              }}
                              className={
                                theme === "darkGreen"
                                  ? " bg-[#f7e4e0] text-[#0d1013] h-full px-2  hover:font-bold  rounded-md border border-slate-200 text-xs hover:border-slate-200"
                                  : theme === "skyBlue"
                                  ? "  bg-[#dae7ee] text-[#0d1013] h-full px-2  hover:font-bold  rounded-md border border-slate-200 text-xs hover:border-slate-200"
                                  : theme === "black"
                                  ? "  bg-[#002c3e] text-[#d1f0f5] h-full px-2  hover:font-bold  rounded-md border border-slate-200 text-xs hover:border-slate-200"
                                  : ""
                              }
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={(e) => {
                                handleDelete(e, item.id);
                              }}
                              // className="h-full text-white rounded-md px-2 border border-slate-200 text-xs hover:border-slate-200"
                              className={
                                theme === "darkGreen"
                                  ? " bg-[#f7e4e0] text-[#0d1013] h-full px-2  hover:font-bold  rounded-md border border-slate-200 text-xs hover:border-slate-200"
                                  : theme === "skyBlue"
                                  ? "  bg-[#dae7ee] text-[#0d1013] h-full px-2  hover:font-bold  rounded-md border border-slate-200 text-xs hover:border-slate-200"
                                  : theme === "black"
                                  ? "  bg-[#002c3e] text-[#d1f0f5] h-full px-2  hover:font-bold  rounded-md border border-slate-200 text-xs hover:border-slate-200"
                                  : ""
                              }
                            >
                              <RiDeleteBin5Line />
                            </button>
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
