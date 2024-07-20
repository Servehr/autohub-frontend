import React, { useState, useEffect } from "react";
import Img from "react-image";

function Image({ src, className: classname }) 
{
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <Img
      src={src}
      className={classname}
      onLoad={() => {
        if (isMounted) {
          setIsLoading(false);
        }
      }}
      onError={() => {
        if (isMounted) {
          setIsLoading(false);
        }
      }}
    />
  );
}

export default MyComponent;
