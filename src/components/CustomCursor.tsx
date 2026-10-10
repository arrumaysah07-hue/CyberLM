import { useEffect, useState } from "react";

function CustomCursor() {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const target = event.target as HTMLElement | null;

      setHovering(
        Boolean(
          target?.closest(
            "button, a, input, textarea, select, [data-cursor]"
          )
        )
      );
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${
        hovering ? "is-hovering" : ""
      }`}
      style={{
        left: position.x,
        top: position.y,
      }}
      aria-hidden="true"
    >
      <span />
    </div>
  );
}

export default CustomCursor;