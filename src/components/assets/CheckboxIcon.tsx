import React from 'react';

export function CheckboxIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={512}
      height={512}
      {...props}
    >
      <g data-name="01 align center">
        <path d="M24 24H0V3a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3ZM2 22h20V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1Z" />
        <path d="M9.333 17.919a1.985 1.985 0 0 1-1.414-.586l-4.626-4.626 1.414-1.414 4.626 4.626 9.96-9.959 1.414 1.414-9.959 9.959a1.987 1.987 0 0 1-1.415.586Z" />
      </g>
    </svg>
  );
}
