import React, { useState } from "react";

export default function useUpdateShoppingCartForLocalStorage(): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] {
  const [hasChange, setHasChange] = useState<boolean>(false);
  return [hasChange, setHasChange];
}
