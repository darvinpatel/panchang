export type City = {
  id: string;
  name: string;
  nameGu: string;
  latitude: number;
  longitude: number;
};

export const CITIES: City[] = [
  { id: "ahmedabad", name: "Ahmedabad", nameGu: "અમદાવાદ", latitude: 23.0225, longitude: 72.5714 },
  { id: "gandhinagar", name: "Gandhinagar", nameGu: "ગાંધીનગર", latitude: 23.2156, longitude: 72.6369 },
  { id: "surat", name: "Surat", nameGu: "સુરત", latitude: 21.1702, longitude: 72.8311 },
  { id: "vadodara", name: "Vadodara", nameGu: "વડોદરા", latitude: 22.3072, longitude: 73.1812 },
  { id: "anand", name: "Anand", nameGu: "આણંદ", latitude: 22.5645, longitude: 72.9289 },
  { id: "nadiad", name: "Nadiad", nameGu: "નડિયાદ", latitude: 22.6916, longitude: 72.8634 },
  { id: "bharuch", name: "Bharuch", nameGu: "ભરૂચ", latitude: 21.7051, longitude: 72.9959 },
  { id: "rajkot", name: "Rajkot", nameGu: "રાજકોટ", latitude: 22.3039, longitude: 70.8022 },
  { id: "bhavnagar", name: "Bhavnagar", nameGu: "ભાવનગર", latitude: 21.7645, longitude: 72.1519 },
  { id: "jamnagar", name: "Jamnagar", nameGu: "જામનગર", latitude: 22.4707, longitude: 70.0577 },
  { id: "junagadh", name: "Junagadh", nameGu: "જૂનાગઢ", latitude: 21.5222, longitude: 70.4579 },
  { id: "porbandar", name: "Porbandar", nameGu: "પોરબંદર", latitude: 21.6417, longitude: 69.6293 },
  { id: "morbi", name: "Morbi", nameGu: "મોરબી", latitude: 22.8173, longitude: 70.837 },
  { id: "bhuj", name: "Bhuj", nameGu: "ભુજ", latitude: 23.242, longitude: 69.6669 },
  { id: "gandhidham", name: "Gandhidham", nameGu: "ગાંધીધામ", latitude: 23.0753, longitude: 70.1337 },
];

export function resolveCity(id?: string): City {
  return CITIES.find((city) => city.id === id) ?? CITIES[0];
}
