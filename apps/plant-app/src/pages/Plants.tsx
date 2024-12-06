import React, { useState, useEffect } from 'react';
import { PlantsService } from '../services/plants.service';
import { Plant, Sunlight, Watering } from '../../../shared/models';
import AddPlantButton from '../components/AddPlantButton';
import AddPlantForm from '../components/forms/AddPlantForm';
import { formatDate } from '../utils/date';
import ConfirmationDialog from '../components/ConfirmationDialog'; // Import the dialog
import ReactIcon from '../components/ReactIcon';

const Plants: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isAddPlantFormOpen, setIsAddPlantFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // For loading state
  const [error, setError] = useState<string | null>(null); // For error handling
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to track dialog visibility
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null); // Store plants ID for deletion
  const [dialogMessage, setDialogMessage] = useState(''); // Message to show in the dialog

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const plantsData = await new PlantsService().getAll();
        setPlants(plantsData);
      } catch (err) {
        setError('Failed to load plants');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlants();
  }, []);

  const handleAddPlantClick = () => setIsAddPlantFormOpen(true);
  const handleFormClose = () => setIsAddPlantFormOpen(false);

  const getRating = (
    value: Sunlight | Watering,
    ratings: Record<string, number>
  ): number => ratings[value] || 0;

  const sunlightRatings: Record<string, number> = {
    [Sunlight.FullSun]: 4,
    [Sunlight.BrightIndirectLight]: 3,
    [Sunlight.PartialShade]: 2,
    [Sunlight.LowLight]: 1,
  };

  const wateringRatings: Record<string, number> = {
    [Watering.Frequent]: 4,
    [Watering.Moderate]: 3,
    [Watering.Sparing]: 2,
    [Watering.Minimal]: 1,
  };

  const handleDeleteClick = (plantId: string) => {
    setSelectedPlantId(plantId);
    setDialogMessage('Are you sure you want to delete this plants?');
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedPlantId) {
      const isDeleted = await new PlantsService().deletePlant(selectedPlantId);
      if (isDeleted) {
        // Filter out the deleted plants from the state
        setPlants((prevPlants) =>
          prevPlants.filter((plant) => plant.id !== selectedPlantId)
        );
      }
      setIsDialogOpen(false); // Close the dialog after deletion
    }
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false); // Close the dialog without deletion
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-start">
      <div className="flex flex-row w-full justify-between">
        <h1 className="text-3xl font-bold text-secondary dark:text-dark-secondary mb-6">
          Plants
        </h1>
        <AddPlantButton onClick={handleAddPlantClick} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center w-full h-48">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-center text-error">{error}</div>
      ) : (
        <div className="w-full">
          {/* Display Add Plant Form if it's open */}
          {isAddPlantFormOpen ? (
            <AddPlantForm onClose={handleFormClose} />
          ) : plants.length === 0 ? (
            <div className="text-center text-gray-600">
              No plants to show. Add a new one!
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {plants.map((plant) => (
                <li
                  key={plant.id}
                  className="bg-white dark:bg-dark-background shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="flex items-center gap-4 p-4">
                    <div className="w-24 h-24 overflow-hidden rounded-lg">
                      <img
                        src={plant.imageUrl}
                        alt={plant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <p className="text-xl font-semibold">{plant.name}</p>
                      <p className="text-sm text-gray-500">
                        Adopted on {formatDate(plant.adoptionDate)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="flex bg-surface dark:bg-dark-surface px-2 rounded-full text-yellow-400 p-1">
                          {Array.from({
                            length: getRating(plant.sunlight, sunlightRatings),
                          }).map((_, index) => (
                            <ReactIcon
                              key={index}
                              type="sunlight"
                              size="0.8em"
                            />
                          ))}
                        </span>
                        <span className="flex bg-surface dark:bg-dark-surface px-2 rounded-full text-blue-400 p-1">
                          {Array.from({
                            length: getRating(plant.watering, wateringRatings),
                          }).map((_, index) => (
                            <ReactIcon
                              key={index}
                              type="watering"
                              size="0.8em"
                            />
                          ))}
                        </span>
                      </div>
                    </div>
                    <button
                      className="text-red-600 ml-4"
                      onClick={() => handleDeleteClick(plant.id)}
                    >
                      <ReactIcon type="delete" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        message={dialogMessage}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default Plants;
