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
  class Directory extends React.Component {
    constructor(props) {
      super(props);
      this.defaultState = window.LMDirectory;
      this.people = window.LMDirectory.people;
      this.titles = window.LMDirectory.titles;
      this.handleChange = this.handleChange.bind(this);
      this.updatePeople = this.updatePeople.bind(this);
      this.state = {
        people: this.people,
        formVals: {
          person_name: "",
          person_title: "",
          person_intern: false,
        },
      };
    }

    handleChange(e) {
      const { name, value } = e.target;
      const newVal =
        typeof this.state.formVals[name] === "boolean"
          ? !this.state.formVals[name]
          : value;
      this.setState(
        (prevState) => ({
          formVals: {
            ...prevState.formVals,
            [name]: newVal,
          },
        }),
        this.updatePeople
      );
    }

    updatePeople() {
      const peopleFilter = function (prevState) {
        const {
          person_name: name,
          person_title: title,
          person_intern: intern,
        } = prevState.formVals;

        return function (person) {
          return (
            (name.toLowerCase()
              ? person.name.toLowerCase().indexOf(name) !== -1
              : true) &&
            (title ? person.title_cat === title : true) &&
            (intern ? person.intern === intern : true)
          );
        };
      };

      this.setState((prevState) => ({
        ...prevState,
        people: this.people.filter(peopleFilter(prevState)),
      }));
    }

    render() {
      const { person_name, person_title, person_intern } = this.state.formVals;
      return (
        <div className="company-directory">
          <h1>COMPANY DIRECTORY</h1>
          <p>Learn more about blah</p>
          <Filters
            titles={this.titles}
            person_name={person_name}
            person_title={person_title}
            person_intern={person_intern}
            handleChange={this.handleChange}
          />
          <People people={this.state.people} />
        </div>
      );
    }
  }

  function Filters({ titles, person_name, person_title, person_intern, handleChange }) {
    return (
      <div id="directory-filters">
        <div className="group">
          <label htmlFor="person-name">Name:</label>
          <input
            type="text"
            name="person_name"
            value={person_name}
            placeholder="Name of employee"
            onChange={handleChange}
          />
        </div>
        <label htmlFor="person-title">Job Title:</label>

        <select
          name="person_title"
          id="person-title"
          value={person_title}
          onChange={handleChange}>
          <option value="">- Select -</option>
          {titles.map((title) => (
            <option value={title.key} key={title.key}>
              {title.display}
            </option>
          ))}
        </select>

        <div className="group">
          <label>
            <input
              type="checkbox"
              value="1"
              name="person_intern"
              checked={person_intern}
              onChange={handleChange}
            />{" "}
            Intern
          </label>
        </div>
      </div>
    );
  }
  function People({ people }) {
    return (
      <div>
        {people.map((emp) => {
          return <Person {...emp} key={emp.id} />;
        })}
      </div>
    );
  }

  function Person({ name, title, bio, img }) {
    return (
      <div>
        <h3>
          {name}, {title}
        </h3>

        <p>
          <img
            className=" size-medium wp-image-14 alignright"
            src={img}
            alt={name}
            width="300"
            height="300"
            sizes="(max-width: 300px) 100vw, 300px"
          />
          {bio}
        </p>
      </div>
    );
  }

  ReactDOM.render(<Directory />, document.getElementById("directory-root"));
})();
