import { ticketService } from "../services/repository/services.js";

// Crear un nuevo ticket
export const createTicket = async (req, res) => {
  // console.log("Creando ticket");
  const newTicket = { amount: req.amount, purchaser: req.purchaser };
  try {
    const ticket = await ticketService.createTicket(newTicket);
    res.json(ticket);
  } catch (error) {
    console.error("Error al crear el ticket:", error);
    // res.status(500).json({ success: false, error: "Error al crear el ticket" });
  }
};