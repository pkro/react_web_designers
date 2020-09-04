(function () {
  "use strict";

  function ProductImage(props) {
    const { color } = props;
    return <img src={`../../../assets/${color}.jpg`} alt={`${color} sneaker`} />;
  }

  function Pulldown({ name, id, values, selected, onChange }) {
    return (
      <select id={id} name={name} onChange={onChange} defaultValue={selected}>
        {values.map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
    );
  }

  function SizePD({ sizes, selected, onChange }) {
    return (
      <div className="field-group">
        <label htmlFor="size-options">Size:</label>
        <Pulldown
          name="sizeOptions"
          id="size-options"
          values={sizes}
          selected={selected}
          onChange={onChange}
        />
      </div>
    );
  }

  function ColorPD({ colors, selected, onChange }) {
    return (
      <div className="field-group">
        <label htmlFor="color-options">Color:</label>
        <Pulldown
          name="colorOptions"
          id="color-options"
          values={colors}
          selected={selected}
          onChange={onChange}
        />
      </div>
    );
  }

  function ProductCustomizer(props) {
    const { allColors, allSizes, byColor, bySize } = window.Inventory;
    const defaultColor = Object.keys(byColor)[0]; // we only want a color currently in the inventory
    const defaultSize = byColor[defaultColor][0];

    const [size, setSize] = React.useState(defaultSize);
    const [color, setColor] = React.useState(defaultColor);
    const [sizes, setSizes] = React.useState(allSizes);
    const [colors, setColors] = React.useState(allColors);

    const updateSizes = (event) => {
      setColor(event.target.value);
      setSizes(byColor[event.target.value]);
    };

    const updateColors = (event) => {
      setSize(event.target.value);
      setColors(bySize[event.target.value]);
    };

    return (
      <div className="customizer">
        <div className="product-image">
          <ProductImage color={color} />
        </div>
        <div className="selectors">
          <SizePD sizes={sizes} selected={size} onChange={updateColors} />
          <ColorPD colors={colors} selected={color} onChange={updateSizes} />
        </div>
      </div>
    );
  }

  ReactDOM.render(<ProductCustomizer />, document.getElementById("react-root"));
})();
