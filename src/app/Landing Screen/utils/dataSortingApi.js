import { MachineStatus, TotalTonnagePH, NumberOfCycles, TotalTonnage, Mileage } from "./Data";


export const MSChart = {
    labels: MachineStatus.map((data) => data.status),
    datasets: [ 
      {
        label: "Machine Status",
        data: MachineStatus.map((data) => data.number),
        backgroundColor: [
          "#3CC3DF",
          "#FFAE4C",
          "#FF928A",
        ],
      }
    ]
}

export const TPHChart = {
    labels: TotalTonnagePH.map((data) => data.hour),
    datasets: [ 
      {
        label: "Machine Status",
        xAxisId: "Time",
        yAxisId: "Tons",
        data: TotalTonnagePH.map((data) => data.tonnage),
        backgroundColor: [
          "#3CC3DF",
          "#FFAE4C",
          "#FF928A",
        ],
      }
    ]
}

export const TTChart = {
    labels: TotalTonnage.map((data) => data.day),
    datasets: [ 
      {
        label: "Machine Status",
        data: TotalTonnage.map((data) => data.tonnage),
        backgroundColor: [
          "#3CC3DF",
          "#FFAE4C",
          "#FF928A",
        ],
      }
    ]
}

export const NoCChart = {
    labels: NumberOfCycles.map((data) => data.name),
    datasets: [ 
      {
        label: "Machine Status",
        data: NumberOfCycles.map((data) => data.cycles),
        backgroundColor: [
          "#3CC3DF",
          "#FFAE4C",
          "#FF928A",
        ],
      }
    ]  
}
export const MileageChart = {
    labels: Mileage.map((data) => data.name),
    datasets: [ 
      {
        label: "Machine Status",
        data: Mileage.map((data) => data.distance),
        backgroundColor: [
          "#3CC3DF",
          "#FFAE4C",
          "#FF928A",
        ],
      }
    ]  
}