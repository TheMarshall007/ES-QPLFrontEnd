import React from "react";

function useStateCallback(initialState) {
  const [state, setState] = React.useState(initialState);
  const cbRef = React.useRef(null); // mutable ref to store current callback

  const setStateCallback = React.useCallback((state, cb) => {
    cbRef.current = cb; // store passed callback to ref
    setState(state);
  }, []);

  React.useEffect(() => {
    // cb.current is `null` on initial render, so we only execute cb on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
}

function useConstructor(onBuilding) {
  const created = React.useRef(false);
  if (!created.current) {
    created.current = true;
    onBuilding();
  }
}

function useMount(onMount, onUnmount) {
  const mounted = React.useRef(false);
  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      onMount();
      return onUnmount;
    }
  }, [onMount, onUnmount, mounted]);
}

const hooks = {
  useStateCallback,
  useMount,
  useConstructor,
};
export default hooks;
