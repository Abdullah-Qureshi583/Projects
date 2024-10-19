"use client";
import { useEffect, useRef, useState } from "react";
// import the uuid pakkage
import { v4 as uuidv4 } from "uuid";
// importing react-hook-form
import { useForm } from "react-hook-form";
// Google icons
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
// import the toast to show the success message
import { toast } from "react-toastify";

export default function Content({ setData, editItem }) {
  const [pasVisible, setPasVisible] = useState(false);
  const [showComment, setShowComment] = useState({
    value: false,
    text: "Add Note",
  });
  const commentInputRef = useRef();

  // get from use form
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // it run when the edit is clecked and set the form inputs to the edit data
  useEffect(() => {
    reset(editItem);
  }, [editItem, reset]);

  // get all the saved passwords and set to data
  useEffect(() => {
    const savedPasswords = localStorage.getItem("passwords");
    if (savedPasswords) {
      setData(JSON.parse(savedPasswords));
    }
  }, [setData]);

  //save the password to the localstorage and set to data
  const onSubmit = (Data) => {
    //show the success message
    toast.success("Password Saved!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    // filter the data
    const newData = {
      ...Data,
      comment: Data.comment ? Data.comment.trim().replace(/\s+/g, " ") : "",
      id: uuidv4(),
      showFullText: false,
      isOverFlowing: false,
    };

    // setData and localstorage logic
    setData((prevItems) => {
      let updatedData = [...prevItems, newData];
      localStorage.setItem("passwords", JSON.stringify(updatedData));
      return updatedData;
    });
    reset({ site: null, username: null, password: null, comment: null });
  };

  // comment button logic
  const handleComment = () => {
    if (showComment.value == false) {
      setShowComment({ value: true, text: "Hide Note" });
    } else {
      setShowComment({ value: false, text: "Add Note" });
    }
  };

  // password visible logic
  const handleEyeClick = () => {
    setPasVisible(!pasVisible);
  };

  return (
    <>
      {/* Form */}
      <form
        className="container lg:w-[80vw]   flex flex-col  m-auto px-9 mt-10 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center mb-5 text-black text-2xl lg:text-3xl font-semibold ">
          <p>Protect your Passwords with</p>
          <div className="text-4xl font-semibold ">
            <span className="text-[#928C88]">&lt;</span>
            <span className="text-[#463F3A] font-bold">Forti</span>
            <span className="text-[#928C88]">Lock/&gt;</span>
          </div>
        </h2>
        {/* Site Input */}
        <div className="w-full flex flex-col sm:flex-row overflow-hidden  items-center  ">
          <label
            className="whitespace-nowrap mr-2 font-bold text-lg"
            htmlFor="site"
          >
            Site Name:{" "}
          </label>
          <input
            type="text"
            // type='url'
            id="site"
            placeholder="Enter your Site URL here..."
            className={` border border-zinc-500 rounded-full w-full  px-4 py-2  focus:bg-zinc-200 focus:placeholder-zinc-900`}
            {...register("site", {
              required: { value: true, message: "This field is required!" },
            })}
          />
          {errors.site && (
            <p className="text-red-500 grow-1 whitespace-nowrap font-bold">
              {errors.site.message}
            </p>
          )}
        </div>

        {/* Second Row Contauner */}
        <div className="flex flex-col sm:flex-row w-full justify-center  items-center  px-2 mt-3  ">
          {/* Username */}
          <div className="sm:w-2/3 w-full flex flex-col items-center   ">
            <label
              className="whitespace-nowrap mr-2 font-bold text-lg"
              htmlFor="username"
            >
              Username:{" "}
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username!"
              className={` border border-zinc-500 rounded-full w-full  px-4 py-2  focus:bg-zinc-200 focus:placeholder-zinc-900`}
              {...register("username", {
                required: { value: true, message: "This field is required!" },
              })}
            />
            {errors.username && (
              <p className="text-red-500 grow-1 whitespace-nowrap font-bold">
                {errors.username.message}
              </p>
            )}
          </div>
          {/* Password Container */}
          <div className="sm:w-1/2 w-full flex flex-col items-center ml-3 ">
            <label
              className="whitespace-nowrap mr-2 font-bold text-lg"
              htmlFor="password"
            >
              Password:{" "}
            </label>
            {/* Password */}
            <div className="w-full   border border-zinc-500 bg-white justify-between  rounded-full  flex px-4 py-2 focus-within:border-black focus-within:border-2  focus-within:bg-zinc-200 ">
              <input
                id="password"
                placeholder="Enter Password!"
                className="bg-transparent focus:placeholder-zinc-900  w-full focus:outline-none"
                type={pasVisible ? "text" : "password"}
                {...register("password", {
                  required: { value: true, message: "Required!" },
                })}
              />

              {pasVisible ? (
                <MdVisibility
                  onClick={handleEyeClick}
                  size={24}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <MdVisibilityOff
                  onClick={handleEyeClick}
                  size={24}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 grow-1 whitespace-nowrap font-bold">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        {/* Comment Container */}
        <div className="w-full flex flex-col md:flex-row mt-5  items-center justify-center  ">
          {/* Comment  */}
          {showComment.value && (
            <textarea
              ref={commentInputRef}
              placeholder="Enter your Note here!"
              className={` border border-zinc-500 rounded-lg w-full   px-4 py-2  focus:bg-zinc-200 focus:placeholder-zinc-900`}
              {...register("comment")}
            />
          )}
          {/* Add Comment button */}
          <button
            onClick={handleComment}
            type="button"
            className="mt-2 sm:ml-2 flex cursor-pointer  bg-[#625750] border border-zinc-100 rounded-full px-3   py-[5px] text-lg text-[#f1efea] justify-center items-center w-fit "
          >
            <lord-icon
              src="https://cdn.lordicon.com/ayhtotha.json"
              trigger="hover"
              colors="primary:#f1efea"
            ></lord-icon>

            <span className="ml-1 whitespace-nowrap font-semibold">
              {showComment.text}
            </span>
          </button>
        </div>

        {/* Add save Button */}
        <div className="buttonContainer w-full flex justify-center mt-3">
          <button
            type="submit"
            className="flex bg-[#463f3a] border border-zinc-100 rounded-full px-4 py-1 text-xl text-[#E6E2D2] font-bold justify-center items-center w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#E6E2D2"
            ></lord-icon>

            <span className="ml-1">Add </span>
          </button>
        </div>
      </form>
    </>
  );
}
