export interface FuelMovement {
    timestamp: string,
    liters: number,
    totalPrice: number
  }
  
  export interface VehicleInfo {
    plate: string,
    owner: string,
    fuel: string,
    photo: string,
    fuelMovements: FuelMovement[]
  }
  