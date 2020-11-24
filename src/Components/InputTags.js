import React, { Component } from "react";
import { BACKSPACE, DUPLICATEVALUE, ENTER } from "../Constants";
import { SUGGETIONBACKGROUNDCOLOR } from "../utils/color";
import "./InputTags.css";
class InputTag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Tags: [],
      suggestedData: [],
      ifSuggestionBox: false,
      inputedText: "",
    };
    this.inputRef = React.createRef();
  }

  addTag = (e, event) => {
    const { Tags } = this.state;
    const value = e.length > 0 ? e : e.target.value;
    if ((e.key === ENTER && value) || (value && event === true)) {
      if (Tags.find((Tag) => Tag.toLowerCase() === value.toLowerCase())) {
        return alert(DUPLICATEVALUE);
      }
      Tags.push(value);
      this.setState({
        Tags,
        ifSuggestionBox: false,
      });
      this.inputRef.current.value = null;
    } else if (e.key === BACKSPACE && !value) {
      this.removeTag(Tags.length - 1);
    }
  };

  removeTag = (i) => {
    const Tags = this.state.Tags;
    Tags.splice(i, 1);
    this.setState({
      Tags: Tags,
    });
  };

  showSuggetsionBox = (value) => {
    console.log(value.target.value);
    const inputText = value.target.value;
    console.log(this.props.suggestion);
    const arr = this.props.suggestion;
    const val = value.target.value;
    const test = this.props.suggestion.filter((data) => {
      return data.substr(0, val.length).toUpperCase() === val.toUpperCase()
        ? data
        : null;
    });
    console.log("test", test);
    this.setState({
      ifSuggestionBox: inputText.length > 0 ? true : false,
      suggestedData: test,
      inputedText: inputText,
    });
  };

  render() {
    const { Tags } = this.state;
    return (
      <>
        <h2> Add Your Tag </h2>
        <div className="Tag">
          <ul>
            {Tags.map((Tag, i) => {
              return (
                <li key={i}>
                  {" "}
                  {Tag} <button onClick={() => this.removeTag(i)}>+</button>{" "}
                </li>
              );
            })}
            <li className="input-Tag">
              <div className="autocomplete">
                <input
                  id="myInput"
                  name="myCountry"
                  onKeyDown={this.addTag}
                  type="text"
                  size="4"
                  ref={this.inputRef}
                  onChange={this.showSuggetsionBox}
                />
              </div>
            </li>
          </ul>
          <div
            style={{
              position: "absolute",
              width: "100%",
              display: this.state.ifSuggestionBox ? "block" : "none",
              backgroundColor: SUGGETIONBACKGROUNDCOLOR,
            }}
          >
            {this.state.suggestedData.map((data) => {
              return (
                <table>
                  <td>
                    <tr onClick={() => this.addTag(data, true)}>{data}</tr>
                  </td>
                </table>
              );
            })}{" "}
            {this.state.suggestedData.length == 0
              ? this.state.inputedText
              : null}
          </div>
        </div>
      </>
    );
  }
}

export default InputTag;
