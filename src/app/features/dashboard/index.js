import { useLoadFlightQuery } from "../../store/flightApi";
import { Table } from "../../common/sharedComponent";
import { useState } from "react";

const Dashboard = () => {
  const { data: flight, isError, isSuccess, isLoading } = useLoadFlightQuery();
  const columns = [
    { Header: "departure airpoort", accessor: "estDepartureAirport" },
    { Header: "arrival airpoort", accessor: "estArrivalAirport" },
    { Header: "time", accessor: "lastSeen" },
    { Header: "departure count", accessor: "departureAirportCandidatesCount" },
    { Header: "arrival count", accessor: "arrivalAirportCandidatesCount" },
  ];


  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : isError ? (
        "Error occured"
      ) : (
        <>
          <Table
            {...{
              columns,
              data: flight,
            }}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;