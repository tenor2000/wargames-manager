import { Box, TextField } from '@mui/material';
import { useAppContext } from '../contexts/AppContext';
import React, { useState } from 'react';

export const CreateNewCampaign = () => {
  const [campaignName, setCampaignName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCampaign = {
      name: campaignName,
      description,
      startDate,
      endDate
    };

    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCampaign)
      });

      if (!response.ok) {
        throw new Error('Failed to create campaign');
      }

      const data = await response.json();
      setSuccess('Campaign created successfully!');
      setError(null);
      // Optionally reset the form
      setCampaignName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Create New Campaign</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="campaignName">Campaign Name:</label>
          <input
            type="text"
            id="campaignName"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
};

export function NewCampaignSideDrawer() {
  return (
    <div>
      <h2>New Campaign</h2>
    </div>
  );
}
