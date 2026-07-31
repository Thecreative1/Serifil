import type { SVGProps } from "react";

export function BrandMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1000 1000"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M238.26 470.71v236.12L427.7 832.21l2.75-85.11 107.99-.92 45.76-44.84-153.75-1.83v-46.68l201.34-.91 46.67-45.76-293.77-1.83-.92 139.11-4.57.91-96.1-63.14V496.34ZM499.08 122.95 238.26 280.36v138.19l228.79 137.28 249.85.91v124.47L502.75 824.89v51.25l258.08-168.39V533.86L437.77 340.76l64.06-42.1 163.82 95.18-1.83-51.25-161.99-96.09-158.33 93.34 276.39 168.4H482.61L283.1 389.26V306.9l219.65-128.13L716.9 306.9v149.17l43.93 26.54V279.44Z"
      />
    </svg>
  );
}
