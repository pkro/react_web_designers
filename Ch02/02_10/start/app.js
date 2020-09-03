(function() {
  "use strict";

  function SizeSelector(props) {
    function sizeOptions() {
      return props.sizes.map(function(num) {
        return (
          <option value={num} key={num}>
            {num}
          </option>
        );
      });
    }

    return (
      <div className="field-group">
        <label htmlFor="size-options">Size:</label>
        <select defaultValue={props.size} name="sizeOptions" id="size-options">
          {sizeOptions()}
        </select>
      </div>
    );
  }

  function ColorSelector(props) {
    function colorOptions() {
      return props.colors.map(function(name) {
        return (
          <option value={name} key={name}>
            {name}
          </option>
        );
      });
    }

    return (
      <div className="field-group">
        <label htmlFor="color-options">Color:</label>
        <select defaultValue={props.color} name="colorOptions" id="color-options">
          {colorOptions()}
        </select>
      </div>
    );
  }

  function ProductImage(props) {
    return <img src={`../../../assets/${props.color}.jpg`} alt="Product Image" />;
  }

  function ProductCustomizer(props) {
    var [size, setSize] = React.useState(8);
    var [sizes, setSizes] = React.useState(window.Inventory.allSizes);

    var [color, setColor] = React.useState("red");
    var [colors, setColors] = React.useState(window.Inventory.allColors);

    return (
      <div className="customizer">
        <div className="product-image">
          <ProductImage color={color} />
        </div>
        <div className="selectors">
          <SizeSelector size={size} sizes={sizes} />
          <ColorSelector color={color} colors={colors} />
        </div>
      </div>
    );
  }

  ReactDOM.render(<ProductCustomizer />, document.getElementById("react-root"));
})();
