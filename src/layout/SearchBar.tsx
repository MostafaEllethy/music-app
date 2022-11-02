import { memo, useCallback, useRef, FormEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";

export default memo(function SearchBar() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement> | MouseEvent<SVGElement>) => {
      e.preventDefault();
      navigate(`/search/${inputRef?.current?.value}`);
    },
    [navigate, inputRef]
  );

  return (
    <form
      className="flex items-center px-2 py-1 gap-1 min-w-0 sm:w-80 lg:w-96 dark:border-transparent border border-slate-500/10 bg-white/5 rounded-sm group"
      autoComplete="off"
      onSubmit={handleFormSubmit}
    >
      <MdSearch
        className="text-2xl cursor-pointer opacity-60 group-focus-within:opacity-100"
        onClick={handleFormSubmit}
      />
      <input
        ref={inputRef}
        name="q"
        autoComplete="off"
        type="search"
        placeholder="Search..."
        className="outline-none border-none max-w-full bg-transparent w-full"
      />
    </form>
  );
});
