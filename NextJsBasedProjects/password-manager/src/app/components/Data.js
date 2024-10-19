"use client";
import React, { useEffect, useRef } from "react";

// to ask the user to delte
import Swal from "sweetalert2";

// import the toast to show the success message
import { toast } from "react-toastify";

const Data = ({ data, setData, setEditItem }) => {
  const textRef = useRef();

  // to show the full comment
  const toggleText = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          showFullText: !item.showFullText,
        };
      }
      return item;
    });
    setData(updatedData);
  };

  //copy text function
  const copyText = (text) => {
    toast.success("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    navigator.clipboard.writeText(text);
  };

  //delete function
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      position: "center",
      customClass: {
        popup: "w-80 h-auto bg-[#EBE0DB]",
        title: "text-xl font-bold", // Custom Tailwind classes for title
        confirmButton: "bg-blue-500 text-white px-4 py-1 rounded", // Tailwind for the 'Yes' button
        cancelButton: "bg-red-500 text-white px-4 py-1 rounded", // Tailwind for the 'No' button
      },
    }).then((result) => {
      if (result.isConfirmed) {
        let newData = data.filter((item) => item.id !== id);
        setData(newData);
        // set the local storage
        localStorage.setItem(
          "passwords",
          JSON.stringify(data.filter((item) => item.id !== id))
        );
      }
    });
  };

  // edit function
  const handleEdit = (id) => {
    let toEditItem = data.find((item) => item.id === id); //find out the item to be edited
    setEditItem(toEditItem);
    let newData = data.filter((item) => item.id !== id); //delete the edit item
    setData(newData);
  };

  // check comment overflowing
  useEffect(() => {
    if (data && textRef.current) {
      const overFlowElement = textRef.current;
      const overFlowComment = overFlowElement.children[1].innerHTML;

      // Check if the comment is overflowing
      if (overFlowElement.scrollWidth > overFlowElement.clientWidth) {
        const updatedData = data.map((item) => {
          if (item.comment === overFlowComment) {
            return {
              ...item,
              isOverFlowing: true,
            };
          }
          return item;
        });

        //only update when the data change so that no rerenders occur
        if (JSON.stringify(updatedData) !== JSON.stringify(data)) {
          setData(updatedData);
        }
      }
    }
  }, [data, setData]);

  return (
    <div className="container lg:w-[80vw] w-[90vw] mx-auto ">
      <div className="container  w-full">
        <h3 className="text-xl font-bold mb-2">Your Passwords</h3>
        {/* header */}
        {data.length > 0 ? (
          <header className="lg:block hidden overflow-hidden rounded">
            <ul className="flex">
              <ul className="w-2/5 ">
                <li className="w-full bg-[#272422] text-[#FFF7F2] text-center font-bold border  border-gray-300 px-4 py-2">
                  Site URL
                </li>
              </ul>
              <ul className="w-3/5 flex">
                <li className="w-1/2 bg-[#272422] text-[#FFF7F2] text-center font-bold border  border-gray-300 px-4 py-2">
                  Username{" "}
                </li>
                <li className="w-1/2 bg-[#272422] text-[#FFF7F2] text-center font-bold border  border-gray-300 px-4 py-2">
                  Passsword
                </li>
                <li className="w-[146px] bg-[#272422] text-[#FFF7F2] text-center font-bold border  border-gray-300 px-4 py-2">
                  Actions
                </li>
              </ul>
            </ul>
          </header>
        ) : (
          <h4 className="text-[#9b938e] text-xl ">Nothing to show here...</h4>
        )}

        <ul>
          {data
            ? data.map((item) => (
                <li
                  className=" mt-9 lg:mt-2 border border-[#605B57] bg-zinc-300    rounded-lg overflow-hidden "
                  key={item.id}
                >
                  <ul className="flex  flex-col lg:flex-row   ">
                    <ul className="  lg:w-2/5 w-full">
                      {/* site */}

                      <li className=" bg-gray-800 text-white lg:hidden block border w-full  border-gray-300 px-4 py-1 text-center font-bold">
                        Site URL
                      </li>
                      <li className="flex bg-[#CBC3C8]  border  border-gray-300 lg:pl-4 py-1 justify-between items-center">
                        <a
                          target="blank"
                          href={item.site}
                          className="underline break-all line-clamp-1  w-[90%] overflow-hidden overflow-ellipsis"
                        >
                          {item.site}
                        </a>

                        <lord-icon
                          onClick={() => {
                            copyText(item.site);
                          }}
                          style={{
                            width: "25px",
                            height: "25px",
                            paddingTop: "3px",
                            cursor: "pointer",
                          }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                        ></lord-icon>
                      </li>
                    </ul>
                    <ul className="lg:w-3/5  w-full flex">
                      {/* username */}
                      <ul className="w-1/2">
                        <li className="bg-gray-800 text-white text-center font-bold lg:hidden block border  border-gray-300 px-4 py-2">
                          Username
                        </li>
                        <li className="flex bg-[#CBC3C8]  border  border-gray-300 lg:pl-4 py-1   justify-between items-center ">
                          <p className="break-all line-clamp-1 flex-shrink w-[70%] overflow-hidden overflow-ellipsis">
                            {item.username && item.username}
                          </p>

                          <lord-icon
                            onClick={() => {
                              copyText(item.username);
                            }}
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              cursor: "pointer",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </li>
                      </ul>
                      {/* password */}
                      <ul className="w-1/2">
                        <li className="bg-gray-800 text-white text-center font-bold lg:hidden block border  border-gray-300 px-4 py-2">
                          Password
                        </li>

                        <li className="flex bg-[#CBC3C8] border  border-gray-300 pl-4 py-1 justify-between items-center">
                          <p className="break-all line-clamp-1 w-[70%] overflow-hidden overflow-ellipsis">
                            {"•".repeat(item.password.length)}
                          </p>
                          <lord-icon
                            onClick={() => {
                              copyText(item.password);
                            }}
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              cursor: "pointer",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </li>
                      </ul>
                      {/* actions */}
                      <ul className="w-[150px]">
                        <li className="bg-gray-800 text-white text-center font-bold lg:hidden block border  border-gray-300 px-4 py-2">
                          Actions
                        </li>

                        <li className="flex bg-[#CBC3C8] space-x-1  border   border-gray-300 px-2 pb-[5px] justify-center items-center">
                          {/* edit icon */}
                          <lord-icon
                            onClick={() => {
                              handleEdit(item.id);
                            }}
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            state="hover-line"
                            colors="primary:#121331,secondary:#605b57"
                            style={{
                              width: "28px",
                              height: "28px",
                              cursor: "pointer",
                            }}
                          ></lord-icon>

                          {/* delete icon */}
                          <lord-icon
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                            src="https://cdn.lordicon.com/hwjcdycb.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#121331,secondary:#605b57"
                            style={{
                              width: "25px",
                              height: "25px",
                              cursor: "pointer",
                            }}
                          ></lord-icon>
                        </li>
                      </ul>
                    </ul>
                  </ul>

                  {/* commet */}
                  {item.comment && (
                    <ul>
                      <li
                        colSpan="4"
                        className="relative border-t-2 bg-[#CBC3C8]  border-zinc-300"
                      >
                        <div className="flex">
                          <span
                            ref={textRef}
                            className={
                              !item.showFullText
                                ? "text-ellipsis overflow-hidden  whitespace-nowrap w-calc-custom"
                                : ""
                            }
                          >
                            <span className="font-bold ml-2">
                              {" "}
                              Note: &nbsp;{" "}
                            </span>
                            <span>{item.comment}</span>
                            {item.showFullText && (
                              <button
                                className="text-blue-500 underline ml-2 whitespace-nowrap"
                                onClick={() => toggleText(item.id)}
                              >
                                show less
                              </button>
                            )}
                          </span>

                          {!item.showFullText && item.isOverFlowing && (
                            <button
                              onClick={(e) => {
                                toggleText(item.id);
                              }}
                              className="whitespace-nowrap text-blue-500 underline mx-2"
                            >
                              show more
                            </button>
                          )}
                        </div>
                      </li>
                    </ul>
                  )}
                </li>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default Data;
