import express from "express";
import fs from "fs";
import path from "path";

// Function to read property data from JSON file
const getProperties = () => {
  const dataPath = path.join(__dirname, "../../db/data.json");
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

// Controller to handle property listing and recommendations
export const Propertylisting = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { price, area } = req.body;

    // Validate the input
    if (typeof price !== "number" || typeof area !== "number") {
      return res.status(400).json({ msg: "Price and area must be numbers." });
    }

    // Fetch the properties from the file
    const properties = getProperties();

    // Simple recommendation logic: filter properties by price and area
    const recommendedProperties = properties.filter((property) => {
      return property.price <= price && property.area >= area;
    });

    // Return recommended properties
    res.json(recommendedProperties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Additional controller to fetch all properties (optional)
export const getAllProperties = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const properties = getProperties();
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
