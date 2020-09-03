(function () {
  "use strict";

  function ProductImage(props) {
    const { color, size } = props;
    return React.createElement(
      "fragment",
      {},
      `my size is ${size} and my color is ${color}`
    );
  }
  function ProductCustomizer(props) {
    return React.createElement(
      "div",
      { className: "customizer" },
      ProductImage({ color: "green", size: 10 })
    );
  }

  ReactDOM.render(
    React.createElement(ProductCustomizer),
    document.getElementById("react-root")
  );
})();
