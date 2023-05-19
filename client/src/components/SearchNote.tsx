import { Input } from "antd";
import React from "react";
const { Search } = Input;

const SearchNote = ({ onSearch }) => {
  return (
    <Input
      placeholder="Search"
      onChange={onSearch}

      //   style={{ width: "80%" }}
      //   size="middle"
      //   allowClear
    />
  );
};

export default SearchNote;
