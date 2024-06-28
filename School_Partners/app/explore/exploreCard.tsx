import React from 'react';
import { motion } from 'framer-motion';

interface PartnershipCardProps {
  partnership: {
    title: string;
    description: string;
    email: string;
    phoneNumber: string;
    locationValue: string;
    typeOfOrganization: string;
    similarity?: string;
  };
}

const PartnershipCard: React.FC<PartnershipCardProps> = ({ partnership }) => {
  const {
    title,
    description,
    email,
    phoneNumber,
    locationValue,
    typeOfOrganization,
  } = partnership;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="transform transition-transform bg-white border rounded-lg p-6 mb-6 shadow-md hover:shadow-lg"
    >
      <h2 className="text-xl font-bold mb-2">{`Name: ${title}`}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="text-sm text-gray-600 mb-2">
        <strong>Type of Organization:</strong> {typeOfOrganization}
      </div>
      <div className="text-sm text-gray-600 mb-2">
        <strong>Email:</strong> {email}
      </div>
      <div className="text-sm text-gray-600 mb-2">
        <strong>Contact Info:</strong> {phoneNumber}
      </div>
      <div className="text-sm text-gray-600">
        {locationValue}
      </div>
    </motion.div>
  );
};

export default PartnershipCard;