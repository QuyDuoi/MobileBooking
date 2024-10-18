const Ipv4='192.168.1.3'
const uriMonths =`http://${Ipv4}:3000/api/getRevenueSixMonths`;
const uriDate =`http://${Ipv4}:3000/api/getRevenueDay`
const uriWeek =`http://${Ipv4}:3000/api/getRevenueFourWeek`

export const getTKDate = async (year,month,date)=>{
    try {
        const response = await fetch(`${uriDate}?year=${year}&month=${month}&day=${date}`)
        const data = await response.json();
        const datareset =  {
            labels: [data.date],
            datasets: [{data: [data.totalRevenue]}],
          }
        return datareset
    } catch (error) {
        console.log('err get TK Date',error)
    }
}

export const getTKMonths=async()=>{
    try {
        const response = await fetch(uriMonths)
        const data = await response.json();
        return data
    } catch (error) {
        console.log('Err getTK Months',error)
        return []
    }
}

export const getTKWeek=async()=>{
    try {
        const response = await fetch(uriWeek)
        const data = await response.json();
        return data
    } catch (error) {
        console.log('Err getTK Months',error)
        return []
    }
}
