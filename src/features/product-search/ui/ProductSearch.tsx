"use client";

import { useState } from "react";

export const ProductSearch = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <input type='text' value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};
