import React from "react";
import { JsxElement } from "typescript";

interface Title {
  heading: string;

  content: React.ReactNode | React.ReactNode[];
}

export const ContentContainer = ({ heading, content }: Title) => {
  return (
    <div className="flex flex-col gap-5 text-gray-900 p-6 bg-white rounded-lg border border-gray-100 shadow">
      <h2>{heading}</h2>
      <div>{content}</div>
    </div>
  );
};
