import Link from "next/link";
import React from "react";

const Header = () => {

  const session = null;

  return (
    <header className="text-gray-600 body-font ">
      <div className="container mx-auto flex p-2 md:p-5 flex-row justify-between items-center">
        <a className="flex title-font font-medium justify-center items-center text-gray-900">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-2 text-sm md:text-xl">Stock Management System</span>
        </a>
        { session 
            ? <div className="flex flex-row items-center gap-5">
                <div className="md:flex hidden text-base gap-5">
                    <Link href={"/signin"} className="bg-slate-700 text-slate-200 px-5 py-2 rounded-xl hover:bg-slate-200 hover:text-slate-700 hover:border-2 hover:drop-shadow-xl" >
                      Sign Out
                    </Link>
                </div>
                <div className=" bg-indigo-500 px-4 py-2.5 rounded-full">
                    <span className=" ">U</span>
                </div> 
              </div>
            : <div className="md:flex hidden text-base gap-5">
                <Link href={"/signin"} className="bg-slate-700 text-slate-200 px-5 py-2 rounded-xl hover:bg-slate-200 hover:text-slate-700 hover:border-2 hover:drop-shadow-xl" >
                  Sign In
                </Link>
              </div> 
        }
      </div>
    </header>
  );
};

export default Header;
