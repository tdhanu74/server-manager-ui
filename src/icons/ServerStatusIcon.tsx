import { useSpring, animated } from "react-spring";
import clsx from "clsx";

export function ServerStatusIcon({ running }: { running: boolean }) {
  const properties = {
    offline: {
      stroke: "red",
      fill: "red",
    },
    online: {
      stroke: "green",
      fill: "green",
    },
    springConfig: { mass: 4, tension: 250, friction: 35 },
  };

  const { transform, stroke, fill } = running
    ? properties["online"]
    : properties["offline"];

  const svgContainerProps = useSpring({
    transform,
    config: properties.springConfig,
  });

  const circleProps = useSpring({
    stroke,
    fill,
    config: properties.springConfig,
  });

  return (
    <animated.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ ...svgContainerProps }}
    >
      <animated.circle style={{ ...circleProps }} cx="12" cy="12" r="10" />
    </animated.svg>
  );
}
