import React from 'react';
import { TicketType } from '../store/ticketsSlice';
import airlineLogo from './../assets/images/a4eLogo.png';
import { DEFAULT_MESSAGES } from '../messages/messages';
import './../styles/TicketItem.scss';

interface TicketItemProps {
  ticket: TicketType;
}

const formatTime = (time: string) => {
  const date = new Date(time);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const calculateFlightDuration = (departureTime: string, arrivalTime: string): string => {
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);
  const diffMs = arrival.getTime() - departure.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours} г ${minutes === 0 ? '00' : minutes} хв`;
};

const calculateTransfers = (transfers: number): string => {
  if (transfers === 0) {
    return DEFAULT_MESSAGES.WITHOUT_TRANSFERS;
  }
  return `${transfers} ${transfers > 1 ? DEFAULT_MESSAGES.TRANSFER : DEFAULT_MESSAGES.TRANSFERS}`;
};

const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
  return (
    <div className="ticket">
      <div className="ticket__price">{ticket.price}$</div>
      <div className="ticket__logo">
        <img src={airlineLogo} alt="Airline Logo" className="logo" />
      </div>
      <div className="ticket__route">
        <div className="ticket__route-label">
          {ticket.origin} - {ticket.destination}
        </div>
        <div className="ticket__route-value">
          {formatTime(ticket.departureTime)} - {formatTime(ticket.arrivalTime)}
        </div>
      </div>
      <div className="ticket__duration">
        <div className="ticket__duration-label">{DEFAULT_MESSAGES.IN_THE_WAY}</div>
        <div className="ticket__duration-value">
          {calculateFlightDuration(ticket.departureTime, ticket.arrivalTime)}
        </div>
      </div>
      <div className="ticket__transfers">
        <div className="ticket__transfers-label">{calculateTransfers(ticket.transfers)}</div>
        <div className="ticket__transfers-value">{ticket.transferCity}</div>
      </div>
      <div className="ticket__return-route">
        <div className="ticket__return-route-label">
          {ticket.destination} - {ticket.origin}
        </div>
        <div className="ticket__return-route-value">
          {formatTime(ticket.returnDepartureTime)} - {formatTime(ticket.returnArrivalTime)}
        </div>
      </div>
      <div className="ticket__return-duration">
        <div className="ticket__return-duration-label">{DEFAULT_MESSAGES.IN_THE_WAY}</div>
        <div className="ticket__return-duration-value">
          {calculateFlightDuration(ticket.returnDepartureTime, ticket.returnArrivalTime)}
        </div>
      </div>
      <div className="ticket__return-transfers">
        <div className="ticket__return-transfers-label">{calculateTransfers(ticket.transfers)}</div>
        <div className="ticket__return-transfers-value">{ticket.transferCity}</div>
      </div>
    </div>
  );
};

export default TicketItem;
