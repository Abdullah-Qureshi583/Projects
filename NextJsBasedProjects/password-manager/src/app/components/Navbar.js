"use client";
import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


const Navbar = ({ setData, data }) => {
  const handleDeleteAll = () => {
    {
      data.length > 0
        ? Swal.fire({
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
              localStorage.removeItem("passwords");
              setData("");
            }
          })
        : 
        toast.error("No Passwords to Delete!", {
            className:"md:mt-0 mt-16",
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
    }
  };

  return (
    <nav className="bg-[#463f3a]  ">
      <div className="container mx-auto lg:w-[80vw] px-4 lg:px-0 flex items-center justify-between py-4">
        <div className="logo  text-2xl">
          <span className="text-[#bcb8b1]">&lt;</span>
          <span className="text-[#f4f3ee] font-bold">Forti</span>
          <span className="text-[#bcb8b1]">Lock/&gt;</span>
        </div>
        <button
          onClick={() => {
            handleDeleteAll();
          }}
          className="flex items-center space-x-1 border py-2 text-lg hover:border-white hover:text-white  border-gray-400 rounded-full px-5 text-[#e0e1dd]"
        >
          <lord-icon
            src="https://cdn.lordicon.com/hwjcdycb.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#e1dcd8,secondary:#bbb4af"
            style={{
              width: "30px",
              height: "30px",
              cursor: "pointer",
            }}
          ></lord-icon>
          <p className="text-[#e1dcd8] font-semibold ">Delete All</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
