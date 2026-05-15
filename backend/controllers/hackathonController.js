import Hackathon from "../models/Hackathon.js";

const buildQuery = (req) => {
  const query = { user: req.user._id };
  const { search, status, mode } = req.query;

  if (status && status !== "all") query.status = status;
  if (mode && mode !== "all") query.mode = mode;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { organizer: { $regex: search, $options: "i" } }
    ];
  }

  return query;
};

export const getHackathons = async (req, res) => {
  try {
    const sortOrder = req.query.sort === "desc" ? -1 : 1;
    const hackathons = await Hackathon.find(buildQuery(req)).sort({ startDate: sortOrder });
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ message: error.message || "Could not fetch hackathons" });
  }
};

export const getHackathonById = async (req, res) => {
  try {
    const hackathon = await Hackathon.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    res.json(hackathon);
  } catch (error) {
    res.status(500).json({ message: error.message || "Could not fetch hackathon" });
  }
};

export const createHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.create({
      ...req.body,
      user: req.user._id
    });

    res.status(201).json(hackathon);
  } catch (error) {
    res.status(400).json({ message: error.message || "Could not create hackathon" });
  }
};

export const updateHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    res.json(hackathon);
  } catch (error) {
    res.status(400).json({ message: error.message || "Could not update hackathon" });
  }
};

export const deleteHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    res.json({ message: "Hackathon deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Could not delete hackathon" });
  }
};
