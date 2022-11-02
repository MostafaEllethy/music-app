import { loader } from "assets";

export default function Loader() {
  return (
    <div className="flex justify-center items-center">
      <img src={loader} className="w-32 h-32" alt="loader" />
    </div>
  );
}
