import { useQuery } from '@tanstack/react-query';
import { getFormData } from '../services/FormService';

export const useGeneralForm = () => {
  return useQuery(['general-form-data'], getFormData);
};
