import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export const TicketItem = ({ ticket }) => {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString("en-US")}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/tickets/${ticket._id}`} className="btn btn-reverse btn-small">
        View
      </Link>
    </div>
  );
};
