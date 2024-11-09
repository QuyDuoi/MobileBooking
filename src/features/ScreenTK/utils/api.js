import {ipAddress} from '../../../services/api';
const uriMonths = `${ipAddress}getRevenueSixMonths`;
const uriDate = `${ipAddress}getRevenueDay`;
const uriWeek = `${ipAddress}getRevenueFourWeek`;

export const getTKDate = async (year, month, date) => {
  try {
    const response = await fetch(
      `${uriDate}?year=${year}&month=${month}&day=${date}`,
    );
    const data = await response.json();
    const datareset = {
      labels: [data.date],
      datasets: [{data: [data.totalRevenue]}],
    };
    return datareset;
  } catch (error) {
    console.log('err get TK Date', error);
  }
};

export const getTKMonths = async () => {
  try {
    const response = await fetch(uriMonths);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Err getTK Months', error);
    return [];
  }
};

export const getTKWeek = async () => {
  try {
    const response = await fetch(uriWeek);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Err getTK Months', error);
    return [];
  }
};
