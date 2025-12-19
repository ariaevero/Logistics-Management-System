export const ranks = [
  'Admiral',
  'Vice Admiral',
  'Rear Admiral',
  'Commodore',
  'Captain',
  'Commander',
  'Lieutenant Commander',
  'Lieutenant',
  'Sub-Lieutenant',
  'Midshipman'
];

export const commissionTypes = ['RC', 'DSSC', 'SD', 'DRC'];

export const commands = {
  NHQ: ['NHQ (HQ)', 'NHQ Support'],
  ENC: ['ENC', 'ENC Ops'],
  WNC: ['WNC', 'WNC Ops'],
  CNC: ['CNC', 'CNC Ops'],
  NAVTRAC: ['NAVTRAC', 'NNAF'],
  NAVDOC: ['NAVDOC'],
  'HQ LOC': ['HQ LOC'],
  NHL: ['NHL']
};

export const states = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
  'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi',
  'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara'
];

export const lgasByState: Record<string, string[]> = {
  Lagos: ['Agege', 'Alimosho', 'Apapa', 'Eti-Osa', 'Ibeju-Lekki', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Somolu', 'Surulere'],
  Abuja: ['Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Municipal'],
  'Rivers': ['Port Harcourt', 'Obio/Akpor', 'Ikwerre', 'Okrika', 'Eleme'],
  'Kano': ['Nassarawa', 'Fagge', 'Dala', 'Gwale', 'Kumbotso'],
  // Add additional mappings as necessary for production use
};

export const brand = {
  navyBlue: '#0f3b6f',
  accent: '#0b2d55'
};
