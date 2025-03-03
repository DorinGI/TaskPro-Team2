import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/decorators.js";
import Card from "../models/card.js";

async function getCardById(req, res) {
  const { cardId } = req.params;
  const result = await Card.findById(cardId);
  if (!result) throw HttpError(404);
  res.json(result);
}

async function addNewCard(req, res) {
  const { columnId } = req.params;
  const result = await Card.create({ ...req.body, owner: columnId });
  res.status(201).json(result);
}

async function removeCardById(req, res) {
  const { cardId } = req.params;
  const result = await Card.findByIdAndRemove(cardId);
  if (!result) throw HttpError(404);
  res.json(result);
}

async function updateCardById(req, res) {
  const { cardId } = req.params;
  const result = await Card.findByIdAndUpdate(cardId, req.body, { new: true });
  if (!result) throw HttpError(404);
  res.json(result);
}

async function changeCardOwner(req, res) {
  const { cardId, columnId } = req.params;
  const result = await Card.findByIdAndUpdate(
    cardId,
    { owner: columnId },
    { new: true }
  );
  if (!result) throw HttpError(404);
  res.json(result);
}

export const getById = controllerWrapper(getCardById);
export const addNew = controllerWrapper(addNewCard);
export const removeById = controllerWrapper(removeCardById);
export const updateById = controllerWrapper(updateCardById);
export const setNewCardOwner = controllerWrapper(changeCardOwner);
