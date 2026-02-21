export interface PlantData {
  plant: string;
  pot: string;
  recipient: string;
  sender: string;
  message: string;
  createdAt: number;
}

export const plantStore = new Map<string, PlantData>();
