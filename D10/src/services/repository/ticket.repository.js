export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTicket = (ticket) => {
    return this.dao.createTicket(ticket);
  }

  getAllTickets = () => {
    return this.dao.getAllTickets();
  }

  getTicketById = (id) => {
    return this.dao.getTicketById(id);
  }

}