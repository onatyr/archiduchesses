import React, { useState, useEffect } from 'react';
import { PlantBookService } from '@shared/services/plantbook.service';
import { PlantBase, PlantBookSearchResult } from '@shared/models';

import { getSunlightExposure } from '@shared/utils/plant.util';
import { PlantsService } from '@plantApp/src/services/plants.service';
import TextInput from '@plantApp/src/components/forms/forms-components/TextInput';
import Loading from '@plantApp/src/components/Loading';
import ErrorMessage from '@plantApp/src/components/forms/forms-components/ErrorMessage';
import FormButton from '@plantApp/src/components/forms/forms-components/FormButton';

interface AddPlantFormProps {
  onClose: () => void;
}

const AddPlantForm: React.FC<AddPlantFormProps> = ({ onClose }) => {
  const plantBookService = new PlantBookService(
    import.meta.env.VITE_PLANTBOOK_API_KEY
  );
  const plantsService = new PlantsService();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PlantBookSearchResult[]>(
    []
  );
  const [newPlant, setNewPlant] = useState<PlantBase | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      setIsLoading(true);
      plantBookService
        .searchPlantByName(searchQuery)
        .then((results) => {
          setSearchResults(results);
        })
        .catch((error) => {
          console.error('Error searching for plants:', error);
          setError('Error fetching plant results.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchResultClick = (plantId: string) => {
    setIsDetailsLoading(true);
    plantBookService
      .getPlantDetails(plantId)
      .then((plantDetails) => {
        setNewPlant({
          name: plantDetails?.displayPid || '',
          sunlight: getSunlightExposure(plantDetails?.maxLightLux || 0),
          wateringRecurrenceDays: undefined,
          adoptionDate: new Date(),
          roomId: undefined,
          imageUrl: plantDetails?.imageUrl || undefined,
        });
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching plant details:', error);
        setError('Error fetching plant details.');
      })
      .finally(() => {
        setIsDetailsLoading(false);
      });
  };

  const handleInputChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(e.target);
    setNewPlant((prevState: any) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!newPlant) return;

    setIsSubmitting(true);

    try {
      const result = await plantsService.insertPlant(newPlant);
      if (result) {
        window.location.reload();
        onClose();
      } else {
        setError('Error adding plant');
      }
    } catch (error) {
      console.error('Error during plant insertion:', error);
      setError('Error during plant insertion');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-surface dark:bg-dark-surface rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Add a New Plant</h2>

      <TextInput
        id="plant-search"
        label="Search for a plant by name"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Enter plant name"
        error={error ? 'Search error' : undefined}
      />

      <div className="mt-4">
        {isLoading && <Loading message="Searching..." />}
        {searchResults.length > 0 ? (
          <ul className="list-disc pl-5">
            {searchResults.map((searchResult, index) => (
              <li
                key={index}
                className="text-secondary dark:text-dark-secondary cursor-pointer"
                onClick={() => handleSearchResultClick(searchResult.pid)}
              >
                {searchResult.pid}
              </li>
            ))}
          </ul>
        ) : searchQuery.length >= 3 ? (
          <p className="text-sm text-gray-500">No results found.</p>
        ) : null}
      </div>

      {error && (
        <ErrorMessage
          message={error}
          variant="error"
          size="sm"
          showIcon={true}
        />
      )}

      {isDetailsLoading ? (
        <Loading message="Loading plant details..." />
      ) : newPlant ? (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Edit Plant Details</h3>
          <form className="space-y-4">
            <TextInput
              id="name"
              label="Plant Name"
              value={newPlant.name}
              onChange={handleInputChangeForm}
            />

            <div>
              <label className="block font-medium mb-1">Image</label>
              <img
                src={newPlant.imageUrl}
                alt={newPlant.name}
                className="w-48 h-48 object-cover mb-4"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Sunlight Exposure
              </label>
              <p className="p-2 border border-surface dark:border-dark-surface rounded w-full">
                {newPlant.sunlight}
              </p>
            </div>

            <TextInput
              id="wateringRecurrenceDays"
              label="Watering recurrence in days"
              type="number"
              value={newPlant.wateringRecurrenceDays}
              onChange={handleInputChangeForm}
            />

            <div className="mt-4">
              <FormButton
                type="button"
                variant="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding Plant...' : 'Add Plant'}
              </FormButton>
            </div>

            <div className="mt-4">
              <FormButton type="button" variant="secondary" onClick={onClose}>
                Cancel
              </FormButton>
            </div>
          </form>
        </div>
      ) : (
        <p className="text-gray-500">Select a plant to edit its details.</p>
      )}
    </div>
  );
};

export default AddPlantForm;
