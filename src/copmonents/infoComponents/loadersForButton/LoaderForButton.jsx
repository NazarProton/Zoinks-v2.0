function LoaderForButton({ color, size }) {
  let ovalColor;
  switch (color) {
    case 'yellow':
      ovalColor = '#5D79CA';
      break;

    default:
      ovalColor = '#20C4D8';
      break;
  }
  return (
    <div className="relative w-8 h-8 mt-[5.5px] mr-5">
      <div className={`loader w-${size} h-${size}`}>
        <ul className="hexagon-container">
          <li className="hexagon hex_1"></li>
          <li className="hexagon hex_2"></li>
          <li className="hexagon hex_3"></li>
          <li className="hexagon hex_4"></li>
          <li className="hexagon hex_5"></li>
          <li className="hexagon hex_6"></li>
          <li className="hexagon hex_7"></li>
        </ul>
      </div>
    </div>
  );
}

export default LoaderForButton;
