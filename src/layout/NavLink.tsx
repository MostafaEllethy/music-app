import { forwardRef, memo } from "react";
import { NavLink as BaseNavLink, NavLinkProps } from "react-router-dom";

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => {
  return (
    <BaseNavLink
      end
      ref={ref}
      {...props}
      className={({ isActive }) =>
        [
          props.className,
          "dark:text-white transition-all duration-300 hover:opacity-100 dark:hover:opacity-100 font-medium",
          isActive ? "opacity-100" : "opacity-70",
        ]
          .filter(Boolean)
          .join(" ")
      }
    />
  );
});

export default memo(NavLink);
