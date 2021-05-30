// import { generator } from '../utils/blobGenerator';

export default function Blob({ className, style, color }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        fill={color ? color : "#146EAA"}
        d="M39.7,-30.3C50.5,-18.1,57.7,-1.6,54.7,12.8C51.6,27.2,38.3,39.5,21.7,49C5.1,58.5,-14.7,65.2,-31.6,59.4C-48.4,53.7,-62.2,35.5,-66.6,15.5C-70.9,-4.6,-65.8,-26.5,-53.1,-39.1C-40.4,-51.7,-20.2,-55.1,-2.9,-52.8C14.4,-50.5,28.9,-42.5,39.7,-30.3Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

// export default function Blob({
//   stroke = false,
//   color = '#146EAA',
//   edges,
//   growth,
//   size = 10,
//   className,
//   style,
// }) {
//   const { path } = generator({
//     edges,
//     growth,
//     size,
//   });

//   const props = {
//     fill: color,
//   };
//   if (stroke) {
//     props.strokeWidth = '7px';
//     props.fill = 'none';
//     props.stroke = color;
//   }

//   return (
//     <svg
//       viewBox={`0 0 ${size} ${size}`}
//       xmlns="http://www.w3.org/2000/svg"
//       width="100%"
//       id="blobSvg"
//       className={className}
//       style={style}
//     >
//       <path id="blob" d={path} {...props} />
//     </svg>
//   );
// }
