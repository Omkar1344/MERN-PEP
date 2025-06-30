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
  const [formData, setFormData] = useState({
    campaignTitle:'',
    originalUrl:'',
    category:''
    });
//   const [showAddModal, setShowAddModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

  const handleModalShow=(isEdit, data={})=>{
    if(isEdit){
        setFormData({
            id: data._id,
            campaignTitle:data.campaignTitle,
            originalUrl:data.originalUrl,
            category:data.category
        });
    }else{
        setFormData({
            campaignTitle:'',
            originalUrl:'',
            category:'',
        });
    }
    setIsEdit(isEdit);
    setShowModal(true);
  };

  const handleModalClose=()=>{
    setShowModal(false);
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteModalShow = (linkId)=>{
    setFormData({
        id: linkId
    });
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose=()=>{
    setShowDeleteModal(false);
  }

  const handleDeleteSubmit = async()=>{
    try{
        await axios.delete(
            `${serverEndpoint}/links/${formData.id}`,
            {withCredentials:true}
        );
        setFormData({
            campaignTitle:'',
            originalUrl:'',
            category:'',
        });
        fetchLinks();
    }catch(error){
        setErrors({message:"Something went wrong, please try again"})
    }finally{
        handleDeleteModalClose();
    }
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
  
    const handleSubmit = async (e) => {
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
            if(isEdit){
                await axios.put(`${serverEndpoint}/links/${formData.id}`,body,configuration);
            }else{
                await axios.post(
                `${serverEndpoint}/links`,
                body, configuration
                );
            }
            setFormData({
                campaignTitle: '',
                originalUrl: '',
                category: '',
            });
            fetchLinks();
        }catch(error){
            setErrors({message:"Something went wrong, please try again"});
        }finally{
            handleModalClose();
        }
      }
    };

  const columns = [
    { field: "campaignTitle", headerName: "Campaign", flex: 2 },
    { field: "originalUrl", headerName: "URL", flex: 3,
        renderCell:(params)=>(
            <a href={`${serverEndpoint}/links/r/${params.row._id}`}
            target="_blank"
            rel="noopener noreferrer"
            >
                {params.row.originalUrl}
            </a>
        )
    },
    { field: "category", headerName: "Category", flex: 2 },
    { field: "clickCount", headerName: "Clicks", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton>
            <EditIcon onClick={()=>handleModalShow(true, params.row)}/>
          </IconButton>
          <IconButton>
            <DeleteIcon onClick={()=>handleDeleteModalShow(params.row._id)}/>
          </IconButton>
        </>
      ),
    },
  ];


  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Manage your Affiliate Links</h2>
        <button className="btn btn-primary btn-sm" onClick={handleModalShow}>Add</button>
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
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? (<>Edit Link</>):(<>Add Link</>)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
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
      <Modal show={showDeleteModal} onHide={()=>setShowDeleteModal()}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete this link?
        </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-secondary" onClick={()=>setShowDeleteModal()}>
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
