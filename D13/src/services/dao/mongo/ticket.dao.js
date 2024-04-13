import { ticketModel } from "../../../models/ticket.model.js";

class TicketDAO {
  async createTicket(ticketData) {
    try {
      await ticketModel.create(ticketData);
    } catch (error) {
      throw error;
    }
  }

  async getAllTickets() {
    try {
      const tickets = await ticketModel.find();
      return tickets;
    } catch (error) {
      throw new Error('Error al obtener los tickets: ' + error.message);
    }
  }

  async getTicketById(ticketId) {
    try {
      return await ticketModel.findById(ticketId);
    } catch (error) {
      throw new Error('Error al obtener el ticket: ' + error.message);
    }
  }

}

export default TicketDAO;