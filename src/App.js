import React, { useState } from "react";
import "./styles.css";

var changeDict = {
  "2000": 0,
  "500": 0,
  "100": 0,
  "20": 0,
  "10": 0,
  "5": 0,
  "1": 0
};

export default function App() {
  // Hooks definition
  const [change, setChange] = useState(changeDict);
  const [message, setMessage] = useState("");

  const [bill, setBill] = useState(0);
  const [given, setGiven] = useState(0);

  function resetDictionary() {
    var notesAvailable = Object.keys(changeDict);
    for (var i = 0; i < notesAvailable.length; i++) {
      changeDict[notesAvailable[i]] = 0;
    }
    console.log("Dictionary reset");
    setChange(changeDict);
  }

  function calculateChange(bill, given) {
    resetDictionary();
    var billInt = Number(bill);
    var givenInt = Number(given);
    if (billInt <= 0 || givenInt <= 0) {
      setMessage("Entered values cannot be 0 or negative");
      return;
    }
    if (billInt > givenInt) {
      console.log("Bill: " + bill + " > Given: " + given);
      setMessage("Bill is higher than given amount");
      return;
    }
    var amount = givenInt - billInt;
    setMessage("Change to be given: " + amount);
    console.log(amount);
    var notesAvailable = Object.keys(changeDict);
    notesAvailable.sort(function (a, b) {
      return b - a;
    });
    var i = 0;
    while (amount !== 0) {
      var qt = Math.floor(amount / notesAvailable[i]);
      changeDict[notesAvailable[i]] = qt;
      amount = amount % notesAvailable[i];
      i++;
    }
    setChange(changeDict);
    console.log(changeDict);
  }

  return (
    <div className="App">
      <h1 style={{ fontSize: "3rem", margin: "1rem" }}>
        Cash Register Manager
      </h1>
      <span>
        Enter the Bill amount and Cash given by the customer and find out the
        precise number of notes to return
      </span>
      <h3> Bill Amount </h3>
      <input type="number" onChange={(e) => setBill(e.target.value)}></input>
      <h3> Cash Given </h3>
      <input type="number" onChange={(e) => setGiven(e.target.value)}></input>
      <button onClick={() => calculateChange(bill, given)}>Calculate</button>
      {console.log(bill, given)}
      <h3> {message} </h3>
      <table className="change-table">
        <caption> Return Change </caption>
        <tbody>
          <tr className="shaded">
            <th>Note Denomination</th>
            <td>2000</td>
            <td>500</td>
            <td>100</td>
            <td>20</td>
            <td>10</td>
            <td>5</td>
            <td>1</td>
          </tr>
          <tr>
            <th className="unshaded"> No of Notes </th>
            <td className="no-of-notes">{change["2000"]}</td>
            <td className="no-of-notes">{change["500"]}</td>
            <td className="no-of-notes">{change["100"]}</td>
            <td className="no-of-notes">{change["20"]}</td>
            <td className="no-of-notes">{change["10"]}</td>
            <td className="no-of-notes">{change["5"]}</td>
            <td className="no-of-notes">{change["1"]}</td>
          </tr>
        </tbody>
      </table>
      <footer>
        <p>
          <a style={{ color: "white" }} href="https://vikrant1.netlify.app">
            {" "}
            Vikrant | September 2021{" "}
          </a>{" "}
        </p>
      </footer>
    </div>
  );
}