import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from './store/ticketsSlice';
import { AppDispatch, RootState } from './store/store';
import Header from './components/Header';
import Filter from './components/Filter';
import TicketList from './components/TicketList';
import { DEFAULT_MESSAGES } from './messages/messages';
import './styles/App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tickets, status, error } = useSelector((state: RootState) => state.tickets);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>{DEFAULT_MESSAGES.LOADING}</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <Filter />
        <TicketList tickets={tickets} />
      </main>
    </div>
  );
};

export default App;
