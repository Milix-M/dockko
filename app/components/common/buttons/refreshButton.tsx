import { IconButton } from "@material-tailwind/react";
import type { RevalidationState } from "@remix-run/router";
import { LuRefreshCw } from "react-icons/lu";

type Prop = {
  buttonClassName?: string;
  iconClassName?: string;
  size: "sm" | "md" | "lg";
  variant: "filled" | "gradient" | "outlined" | "text";
  revalidator: {
    revalidate: () => void;
    state: RevalidationState;
  };
};

export default function RefreshButton({
  buttonClassName,
  size,
  variant,
  iconClassName,
  revalidator,
}: Prop) {
  return (
    <IconButton
      variant={variant}
      size={size}
      className={iconClassName}
      onClick={() => {
        revalidator.revalidate();
      }}
    >
      <LuRefreshCw className={buttonClassName} />
    </IconButton>
  );
}
