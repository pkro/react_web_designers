(function () {
  "use strict";

  function ProductImage(props) {
    const { color } = props;
    const src = `../../../assets/${color}.jpg`;
    return React.createElement("img", { src });
  }

  function ProductCustomizer(props) {
    return React.createElement(
      "div",
      { className: "customizer" },
      React.createElement(
        "fragment",
        { className: "product-image" },
        ProductImage({ color: "green", size: 10 })
      )
    );
  }

  ReactDOM.render(
    React.createElement(ProductCustomizer),
    document.getElementById("react-root")
  );
})();
