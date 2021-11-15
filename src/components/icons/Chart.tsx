import { SVGAttributes } from 'react'

interface ChartProps extends SVGAttributes<SVGElement> {
  color?: string;
}

function Chart({ color="#000000", ...props }: ChartProps) {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill={color} 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Iconly/Light-Outline/Chart">
        <g id="Chart">
          <path 
            id="Fill 1" 
            fill-rule="evenodd" 
            clip-rule="evenodd" 
            d="M7.12109 17.5625C6.70709 17.5625 6.37109 17.2265 6.37109 16.8125V9.95251C6.37109 9.53851 6.70709 9.20251 7.12109 9.20251C7.53509 9.20251 7.87109 9.53851 7.87109 9.95251V16.8125C7.87109 17.2265 7.53509 17.5625 7.12109 17.5625Z"
          />
          <path 
            id="Fill 3" 
            fill-rule="evenodd" 
            clip-rule="evenodd" 
            d="M11.7881 17.5615C11.3741 17.5615 11.0381 17.2255 11.0381 16.8115V6.66846C11.0381 6.25446 11.3741 5.91846 11.7881 5.91846C12.2021 5.91846 12.5381 6.25446 12.5381 6.66846V16.8115C12.5381 17.2255 12.2021 17.5615 11.7881 17.5615Z"
          />
          <path 
            id="Fill 5" 
            fill-rule="evenodd" 
            clip-rule="evenodd" 
            d="M16.3784 17.5615C15.9644 17.5615 15.6284 17.2255 15.6284 16.8115V13.5775C15.6284 13.1635 15.9644 12.8275 16.3784 12.8275C16.7924 12.8275 17.1284 13.1635 17.1284 13.5775V16.8115C17.1284 17.2255 16.7924 17.5615 16.3784 17.5615Z"
          />
          <path 
            id="Fill 7" 
            fill-rule="evenodd" 
            clip-rule="evenodd" 
            d="M7.064 2.5C4.292 2.5 2.5 4.397 2.5 7.335V16.165C2.5 19.103 4.292 21 7.064 21H16.436C19.209 21 21 19.103 21 16.165V7.335C21 4.397 19.209 2.5 16.436 2.5H7.064ZM16.436 22.5H7.064C3.437 22.5 1 19.954 1 16.165V7.335C1 3.546 3.437 1 7.064 1H16.436C20.063 1 22.5 3.546 22.5 7.335V16.165C22.5 19.954 20.063 22.5 16.436 22.5Z"
          />
        </g>
      </g>
    </svg>
    )
}

export default Chart
