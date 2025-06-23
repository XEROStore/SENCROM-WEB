import axios from 'axios';
import config from './config.js';

const { API_KEY, TOKEN, BOARD_ID } = config.TRELLO_CONFIG;
const AUTH_PARAMS = `key=${API_KEY}&token=${TOKEN}`;

/**
 * Encuentra una tarjeta en el tablero de Trello basándose en el ID del ticket.
 * Asume que el nombre de la tarjeta contiene el ID del ticket (ej: "20240523-001 - Problema X").
 * @param {string} ticketId - El ID del ticket a buscar.
 * @returns {object|null} El objeto de la tarjeta de Trello o null si no se encuentra.
 */
async function findCardByTicketId(ticketId) {
  try {
    const url = `https://api.trello.com/1/boards/${BOARD_ID}/cards?${AUTH_PARAMS}`;
    const response = await axios.get(url);
    // Buscamos la tarjeta cuyo nombre INCLUYA el ID del ticket.
    const card = response.data.find(c => c.name.includes(ticketId));
    return card || null;
  } catch (error) {
    console.error('Error al buscar la tarjeta en Trello:', error.response?.data || error.message);
    return null;
  }
}

/**
 * Mueve una tarjeta a una lista de Trello diferente.
 * @param {string} cardId - El ID de la tarjeta a mover.
 * @param {string} targetListId - El ID de la lista de destino.
 * @returns {boolean} True si la operación fue exitosa, false en caso contrario.
 */
async function moveCard(cardId, targetListId) {
  try {
    const url = `https://api.trello.com/1/cards/${cardId}?idList=${targetListId}&${AUTH_PARAMS}`;
    await axios.put(url);
    return true;
  } catch (error) {
    console.error('Error al mover la tarjeta en Trello:', error.response?.data || error.message);
    return false;
  }
}

/**
 * Añade un comentario a una tarjeta de Trello.
 * @param {string} cardId - El ID de la tarjeta donde se añadirá el comentario.
 * @param {string} text - El contenido del comentario.
 * @returns {boolean} True si la operación fue exitosa, false en caso contrario.
 */
async function addComment(cardId, text) {
  try {
    const url = `https://api.trello.com/1/cards/${cardId}/actions/comments?text=${encodeURIComponent(text)}&${AUTH_PARAMS}`;
    await axios.post(url);
    return true;
  } catch (error) {
    console.error('Error al añadir comentario en Trello:', error.response?.data || error.message);
    return false;
  }
}

export { findCardByTicketId, moveCard, addComment }; 