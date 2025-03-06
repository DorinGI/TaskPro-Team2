import Card from "../models/Card.js";

// Creare card
export const createCard = async (req, res) => {
  const { title, description, priority, deadline, columnId } = req.body;
  try {
    const newCard = new Card({
      title,
      description,
      priority,
      deadline,
      columnId,
    });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: "Error creating card", error });
  }
};

// Editare card
export const updateCard = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, deadline } = req.body;
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { title, description, priority, deadline },
      { new: true }
    );
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: "Error updating card", error });
  }
};

// Ștergere card
export const deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    await Card.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting card", error });
  }
};
