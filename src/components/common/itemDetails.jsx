// import React, {Component} from "react";
// // import {withRouter} from "react-router";
// import Home from "../home";
// import {useLocation} from "react-router-dom";

// class ItemDetails extends Component {
//   // constructor(props) {
//   //   console.log("Hello");
//   //   console.log(props);
//   //   // const id = props.match.params.id;
//   //   // console.log(id);
//   //   // this.setState({data: this.mapToViewModel(id)});
//   //   super(props);
//   // }

//   state = {
//     data: {
//       title: "",
//       description: "",
//       count: "",
//       rating: "",
//       category: "",
//       price: "",
//       image: "",
//     },
//   };

//   mapToViewModel = (item) => {
//     return {
//       description: item.description,
//       title: item.title,
//       rating: item.rating,
//       count: item.count,
//       price: item.price,
//       image: item.image,
//       category: item.category,
//     };
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <h1>Item</h1>
//         <div>
//           <h1>Details</h1>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default ItemDetails;

import React, {Component, useState, useEffect} from "react";
// import {withRouter} from "react-router";
// import Home from "../home";
import {db, auth, logout, getInventory} from "../../firebase";
import {useLocation, useParams} from "react-router-dom";

function ItemDetails(props) {
  const [inventory, setInventory] = useState([]);
  const [itemDisplay, setItemDisplay] = useState([]);
  const fetchInventory = async () => {
    try {
      const promise = getInventory(db);
      const response = await promise;
      setInventory(response);
    } catch(err) {
      console.error(err);
      alert("An error occured while fetching inventory data");
    }
  };

  const {id} = useParams();
  console.log(id);
  const getItem = (id) => {
    return inventory.find((item) => item.id === id);
  };
  // const item = getItem(id);
  useEffect(() => {
    fetchInventory();
    const timer = setTimeout(() => {
      const item = getItem(id);
      console.log(item);
      setItemDisplay(mapToViewModel(item));
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const mapToViewModel = (item) => {
    return {
      description: item.description,
      title: item.title,
      rating: item.rating,
      count: item.count,
      price: item.price,
      image: item.image,
      category: item.category,
    };
  };

  return (
    <React.Fragment>
      <h1>Item</h1>
      <div>
        <h1>Details</h1>
        <h1>hb: {itemDisplay.description}</h1>
      </div>
    </React.Fragment>
  );
}
export default ItemDetails;
