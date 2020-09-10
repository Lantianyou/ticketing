import { useState } from "react";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const onBlur = () => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
		}
		
		setPrice(value.toFixed())
  };

  return (
    <div>
      <h1>new</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Price</label>
          <input
            className="form-control"
            onBlur={onBlur}
            value={price}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary"></button>
      </form>
    </div>
  );
};

export default NewTicket;
