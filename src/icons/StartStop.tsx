import "./startstop.css";

export const StartStop = ({
  running,
  execute,
}: {
  running: boolean;
  execute: (id: string) => {};
}) => {
  return (
    <svg
      className="transition-all duration-300"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      onClick={execute}
    >
      <polygon
        points={
          running
            ? "20,20 20,380 380,380 380,20"
            : "20,20 20,380 333,200 333,200"
        }
        fill="black"
        stroke="black"
        strokeWidth="20"
        strokeLinejoin="round"
      />
    </svg>
  );
};
