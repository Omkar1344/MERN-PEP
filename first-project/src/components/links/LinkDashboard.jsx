import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssessmentIcon from '@mui/icons-material/Assessment';
import { serverEndpoint } from "../../config";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { userPermissions } from "../../rbac/permissions";
import { useNavigate } from "react-router-dom";

function LinkDashboard() {
  const [errors, setErrors] = useState({});
  const [linksData, setLinksData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    campaignTitle: "",
    originalUrl: "",
    category: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const permission = userPermissions();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const fetchLinks = async () => {
    try {
      const response = await axios.get(`${serverEndpoint}/links`, {
        withCredentials: true,
      });
      setLinksData(response.data.data);
    } catch (error) {
      setErrors({
        message: "Unable to fetch links at the moment, please try again",
      });
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleModalShow = (editMode = false, data = {}) => {
    if (editMode) {
      setFormData({
        id: data._id,
        campaignTitle: data.campaignTitle,
        originalUrl: data.originalUrl,
        category: data.category,
      });
    } else {
      setFormData({
        id: "",
        campaignTitle: "",
        originalUrl: "",
        category: "",
      });
    }
    setIsEdit(editMode);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setErrors({});
  };

  const handleDeleteModalShow = (id) => {
    setFormData({ ...formData, id });
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteSubmit = async () => {
    try {
      await axios.delete(`${serverEndpoint}/links/${formData.id}`, {
        withCredentials: true,
      });
      fetchLinks();
    } catch (error) {
      setErrors({ message: "Something went wrong, please try again" });
    } finally {
      handleDeleteModalClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.campaignTitle.trim()) {
      newErrors.campaignTitle = "Campaign Title is mandatory";
      isValid = false;
    }
    if (!formData.originalUrl.trim()) {
      newErrors.originalUrl = "Original URL is mandatory";
      isValid = false;
    }
    if (!formData.category.trim()) {
      newErrors.category = "Category is mandatory";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const body = {
      campaign_title: formData.campaignTitle,
      original_url: formData.originalUrl,
      category: formData.category,
    };

    try {
      if (isEdit && formData.id) {
        await axios.put(`${serverEndpoint}/links/${formData.id}`, body, {
          withCredentials: true,
        });
      } else {
        await axios.post(`${serverEndpoint}/links`, body, {
          withCredentials: true,
        });
      }
      fetchLinks();
    } catch (error) {
      if (error.response?.data?.code === "INSUFFICIENT_FUNDS") {
        setErrors({
          message: `You do not have enough credits to perform this action.
                        Add funds to your account using Manage Payment option`,
        });
      } else {
        setErrors({ message: "Something went wrong, please try again" });
      }
    } finally {
      handleModalClose();
    }
  };

  const columns = [
    { field: "campaignTitle", headerName: "Campaign", flex: 2 },
    {
      field: "originalUrl",
      headerName: "URL",
      flex: 3,
      renderCell: (params) => (
        <a
          href={`${serverEndpoint}/links/r/${params.row._id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {params.row.originalUrl}
        </a>
      ),
    },
    { field: "category", headerName: "Category", flex: 2 },
    { field: "clickCount", headerName: "Clicks", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <>
          {permission.canEditLink && (
            <IconButton>
              <EditIcon onClick={() => handleModalShow(true, params.row)} />
            </IconButton>
          )}
          {permission.canDeleteLink && (
            <IconButton>
              <DeleteIcon
                onClick={() => handleDeleteModalShow(params.row._id)}
              />
            </IconButton>
          )}
          {permission.canViewLink && (
            <IconButton>
              <AssessmentIcon
                onClick={() => {
                    navigate(`/analytics/${params.row._id}`)
                }}
              />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Manage your Affiliate Links</h2>
        {permission.canCreateLink && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleModalShow(false)}
          >
            Add
          </button>
        )}
      </div>

      {errors.message && (
        <div className="alert alert-danger">{errors.message}</div>
      )}

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={linksData}
          columns={columns}
          paginationModel={{ pageSize: 20, page: 0 }}
          rowsPerPageOptions={[20, 50, 100]}
          disableRowSelectionOnClick
          sx={{ fontFamily: "inherit" }}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Link" : "Add Link"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {["campaignTitle", "originalUrl", "category"].map((field) => (
              <div className="mb-3" key={field}>
                <label htmlFor={field} className="form-label">
                  {field === "campaignTitle"
                    ? "Campaign Title"
                    : field === "originalUrl"
                    ? "Original URL"
                    : "Category"}
                </label>
                <input
                  type="text"
                  name={field}
                  className={`form-control ${
                    errors[field] ? "is-invalid" : ""
                  }`}
                  value={formData[field]}
                  onChange={handleChange}
                />
                {errors[field] && (
                  <div className="invalid-feedback">{errors[field]}</div>
                )}
              </div>
            ))}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this link?</Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={handleDeleteModalClose}
          >
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleDeleteSubmit}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LinkDashboard;
