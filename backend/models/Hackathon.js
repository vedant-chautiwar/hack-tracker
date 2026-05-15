import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    organizer: {
      type: String,
      required: [true, "Organizer is required"],
      trim: true
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true
    },
    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      default: "online"
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"]
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"]
    },
    status: {
      type: String,
      enum: ["upcoming", "attended", "cancelled"],
      default: "upcoming"
    },
    teamName: {
      type: String,
      trim: true,
      default: ""
    },
    projectName: {
      type: String,
      trim: true,
      default: ""
    },
    projectDescription: {
      type: String,
      trim: true,
      default: ""
    },
    result: {
      type: String,
      enum: ["participated", "finalist", "winner", "not submitted"],
      default: "not submitted"
    },
    techStack: {
      type: String,
      trim: true,
      default: ""
    },
    notes: {
      type: String,
      trim: true,
      default: ""
    },
    registrationLink: {
      type: String,
      trim: true,
      default: ""
    }
  },
  { timestamps: true }
);

hackathonSchema.index({ user: 1, startDate: 1 });
hackathonSchema.index({ title: "text", organizer: "text" });

const Hackathon = mongoose.model("Hackathon", hackathonSchema);

export default Hackathon;
