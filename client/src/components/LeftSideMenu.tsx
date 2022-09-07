import React from "react";
import { Link } from "react-router-dom";

export const LeftSideMenu = () => {
  return (
    <aside
      className="flex-1 w-full h-full border-solid border-2 border-indigo-600"
      aria-label="Sidebar"
    >
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded h-full">
        <div className="flex flex-col gap-2 p-2">
          <Link to="/contacts">Contacts</Link>
          <Link to="/">Lead Finder</Link>
        </div>
      </div>
    </aside>
  );
};

/* 
import React from "react";
import { Link } from "react-router-dom";

export const LeftSideMenu = () => {
  return (
    <aside
      className="flex-1 w-full h-full border-solid border-2 border-indigo-600"
      aria-label="Sidebar"
    >
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded h-full">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">
                <Link to="/">Lead Finder</Link>
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">
                <Link to="/contacts">Contacts</Link>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};
 */
