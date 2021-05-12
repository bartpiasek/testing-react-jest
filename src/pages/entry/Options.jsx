import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOption from "./ScoopOption";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  //   const [orderDetails, updateItemCount] = useOrderDetails();

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => setError(true));
  }, [optionType]);

  if (error) {
    // @ts-ignore
    return null;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : null;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      //   updateItemCount={(itemName, newItemCount) =>
      //     updateItemCount(itemName, newItemCount, optionType)
      // }
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      {/* <p>{pricePerItem[optionType]} each</p> */}
      <p>{/* {title} total: {orderDetails.totals[optionType]} */}</p>
      <Row>{optionItems}</Row>
    </>
  );
}
