// Displays bars in list format when user is doing a search
import React from "react";

function ListBars({ bars }) {
  return (
    <ul>
      {bars && bars.length > 0 ? (
        bars.map((bars) => {
          return <li key={bars.place_id}>
				<h4>{bars.name}, rating: {bars.rating}, price level: {bars.price_leve}</h4>
		 </li>;
        })
      ) : (
        <li>No bars in area</li>
      )}
    </ul>
  );
}

export default React.memo(ListBars);
