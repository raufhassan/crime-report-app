import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
const DataTable = ({ reports }) => {
  const columns = [
    {
      dataField: "id",
      text: "id",
      hidden: true,
    },
    {
      dataField: "name",
      text: "Complainant's name",
    },
    {
      dataField: "date",
      text: "Date of complain",
    },
    {
      dataField: "description",
      text: "Complain desciption",
    },
    {
      dataField: "type",
      text: "Type",
    },
    {
      dataField: "status",
      text: "Status",
    },
  ];
  return (
    <div className="container" style={{ marginTop: 50 }}>
      <BootstrapTable
        striped
        hover
        keyField="id"
        data={reports}
        columns={columns}
      />
    </div>
  );
};

export default DataTable;
