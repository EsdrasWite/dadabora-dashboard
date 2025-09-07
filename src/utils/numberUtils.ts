// You'd typically install this with npm, but for demo assume it's loaded in your environment
// npm install libphonenumber-js

import { parsePhoneNumberFromString } from 'libphonenumber-js';

 type userProps = {
    id: number;
    name: string;
    phone: string;
    created_at: string;
    status: "active" | "inactive";
  };

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

export function addLocationToUsers(users:userProps[]) {
  return users.map(user => {
    const phoneNumber = parsePhoneNumberFromString(`+${user.phone}`);
    const countryCode = phoneNumber ? phoneNumber.country : null;
    const countryName = countryCode ? regionNames.of(countryCode) : 'Unknown';

    return {
      ...user,
      location: countryName || 'Unknown',
    };
  });
}

export function getLocationFromNumber(mobileNumber:string) {
    const phoneNumber = parsePhoneNumberFromString(`+${mobileNumber}`);
    const countryCode = phoneNumber ? phoneNumber.country : null;
    const countryName = countryCode ? regionNames.of(countryCode) : 'Unknown';

    return {location: countryName}
}



export function countCurrentMonthItems(arr:any) {
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-11
  const currentYear = now.getFullYear();

  return arr.filter((item:any) => {
    const itemDate = new Date(item.created_at);
    return (
      itemDate.getMonth() === currentMonth &&
      itemDate.getFullYear() === currentYear
    );
  }).length;
}


