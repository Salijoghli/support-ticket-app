import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import { Spinner } from "../components/Spinner";
import { BackButton } from "../components/BackButton";
import { toast } from "react-toastify";
const Ticket = () => {
  const { ticket, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message || "An error occurred");
    }
    dispatch(getTicket(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess, message, id]);

  const onCloseTicket = () => {
    dispatch(closeTicket(id));
    toast.success("Ticket closed successfully");
    navigate("/tickets");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{message}</div>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID : {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted : {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {ticket.status !== "closed" && (
        <button className="btn btn-block" onClick={onCloseTicket}>
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
