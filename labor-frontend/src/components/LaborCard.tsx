import React from "react";

interface LaborCardProps {
  name: string;
  skills: string[];
  location: string;
  rating: number;
}

const LaborCard: React.FC<LaborCardProps> = ({ name, skills, location, rating }) => {
  return (
    <div className="bg-white p-4 shadow rounded-md">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">Location: {location}</p>
      <p className="text-sm text-gray-600">Skills: {skills.join(", ")}</p>
      <p className="text-yellow-500">Rating: {rating}/5</p>
    </div>
  );
};

export default LaborCard;
