import React from "react";

export default function Form({handleSubmit,textValue,handleTextChange}){
  return (
    <form className='form-container' onSubmit={handleSubmit}>
    <textarea
      value={textValue}
      onChange={handleTextChange}
      className='search-input'
      placeholder='Type something here...'
      spellCheck='false'
      rows={4} // You can set a specific number of rows for better UX
    />
    <button className='submit-button' type='submit'>
      Submit
    </button>
  </form>
  )
}