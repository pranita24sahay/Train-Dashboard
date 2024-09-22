export interface TrainType {
    trainNumber: string;
    departureTime: string; // Use Date type if needed
    platform?: string;
    arrivalTime: string; // Optional if not always present
    departing?: boolean,
    priority?: 'P1' | 'P2' | 'P3';
}
