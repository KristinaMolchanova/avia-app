import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import config from './../../.env.config';

export interface TicketType {
  id: number;
  price: number;
  transfers: number;
  transferCity?: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  returnDepartureTime: string;
  returnArrivalTime: string;
}

interface TicketsState {
  tickets: TicketType[];
  displayedTickets: TicketType[];
  filters: number[];
  sortOption: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TicketsState = {
  tickets: [],
  displayedTickets: [],
  filters: [],
  sortOption: 'Найдешевший',
  status: 'idle',
  error: null
};

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async () => {
  const response = await fetch(
    `${process.env.NODE_ENV === 'development' ? '/tickets.json' : process.env.PUBLIC_URL}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
});

const calculateDuration = (departureTime: string, arrivalTime: string): number => {
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);
  return arrival.getTime() - departure.getTime();
};

const sortTickets = (tickets: TicketType[], sortOption: string) => {
  switch (sortOption) {
    case 'Найдешевший':
      return [...tickets].sort((a, b) => a.price - b.price);
    case 'Найшвидший':
      return [...tickets].sort((a, b) => {
        const durationA = calculateDuration(a.departureTime, a.arrivalTime);
        const durationB = calculateDuration(b.departureTime, b.arrivalTime);
        return durationA - durationB;
      });
    case 'Оптимальний':
      return [...tickets].sort((a, b) => {
        const durationA = calculateDuration(a.departureTime, a.arrivalTime);
        const durationB = calculateDuration(b.departureTime, b.arrivalTime);
        if (durationA !== durationB) {
          return durationA - durationB;
        }
        if (a.transfers !== b.transfers) {
          return a.transfers - b.transfers;
        }
        return a.price - b.price;
      });
    default:
      return tickets;
  }
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addMoreTickets(state) {
      const remainingTickets = state.tickets.slice(
        state.displayedTickets.length,
        state.displayedTickets.length + 5
      );
      state.displayedTickets = [...state.displayedTickets, ...remainingTickets];
    },
    setFilters: (state, action: PayloadAction<number[]>) => {
      state.filters = action.payload;
      if (action.payload.length === 0) {
        state.displayedTickets = state.tickets.slice(0, 5);
      } else {
        state.displayedTickets = state.tickets
          .filter((ticket) => action.payload.includes(ticket.transfers))
          .slice(0, 5);
      }
    },
    setSortTickets: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
      const filteredTickets = state.tickets.filter(
        (ticket) => state.filters.length === 0 || state.filters.includes(ticket.transfers)
      );
      state.displayedTickets = sortTickets(filteredTickets, action.payload).slice(0, 5);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<TicketType[]>) => {
        state.status = 'succeeded';
        state.tickets = action.payload;
        state.displayedTickets = action.payload.slice(0, 5);
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tickets';
      });
  }
});

export const { addMoreTickets, setFilters, setSortTickets } = ticketsSlice.actions;

export default ticketsSlice.reducer;
