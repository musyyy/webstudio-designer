import * as React from "react";
import type { IconProps } from "./types";

export const PageIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, forwardedRef) => {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          d="M9.19995 2.16168V4.64C9.19995 4.97603 9.19995 5.14405 9.26535 5.27239C9.32287 5.38529 9.41466 5.47708 9.52756 5.5346C9.6559 5.6 9.82392 5.6 10.16 5.6H11.3991H12.6383M12.8 6.79293V11.12C12.8 12.1281 12.8 12.6321 12.6038 13.0172C12.4312 13.3559 12.1558 13.6312 11.8171 13.8038C11.4321 14 10.928 14 9.91995 14H6.07995C5.07186 14 4.56781 14 4.18277 13.8038C3.84408 13.6312 3.56871 13.3559 3.39614 13.0172C3.19995 12.6321 3.19995 12.1281 3.19995 11.12V4.88C3.19995 3.87191 3.19995 3.36786 3.39614 2.98282C3.56871 2.64413 3.84408 2.36876 4.18277 2.19619C4.56781 2 5.07186 2 6.07995 2H8.00702C8.44728 2 8.66741 2 8.87457 2.04973C9.05823 2.09383 9.23381 2.16656 9.39486 2.26525C9.57651 2.37656 9.73217 2.53222 10.0435 2.84353L11.9564 4.75647C12.2677 5.06778 12.4234 5.22344 12.5347 5.40509C12.6334 5.56614 12.7061 5.74172 12.7502 5.92538C12.8 6.13254 12.8 6.35267 12.8 6.79293Z"
          stroke={color}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

PageIcon.displayName = "PageIcon";
