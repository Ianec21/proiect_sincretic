export interface IPerson {
  id?: string;
  name: string;
  CNP: string;
  birthDate: Date;
  address: Date;
  phoneNumber: string;
  email: string;
}

export interface ICompany {
  id?: string;
  name: string;
  CUI: string;
  numberOfWorkers: number;
  address: string;
  phoneNumber: string;
  email: string;
}
