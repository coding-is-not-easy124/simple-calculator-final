import React, { useState } from "react";
import './Calculator.css';

const Calculator = () => {
  const [semesterCount, setSemesterCount] = useState('');
  const [sgpa, setSgpa] = useState(Array(6).fill(''));
  const [cgpa, setCgpa] = useState(null);
  const [branch, setBranch] = useState('');

  const branchCredits = {
    "Computer Science and Engineering": [20.5, 20.5, 23, 20.5, 22.5, 20],
    "Information Technology": [20.5, 20.5, 23, 20.5, 22.5, 20],
    "Electrical Engineering": [20.5, 20.5, 23, 20.5, 22.5, 20],
    "Electronics and Instrumentation": [17.5, 20.5, 23, 20.5, 22.5, 20],
    "Mechanical Engineering": [20.5, 20.5, 23, 20.5, 22.5, 20],
    "Civil Engineering": [20.5, 20.5, 23, 20.5, 22.5, 20],
    "Textile Engineering": [20.5, 20.5, 23, 20.5, 22.5, 20],
    "Fashion And Apparel Technology": [20.5, 20.5, 23, 20.5, 22.5, 20],
    "Biotechnology": [20.5, 20.5, 23, 20.5, 22.5, 20],
  };

  const handleSgpaChange = (index, value) => {
    const newSgpa = [...sgpa];
    newSgpa[index] = value;
    setSgpa(newSgpa);
  };

  const handleSemesterCountChange = (e) => {
    const value = e.target.value;

    if (value === '' || (Number(value) >= 0 && Number(value) <= 6)) {
      setSemesterCount(value);

      const newSgpa = sgpa.slice(0, Number(value)).concat(Array(6 - Number(value)).fill(''));
      setSgpa(newSgpa);
    }
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleCalculateCgpa = () => {
    const credits = branchCredits[branch] || [];
    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < Number(semesterCount); i++) {
      totalCredits += credits[i];
      totalPoints += sgpa[i] * credits[i];
    }

    const calculatedCgpa = totalPoints / totalCredits;
    setCgpa(calculatedCgpa.toFixed(2));
  };

  return (
    <div className="calculator">
      <h1>CGPA Calculator</h1>

      <div className="input-section">
        <label>Select your branch: </label>
        <select value={branch} onChange={handleBranchChange}>
          <option value="" disabled>Select your branch</option>
          <option value="Computer Science and Engineering">Computer Science and Engineering</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Electronics and Instrumentation">Electronics and Instrumentation</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Textile Engineering">Textile Engineering</option>
          <option value="Fashion And Apparel Technology">Fashion And Apparel Technology</option>
          <option value="Biotechnology">Biotechnology</option>
        </select>
      </div>

      <div className="input-section align-left">
        <label>Enter the number of semesters completed: </label>
        <input
          type="text"
          value={semesterCount}
          onChange={handleSemesterCountChange}
          maxLength="1"
          placeholder="0-6"
        />
      </div>

      {[...Array(Number(semesterCount))].map((_, i) => (
        <div className="input-section" key={i}>
          <label>Enter SGPA for Semester {i + 1}: </label>
          <input
            type="number"
            step="0.01"
            value={sgpa[i] || ""}
            onChange={(e) => handleSgpaChange(i, parseFloat(e.target.value))}
            min="0"
            max="10"
          />
        </div>
      ))}

      <button className="calculate-btn" onClick={handleCalculateCgpa} disabled={!semesterCount || !branch}>
        Calculate CGPA
      </button>

      {cgpa !== null && (
        <div className="result">
          <h2>Your CGPA is: {cgpa}</h2>
          <h3>Branch: {branch}</h3>
        </div>
      )}
    </div>
  );
};

export default Calculator;
