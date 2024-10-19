"use client";
import InputForm from "@/app/components/InputForm";
import Data from "./Data";
import { useState } from "react";
import Navbar from "./Navbar";

const Content = () => {
  const [data, setData] = useState("");
  const [editItem, setEditItem] = useState({});

  return (
    <>
      <Navbar setData={setData} data={data} />
      <InputForm setData={setData} editItem={editItem} />
      <Data setData={setData} data={data} setEditItem={setEditItem} />
    </>
  );
};

export default Content;
