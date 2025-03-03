import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/decorators.js";
import Dashboard from "../models/dashboard.js";
import Column from "../models/column.js";
import Card from "../models/card.js";

async function getAllDashboards(req, res) {
  const { _id: owner } = req.user;
  const result = await Dashboard.find({ owner }, "-createdAt -updatedAt");
  res.json(result);
}

async function getDashboardById(req, res) {
  const { dashboardId } = req.params;
  const dashboard = await Dashboard.findById(dashboardId);
  const columns = await Column.find({ owner: dashboard._id });

  if (columns.length > 0) {
    const columnsWithOwnCards = await Column.aggregate([
      { $match: { $or: columns } },
      {
        $lookup: {
          from: "cards",
          localField: "_id",
          foreignField: "owner",
          as: "cards",
        },
      },
    ]);
    if (!dashboard) throw HttpError(404);

    return res.json({ dashboard, columns: columnsWithOwnCards });
  }

  res.json({ dashboard, columns: [] });
}

async function addNewDashboard(req, res) {
  const { _id: owner } = req.user;
  const result = await Dashboard.create({ ...req.body, owner });
  res.status(201).json(result);
}

async function removeDashboardById(req, res) {
  const { dashboardId } = req.params;
  const deletedBoard = await Dashboard.findByIdAndRemove(dashboardId);
  const columns = await Column.find({ owner: dashboardId });
  const deletedColumn = await Column.deleteMany({ owner: dashboardId });
  const ArrayColumnsIds = columns.map((column) => column._id);
  const deletedCard = await Card.deleteMany({ owner: ArrayColumnsIds });

  if (!deletedBoard || !deletedColumn || !deletedCard || !columns)
    throw HttpError(404);

  res.json({ deletedBoard, deletedColumn, deletedCard });
}

async function updateDashboardById(req, res) {
  const { dashboardId } = req.params;
  const result = await Dashboard.findByIdAndUpdate(dashboardId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404);
  res.json(result);
}

async function updateCurrentDashboardById(req, res) {
  const { dashboardId } = req.params;
  const result = await Dashboard.findByIdAndUpdate(
    dashboardId,
    { ...req.body },
    { new: true }
  );
  if (!result) throw HttpError(404);
  res.json(result);
}

export const getAll = controllerWrapper(getAllDashboards);
export const getById = controllerWrapper(getDashboardById);
export const addNew = controllerWrapper(addNewDashboard);
export const removeById = controllerWrapper(removeDashboardById);
export const updateById = controllerWrapper(updateDashboardById);
export const updateCurrentDashboard = controllerWrapper(
  updateCurrentDashboardById
);
