"use strict";

/* window.LMDirectory = {
  'people' : [
    {
      'id': 'lm001',
      'name': 'Tony Luis Salvador, MLA',
      'title_cat': 'architect',
      'intern': false,
      'title': 'Principal Landscape Architect',
      'bio' : 'Tony grew up engulfed by the business of landscape design, working most summers with his father, Roberto, at Leaf & Mortar, and with every passing year he knew more and more that he wanted to walk in his father’s footsteps. Roberto, however, was adamant that Tony attend college before settling upon a career. They compromised and Tony set out to study landscape architecture.  After graduating in the top of his class with both a BLA and MLA from University of Oregon, in Eugene, Tony was ready and excited to commit to the family business. Tony’s contributions have included bringing in various public beautification and sustainable design projects that continue to make Portland a progressive, eco-friendly city, and have put Leaf & Mortar on the map for “Small Local Companies with a Big Heart.',
      'img': '../../../business.wpdiy.net/wp/wp-content/uploads/2015/04/tony_salvador-300x300.jpg',
      'order': 0
    },

     titles: [
    {
      'display': 'Architect',
      'key' : 'architect'
    },
     */

(function () {
  function Directory(props) {
    const { people, titles } = window.LMDirectory;
    return (
      <div>
        <h1>COMPANY DIRECTORY</h1>
        <p>Learn more about blah</p>
        <FilterForm titles={titles} />
        <Employees />
      </div>
    );
  }

  function FilterForm({ titles }) {
    return (
      <div id="directory-filters">
        <div className="group">
          <label for="txt-name">Name:</label>
          <input
            type="text"
            name="name"
            value=""
            placeholder="Name of employee"
            id="txt-name"
          />
        </div>
        <div className="group">
          <label for="sel-title">Job Title:</label>
          <select name="sel-title" id="sel-title">
            <option value="">- Select -</option>
            {titles.map((title) => (
              <option value={title.key} key={title.key}>
                {title.display}
              </option>
            ))}
          </select>
        </div>
        <div className="group">
          <label>
            <input type="checkbox" value="1" /> Intern
          </label>
        </div>
      </div>
    );
  }
  function Employees(props) {
    return (
      <div>
        <Employee name="dummy1" />
        <Employee name="dummy2" />
      </div>
    );
  }
  function Employee(props) {
    return <h3>Employee {props.name}</h3>;
  }
  ReactDOM.render(<Directory />, document.getElementById("directory-root"));
})();
