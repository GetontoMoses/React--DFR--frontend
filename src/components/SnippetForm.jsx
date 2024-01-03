import { useState } from "react";

export default function SnippetForm() {
  const [values, setValues] = useState({
    title: "",
    code: "",
    linenos: false,
    language: "",
    style: "",
  });
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: name === "linenos" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/quickstart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setValues({
        title: "",
        code: "",
        linenos: false,
        language: "",
        style: "",
      });
      const responseData = await response.json();
      console.log("Data posted successfully:", responseData);
    } catch (error) {
      console.error("Error posting data:", error.message);
    }
  }
  return (
    <>
      <form method="POST">
        <label>
          Title :
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Code :
          <input
            type="text"
            name="code"
            value={values.code}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label htmlFor="linenos">Line numbers</label>
        <input type="checkbox" name="linenos" onChange={handleInputChange} />
        <br />

        <br />
        <label>
          Language :
          <input
            type="text"
            name="language"
            value={values.language}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Style :
          <input
            type="text"
            name="style"
            value={values.style}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <button type="submit" onClick={handleInputChange}>Submit</button>
      </form>
    </>
  );
}
