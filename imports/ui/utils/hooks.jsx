import React from "react";

export function useDimensions(deps = []) {
  const ref = React.useRef();
  const [dimensions, setDimensions] = React.useState({});

  React.useLayoutEffect(() => {
    setDimensions(ref.current.getBoundingClientRect().toJSON());
  }, [ref.current, ...deps]);

  return [ref, dimensions];
}

export function useScreenRect(deps = []) {
  const ref = React.useRef();
  const [rect, setRect] = React.useState();

  React.useLayoutEffect(() => {
    const clientRect = ref.current.getBoundingClientRect();
    console.log(clientRect);
    setRect(clientRect.toJSON());
  }, [ref.current, ...deps]);

  return [ref, rect];
}