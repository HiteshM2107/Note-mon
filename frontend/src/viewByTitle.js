// import React, { Component } from "react";
// import axios from "axios";
// class ViewByTitle extends Component {
//   constructor() {
//     super();
//     this.state = {
//       Notes: [],
//     };
//   }

//   handleButtonClick = (title) => {
//     const title = this.title;
//     axios
//       .get(`/api/view:${this.title}`)
//       .then((response) => {
//         this.setState({ Notes: response.data.NOTES });
//         console.log(this.state.Notes);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   render() {
//     return (
//       <div>
//         <input name="title"></input>
//         <button onClick={this.handleButtonClick(this.title)}>
//           View a note by Title
//         </button>

//         {this.state.Notes.map((obj, idx) => (
//           <div key={idx} className="notesWrapper">
//             <h4>{`${obj.title}`}</h4>
//             <h6>{`${obj.body}`}</h6>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

// export default ViewByTitle;
