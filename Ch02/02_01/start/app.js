(function () {
  "use strict";

  // Start here

  function ProductCustomizer(props) {
    return React.createElement("h1", { className: "customizer" }, "yay");
  }

  ReactDOM.render(
    React.createElement(ProductCustomizer),
    document.getElementById("react-root")
  );
})();
