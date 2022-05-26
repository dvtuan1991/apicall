export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  address?: Address;
  phone: string;
  website: string;
  companyname?: string;
}

interface Address {
  street?: string;
  suit?: string;
  city?: string;
  zipcode?: string;
}