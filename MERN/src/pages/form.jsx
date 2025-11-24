import React from 'react'

function Form() {

  return (
    <div className='flex flex-col gap-1'>

    <form>
      <h1>User Name</h1>
    <input type="text" placeholder='Enter your name'
    />


    </form>

    </div>
  )
}

export default Form



// import React, { useState } from 'react';

// function Form() {
//   // 1. Initialize State for the input value
//   const [userName, setUserName] = useState('');

//   // Function to update the state as the user types
//   const handleChange = (e) => {
//     // e.target.value is the current text in the input field
//     setUserName(e.target.value);
//   };

//   // 2. Function to handle the form submission
//   const handleSubmit = (e) => {
//     // This is crucial: it prevents the browser from doing a full page reload,
//     // which is the default behavior for HTML form submission.
//     e.preventDefault(); 

//     // --- Submission Logic ---
//     if (userName.trim() === '') {
//         alert('Please enter your name before submitting.');
//         return;
//     }

//     console.log('Form Submitted!');
//     console.log('User Name:', userName);

//     // *Example: Here is where you would typically send data to a backend API*
//     // For example: 
//     // fetch('/api/users', { method: 'POST', body: JSON.stringify({ name: userName }) });

//     // Clear the input field after successful submission
//     setUserName('');
//   };
  
//   // 

//   return (
//     <div className='flex flex-col gap-1'>

//       {/* Attach the handleSubmit function to the form's onSubmit event */}
//       <form onSubmit={handleSubmit}>
        
//         <h1>User Name</h1>
        
//         {/* Input Field: Must be a controlled component */}
//         <input 
//           type="text" 
//           placeholder='Enter your name'
//           // A controlled input must have its value bound to state (userName)
//           value={userName} 
//           // And must update the state via a change handler (handleChange)
//           onChange={handleChange}
//         />

//         {/* Button with type="submit" triggers the form's onSubmit event */}
//         <button type="submit">
//           Submit Name
//         </button>

//       </form>

//     </div>
//   );
// }

// export default Form;