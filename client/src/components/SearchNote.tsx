import { Input, InputRef } from "antd";
import React, { useRef } from "react";
const { Search } = Input;

const SearchNote = ({
  onSearch,
  refVal,
  allowClear,
}: {
  onSearch: any;
  refVal?: any;
  allowClear?: boolean;
}) => {
  const inputRef = useRef<InputRef>(null);
  return (
    <Input
      placeholder="Search"
      onChange={onSearch}
      ref={refVal}
      // onEnded={() => {
      //   if (inputRef?.current?.input) {
      //     inputRef.current.input.value = "";
      //   }
      // }}
      allowClear={allowClear}
      //   style={{ width: "80%" }}
      //   size="middle"
      //   allowClear
    />
  );
};

export default SearchNote;
