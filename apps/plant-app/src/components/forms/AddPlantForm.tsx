import React, { useState, useEffect } from 'react';
import { PlantBookService } from '../../../../shared/services/plantbook.service';
import { PlantsService } from '../../services/plants.service';
import {
  Plant,
  PlantBookDetails,
  PlantBookSearchResult,
  Sunlight,
  Watering,
} from '../../../../shared/models';
import { v4 as uuidv4 } from 'uuid';
import TextInput from './forms-components/TextInput';
import ErrorMessage from './forms-components/ErrorMessage';
import FormButton from './forms-components/FormButton';
import Loading from '../Loading';

interface AddPlantFormProps {
  onClose: () => void;
}

const AddPlantForm: React.FC<AddPlantFormProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PlantBookSearchResult[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [selectedPlantDetails, setSelectedPlantDetails] =
    useState<PlantBookDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const plantBookService = new PlantBookService(
    import.meta.env.VITE_PLANTBOOK_API_KEY
  );
  const plantsService = new PlantsService();

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
        setSelectedPlantDetails(plantDetails);
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
    const { name, value } = e.target;
    setSelectedPlantDetails((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getSunlightExposure = (maxLux: number, minLux: number): Sunlight => {
    const averageLux = (maxLux + minLux) / 2;

    if (averageLux >= 50000) {
      return Sunlight.FullSun;
    } else if (averageLux >= 15000) {
      return Sunlight.BrightIndirectLight;
    } else if (averageLux >= 3000) {
      return Sunlight.PartialShade;
    } else {
      return Sunlight.LowLight;
    }
  };

  const getWateringSchedule = (
    maxMoisture: number,
    minMoisture: number
  ): Watering => {
    const averageMoisture = (maxMoisture + minMoisture) / 2;

    if (averageMoisture >= 60) {
      return Watering.Frequent;
    } else if (averageMoisture >= 40) {
      return Watering.Moderate;
    } else if (averageMoisture >= 20) {
      return Watering.Sparing;
    } else {
      return Watering.Minimal;
    }
  };

  const handleSubmit = async () => {
    if (!selectedPlantDetails) return;

    const plantData: Plant = {
      id: uuidv4(),
      userId: localStorage.getItem('userId')!,
      name: selectedPlantDetails.displayPid,
      sunlight: getSunlightExposure(
        selectedPlantDetails.maxLightLux,
        selectedPlantDetails.minLightLux
      ),
      watering: getWateringSchedule(
        selectedPlantDetails.maxSoilMoist,
        selectedPlantDetails.minSoilMoist
      ),
      adoptionDate: new Date().toISOString(),
      placeId: '',
      imageUrl: selectedPlantDetails.imageUrl || '',
    };

    setIsSubmitting(true);

    try {
      const result = await plantsService.insertPlant(plantData);
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
      ) : selectedPlantDetails ? (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Edit Plant Details</h3>
          <form className="space-y-4">
            <TextInput
              id="plant-name"
              label="Plant Name"
              value={selectedPlantDetails.displayPid}
              onChange={handleInputChangeForm}
            />

            <div>
              <label className="block font-medium mb-1">Image</label>
              <img
                src={selectedPlantDetails.imageUrl}
                alt={selectedPlantDetails.displayPid}
                className="w-48 h-48 object-cover mb-4"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Sunlight Exposure
              </label>
              <p className="p-2 border border-surface dark:border-dark-surface rounded w-full">
                {getSunlightExposure(
                  selectedPlantDetails.maxLightLux,
                  selectedPlantDetails.minLightLux
                )}
              </p>
            </div>

            <div>
              <label className="block font-medium mb-1">
                Watering Schedule
              </label>
              <p className="p-2 border border-surface dark:border-dark-surface rounded w-full">
                {getWateringSchedule(
                  selectedPlantDetails.maxSoilMoist,
                  selectedPlantDetails.minSoilMoist
                )}
              </p>
            </div>

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
