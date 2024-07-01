import React, { useEffect, useState } from "react";
import "../assets/relocation.css";

const AssetRelocationItems = () => {
  const [data, setData] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    AssetRelocation_ID: "",
    FixedIDNo: "",
    PreviousLocation: "",
    NewLocation: "",
    PreviousEmployeeResponsible: "",
    NewEmployeeResponsible: "",
  });

  useEffect(() => {
    fetchData();
  }, [page, pageSize, search, sortField, sortOrder]);

  const fetchData = async () => {
    let query = `http://localhost:5000/asset-relocation?page=${page}&pageSize=${pageSize}&search=${search}&sortField=${sortField}&sortOrder=${sortOrder}`;
    const response = await fetch(query);
    const result = await response.json();
    setData(result.data);
    setTotalPages(result.totalPages);
  };

  const fetchDetails = async (id) => {
    const response = await fetch(`http://localhost:5000/asset-relocation/${id}`);
    const result = await response.json();
    return result.AssetRelocationItems;
  };

  const handleExpandRow = async (id) => {
    const currentExpandedRows = [...expandedRows];
    const isRowExpanded = currentExpandedRows.includes(id);

    if (isRowExpanded) {
      setExpandedRows(currentExpandedRows.filter((rowId) => rowId !== id));
    } else {
      const details = await fetchDetails(id);
      const updatedData = data.map((item) => {
        if (item.ID === id) {
          return { ...item, details };
        }
        return item;
      });
      setData(updatedData);
      setExpandedRows([...currentExpandedRows, id]);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSort = (field) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    setPage(1);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setFormData({
      AssetRelocation_ID: item.AssetRelocation_ID,
      FixedIDNo: item.FixedIDNo,
      PreviousLocation: item.PreviousLocation,
      NewLocation: item.NewLocation,
      PreviousEmployeeResponsible: item.PreviousEmployeeResponsible,
      NewEmployeeResponsible: item.NewEmployeeResponsible,
    });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/asset-relocation-item/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/asset-relocation-item/${editItem.RelocationID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setEditItem(null);
    fetchData();
  };

  const handleFormCancel = () => {
    setEditItem(null);
    setFormData({
      AssetRelocation_ID: "",
      FixedIDNo: "",
      PreviousLocation: "",
      NewLocation: "",
      PreviousEmployeeResponsible: "",
      NewEmployeeResponsible: "",
    });
  };

  return (
    <div className="container">
      <h1>Asset Relocation Table</h1>
      <input type="text" placeholder="Search..." value={search} onChange={handleSearch} className="search-input" />
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort("ID")}>ID</th>
            <th onClick={() => handleSort("TransNo")}>Transaction No</th>
            <th onClick={() => handleSort("TransDate")}>Transaction Date</th>
            <th onClick={() => handleSort("TransDesc")}>Description</th>
            <th onClick={() => handleSort("EntitasBisni.EBCode")}>Entity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <React.Fragment key={item.ID}>
              <tr>
                <td>{item.ID}</td>
                <td>{item.TransNo}</td>
                <td>{new Date(item.TransDate).toLocaleString()}</td>
                <td>{item.TransDesc}</td>
                <td>{item.EntitasBisni.EBCode}</td>
                <td>
                  <button onClick={() => handleExpandRow(item.ID)} className="action-button">
                    {expandedRows.includes(item.ID) ? "▼" : "▶"}
                  </button>
                </td>
              </tr>
              {expandedRows.includes(item.ID) &&
                item.details &&
                item.details.map((detail) => (
                  <tr key={detail.RelocationID} className="detail-row">
                    <td colSpan="6">
                      {editItem && editItem.RelocationID === detail.RelocationID ? (
                        <form onSubmit={handleFormSubmit} className="edit-form">
                          <div className="form-group">
                            <label>Previous Location:</label>
                            <input type="text" name="PreviousLocation" value={formData.PreviousLocation} onChange={handleFormChange} />
                          </div>
                          <div className="form-group">
                            <label>New Location:</label>
                            <input type="text" name="NewLocation" value={formData.NewLocation} onChange={handleFormChange} />
                          </div>
                          <div className="form-group">
                            <label>Previous Employee Responsible:</label>
                            <input type="text" name="PreviousEmployeeResponsible" value={formData.PreviousEmployeeResponsible} onChange={handleFormChange} />
                          </div>
                          <div className="form-group">
                            <label>New Employee Responsible:</label>
                            <input type="text" name="NewEmployeeResponsible" value={formData.NewEmployeeResponsible} onChange={handleFormChange} />
                          </div>
                          <div className="form-actions">
                            <button type="submit" className="save-button">
                              Save
                            </button>
                            <button type="button" className="cancel-button" onClick={handleFormCancel}>
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <tr className="border-none">
                          <td colSpan={6} className="flex-col">
                            <div className="max-h-64 overflow-y-auto">
                              <table className="min-w-full table-auto border-collapse p-2 w-full ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="text-center">
                                    <th class="px-2 py-3 ">Relocation ID</th>
                                    <th class="px-2 py-3 ">Previous Location</th>
                                    <th class="px-2 py-3 ">New Location</th>
                                    <th class="px-2 py-3 ">Previous Employee Responsible</th>
                                    <th class="px-2 py-3 ">New Employee Responsible</th>
                                    <th class="px-2 py-3 ">Relocation Date</th>
                                    {/* <th class="px-2 py-3 ">actions</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                      <td class="px-2 ">{detail.RelocationID}</td>
                                      <td>{detail.PreviousLocation || "N/A"}</td>
                                      <td>{detail.NewLocation || "N/A"}</td>
                                      <td>{detail.PreviousEmployeeResponsible || "N/A"}</td>
                                      <td>{detail.NewEmployeeResponsible || "N/A"}</td>
                                      <td>{new Date(detail.RelocationDate).toLocaleString()}</td>
                                      {/* <td className="actions">
                                      <button onClick={() => handleEdit(detail)} className="edit-button">
                                          Edit
                                      </button>
                                      <button onClick={() => handleDelete(detail.RelocationID)} className="delete-button">
                                          Delete
                                      </button>
                                      </td> */}
                                    </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AssetRelocationItems;
