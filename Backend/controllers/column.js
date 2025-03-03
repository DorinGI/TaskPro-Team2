import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/decorators.js";
import Card from "../models/card.js";
import Column from "../models/column.js";

async function getColumnById(req, res) {
  const { columnId } = req.params;
  const column = await Column.findById(columnId);
  if (!column) throw HttpError(404);
  const cards = await Card.find({ owner: column._id });
  if (!cards) throw HttpError(404);
  res.json({ column, cards });
}

async function addNewColumn(req, res) {
  const { dashboardId } = req.params;
  const result = await Column.create({ ...req.body, owner: dashboardId });
  res.status(201).json(result);
}

async function removeColumnById(req, res) {
  const { columnId } = req.params;
  const result = await Column.findByIdAndRemove(columnId);
  if (!result) throw HttpError(404);
  res.json(result);
}

async function updateColumnById(req, res) {
  const { columnId } = req.params;
  const result = await Column.findByIdAndUpdate(columnId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404);
  res.json(result);
}

export const getById = controllerWrapper(getColumnById);
export const addNew = controllerWrapper(addNewColumn);
export const removeById = controllerWrapper(removeColumnById);
export const updateById = controllerWrapper(updateColumnById);
