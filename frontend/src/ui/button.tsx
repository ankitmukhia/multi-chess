import React from "react";

export const Button = ({ children, onClick }: {
  children: React.ReactNode,
  onClick: () => void
}) => {
  return <button
    onClick={onClick}
    className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mb-2"
  >
    {children}
  </button>
}
