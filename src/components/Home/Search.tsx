"use client";
import React, { useEffect } from "react";

const Search = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return <div className="absolute">Search</div>;
};

export default Search;
