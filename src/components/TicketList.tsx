import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TicketItem from './TicketItem';
import Tabs from './Tabs';
import { RootState } from '../store/store';
import { addMoreTickets, setSortTickets, TicketType } from '../store/ticketsSlice';
import { DEFAULT_MESSAGES } from '../messages/messages';
import './../styles/TicketList.scss';

interface TicketListProps {
  tickets: TicketType[];
}

const TicketList: React.FC<TicketListProps> = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state: RootState) => state.tickets.displayedTickets);
  const allTickets = useSelector((state: RootState) => state.tickets.tickets);
  const loading = useSelector((state: RootState) => state.tickets.status === 'loading');
  const error = useSelector((state: RootState) => state.tickets.error);
  const [activeTab, setActiveTab] = useState(DEFAULT_MESSAGES.CHEAPEST);

  const handleLoadMore = () => {
    dispatch(addMoreTickets());
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    dispatch(setSortTickets(activeTab));
  }, [activeTab, dispatch]);

  if (loading) {
    return <div>{DEFAULT_MESSAGES.LOADING}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!tickets.length) {
    return <div className="no-tickets">{DEFAULT_MESSAGES.NO_TICKETS_FOUND}</div>;
  }

  const hasMoreTickets = tickets.length < allTickets.length;

  return (
    <div className="ticket-list">
      <Tabs
        activeTab={activeTab}
        tabs={[DEFAULT_MESSAGES.CHEAPEST, DEFAULT_MESSAGES.FASTEST, DEFAULT_MESSAGES.OPTIMAL]}
        onTabClick={handleTabClick}
      />
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
      {hasMoreTickets && (
        <button onClick={handleLoadMore} className="ticket-list__load-more">
          {DEFAULT_MESSAGES.LOAD_FIVE_MORE_TICKETS}
        </button>
      )}
    </div>
  );
};

export default TicketList;
