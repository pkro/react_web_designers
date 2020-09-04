(function () {
  "use strict";

  function ProductImage(props) {
    const { color } = props;
    return <img src={`../../../assets/${color}.jpg`} alt={`${color} sneaker`} />;
  }

  function Pulldown({ name, id, values }) {
    return (
      <select id={id} name={name}>
        {values.map((val, idx) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
    );
  }

  function SizePD({ sizes }) {
    return (
      <div className="field-group">
        <label htmlFor="size-options">Size:</label>
        <Pulldown name="sizeOptions" id="size-options" values={sizes} />
      </div>
    );
  }

  function ColorPD({ colors }) {
    return (
      <div className="field-group">
        <label htmlFor="color-options">Color:</label>
        <Pulldown name="colorOptions" id="color-options" values={colors} />
      </div>
    );
  }

  function ProductCustomizer(props) {
    const { allColors, allSizes, byColor, bySize } = window.Inventory;
    return (
      <div className="customizer">
        <div className="product-image">
          <ProductImage color={"red"} />
        </div>
        <div className="selectors">
          <SizePD sizes={allSizes} />
          <ColorPD colors={allColors} />
        </div>
      </div>
    );
  }

  ReactDOM.render(<ProductCustomizer />, document.getElementById("react-root"));
})();
