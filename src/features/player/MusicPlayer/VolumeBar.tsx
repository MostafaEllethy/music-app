import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";

const VolumeBar = ({
  value,
  min,
  max,
  setVolume,
}: {
  value: number;
  min: string;
  max: string;
  setVolume: Dispatch<SetStateAction<number>>;
}) => {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setVolume(Number(event.currentTarget.value)),
    [setVolume]
  );

  return (
    <div className="hidden lg:flex flex-1 items-center justify-end">
      <span className="cursor-pointer">
        {value <= 1 && value > 0.5 && (
          <BsFillVolumeUpFill size={24} onClick={() => setVolume(0)} />
        )}
        {value <= 0.5 && value > 0 && (
          <BsVolumeDownFill size={24} onClick={() => setVolume(0)} />
        )}
        {value === 0 && (
          <BsFillVolumeMuteFill size={24} onClick={() => setVolume(1)} />
        )}
      </span>

      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        className="w-32 h-1 ml-2"
      />
    </div>
  );
};

export default VolumeBar;
