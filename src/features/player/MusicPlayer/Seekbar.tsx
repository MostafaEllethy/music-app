import { Dispatch, SetStateAction, FormEvent, useCallback } from "react";

const Seekbar = ({
  value,
  min,
  max,
  setSeekTime,
}: {
  value: number;
  min: string;
  max: number;
  setSeekTime: Dispatch<SetStateAction<number>>;
}) => {
  const getTime = (time: number) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  const onInput = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setSeekTime(Number(event.currentTarget.value));
    },
    [setSeekTime]
  );

  return (
    <div className="hidden sm:flex flex-row items-center">
      <p>{value === 0 ? "0:00" : getTime(value)}</p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="md:block w-24 md:w-56 xl:w-64 h-1 mx-4 2xl:mx-6 rounded-lg"
      />
      <p>{max === 0 ? "0:00" : getTime(max)}</p>
    </div>
  );
};

export default Seekbar;
