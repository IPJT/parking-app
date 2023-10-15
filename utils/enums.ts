import { ToastErrorObject } from '../components/Toast'

export enum VehicleBrandEnum {
  bmw = 'BMW',
  audi = 'Audi',
}

export enum VehicleStatusEnum {
  pending,
  approved,
}

export const ERROR_TOASTS: { [key: string]: ToastErrorObject } = {
  vehichleAlreadyExists: {
    title: 'Hoppsan!',
    description: 'Bilen finns redan tillagd i våra system. Vänligen kontakta kundservice.',
    type: 'warning',
  },
  genericError: {
    title: 'Oj då!',
    description: 'Det verkar som om något gick fel. Vänligen testa igen eller kontakta kundservice',
    type: 'error',
  },
}

export enum CheckParkedLegallyTime {
  PM20 = 'PM20',
}
