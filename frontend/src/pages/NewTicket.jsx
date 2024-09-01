import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import { BackButton } from "../components/BackButton";

const products = [
  "Samsung",
  "Xiaomi",
  "Redmi",
  "Apple",
  "Oppo",
  "Vivo",
  "Realme",
];

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const { isError, isSuccess, message } = useSelector((state) => state.ticket);
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState(products[0]);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message || "An error occurred");
    }
    if (isSuccess) {
      dispatch(reset());
      toast.success(message || "Ticket created successfully");
      navigate("/tickets");
    }

    dispatch(reset());
  }, [isSuccess, isError, message, dispatch, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    const ticketData = {
      name,
      email,
      product,
      description,
    };
    dispatch(createTicket(ticketData));
  };
  return (
    <>
      <BackButton url="/tickets" />
      <section className="heading">
        <h1>Create new ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            id="name"
            value={name}
            disabled
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Customer Email</label>
          <input
            type="text"
            id="name"
            value={email}
            disabled
            className="form-control"
          />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              {products.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
