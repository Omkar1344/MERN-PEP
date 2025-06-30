import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { serverEndpoint } from "../../config";
import { useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

function LinkDashboard() {
  const [errors, setErrors] = useState({});
  const [linksData, setLinksData] = useState([]);
  const [formData, setFormData] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddModalShow=()=>{
    setShowAddModal(true);
  }

  const handleAddModalClose=()=>{
    setShowAddModal(false);
  }

  const fetchLinks = async () => {
    try {
      const response = await axios.get(`${serverEndpoint}/links`, {
        withCredentials: true,
      });
      setLinksData(response.data.data);
    } catch (error) {
      console.log(error);
      setErrors({
        message: "Unable to fetch links at the moment, please try again",
      });
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const validate = () => {
        let newErrors = {};
      let isValid = true;
  
      if (formData.campaignTitle.length === 0) {
        newErrors.campaignTitle = 'Campaign Title is mandatory';
        isValid = false;
      }
      if (formData.originalUrl.length === 0) {
        newErrors.originalUrl = 'Original Url is mandatory';
        isValid = false;
      }
      if (formData.category.length === 0) {
        newErrors.category = 'Category is mandatory';
        isValid = false;
      }
  
      setErrors(newErrors);
      return isValid;
    };
  
    const handleAddSubmit = async (e) => {
      e.preventDefault();
      
      if(validate()){
        const body={
            campaign_title: formData.campaignTitle,
            original_url: formData.originalUrl,
            category: formData.category
        };
        const configuration={
            withCredentials: true
        };
        try{
            const response = await axios.post(
                `${serverEndpoint}/links`,
                body, configuration
            );
            fetchLinks();
        }catch(error){
            setErrors({message:"Something went wrong, please try again"});
        }finally{
            handleAddModalClose();
        }
      }
    };

  const columns = [
    { field: "campaignTitle", headerName: "Campaign", flex: 2 },
    { field: "originalUrl", headerName: "URL", flex: 3 },
    { field: "category", headerName: "Category", flex: 2 },
    { field: "clickCount", headerName: "Clicks", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Manage your Affiliate Links</h2>
        <button className="btn btn-primary btn-sm" onClick={handleAddModalShow}>Add</button>
      </div>

      {errors.message && (
        <div className="alert alert-danger" role="alert">
          {errors.message}
        </div>
      )}

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={linksData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 20, page: 0 },
            },
          }}
          rowsPerPageOptions={[20, 50, 100]}
          disableRowSelectionOnClick
          showToolbar
          sx={{
            fontFamily: "inherit",
          }}
        />
      </div>
      <Modal show={showAddModal} onHide={handleAddModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddSubmit}>
            <div className="mb-3">
              <label htmlFor="campaignTitle" className="form-label">
                Campaign Title
              </label>
              <input
                type="text"
                name="campaignTitle"
                className={`form-control ${
                  errors.campaignTitle ? "is-invalid" : ""
                }`}
                id="campaignTitle"
                value={formData.campaignTitle}
                onChange={handleChange}
              />
              {errors.campaignTitle && (
                <div className="invalid-feedback">{errors.campaignTitle}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="originalUrl" className="form-label">
                Original Url
              </label>
              <input
                type="text"
                name="originalUrl"
                className={`form-control ${
                  errors.originalUrl ? "is-invalid" : ""
                }`}
                id="originalUrl"
                value={formData.originalUrl}
                onChange={handleChange}
              />
              {errors.originalUrl && (
                <div className="invalid-feedback">{errors.originalUrl}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                type="text"
                name="category"
                className={`form-control ${
                  errors.category ? "is-invalid" : ""
                }`}
                id="category"
                value={formData.category}
                onChange={handleChange}
              />
              {errors.category && (
                <div className="invalid-feedback">{errors.category}</div>
              )}
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LinkDashboard;
