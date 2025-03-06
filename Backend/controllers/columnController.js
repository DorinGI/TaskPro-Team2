import Column from "../models/Column.js";

// Creare coloană
export const createColumn = async (req, res) => {
  const { title, boardId } = req.body;
  try {
    const newColumn = new Column({ title, boardId });
    await newColumn.save();
    res.status(201).json(newColumn);
  } catch (error) {
    res.status(500).json({ message: "Error creating column", error });
  }
};

// Editare coloană
export const updateColumn = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const updatedColumn = await Column.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    res.status(200).json(updatedColumn);
  } catch (error) {
    res.status(500).json({ message: "Error updating column", error });
  }
};

// Ștergere coloană
export const deleteColumn = async (req, res) => {
  const { id } = req.params;
  try {
    await Column.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting column", error });
  }
};
