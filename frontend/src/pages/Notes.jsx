import React from "react";
import TaptapEditor from "../components/taptap/TaptapEditor";
import Sidebar from "../components/Sidebar";

const Notes = () => {
  return (
    <div
      className=" grid sm:grid-cols-12 gap-0.5 sm:h-screen overflow-hidden
"
    >
      <Sidebar></Sidebar>

      <div className="sm:col-span-9 bg-white overflow-auto scrollbar-notion ">
        <TaptapEditor></TaptapEditor>
      </div>
    </div>
  );
};

export default Notes;
