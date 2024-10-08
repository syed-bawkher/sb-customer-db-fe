import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

// Function to get the bearer token from session storage
const getBearerToken = () => {
  return sessionStorage.getItem("bearer_token");
};

const fabricService = {
  // Get all fabrics
  getAllFabrics() {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/fabrics`, // Updated route to match backend
      headers: {
        Authorization: `Bearer ${getBearerToken()}`,
      },
    };

    return axios
      .request(config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching fabrics:", error);
        throw error; // Rethrow to ensure error handling continues in the calling context
      });
  },

  // Get fabric by ID
  getFabricById(fabricId) {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/fabric/${encodeURIComponent(fabricId)}`, // Updated route to match backend
      headers: {
        Authorization: `Bearer ${getBearerToken()}`,
      },
    };

    return axios
      .request(config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching fabric by ID:", error);
        throw error; // Rethrow to ensure error handling continues in the calling context
      });
  },

  // Search fabrics by query
  searchFabrics(query) {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/fabrics/search?query=${encodeURIComponent(query)}`, // Updated route for search
      headers: {
        Authorization: `Bearer ${getBearerToken()}`,
      },
    };

    return axios
      .request(config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error searching fabrics:", error);
        throw error; // Rethrow to ensure error handling continues in the calling context
      });
  },

  // Create a new fabric
  createFabric(fabric) {
    const data = JSON.stringify(fabric);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/fabric`, // Updated route to match backend
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getBearerToken()}`,
      },
      data: data,
    };

    return axios
      .request(config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error creating fabric:", error);
        throw error; // Rethrow to ensure error handling continues in the calling context
      });
  },

  // Update an existing fabric
  updateFabric(fabricId, fields) {
    const data = JSON.stringify(fields);

    const config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/fabric/${encodeURIComponent(fabricId)}`, // Updated route to match backend
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getBearerToken()}`,
      },
      data: data,
    };

    return axios
      .request(config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error updating fabric:", error);
        throw error; // Rethrow to ensure error handling continues in the calling context
      });
  },

  // Delete a fabric
  deleteFabric(fabricId) {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/fabric/${encodeURIComponent(fabricId)}`, // Updated route to match backend
      headers: {
        Authorization: `Bearer ${getBearerToken()}`,
      },
    };

    return axios
      .request(config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error deleting fabric:", error);
        throw error; // Rethrow to ensure error handling continues in the calling context
      });
  },

  // Gets the presigned URL for uploading an image for a fabric to the S3 bucket
  getPresignedUrl: async (fabricId, filename) => {
    const url = `${BASE_URL}/fabric/${encodeURIComponent(
      fabricId
    )}/upload-image`;

    try {
      const response = await axios.post(
        url,
        { filename },
        {
          headers: {
            Authorization: `Bearer ${getBearerToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting presigned URL:", error);
      throw error;
    }
  },

  // Gets the image URL for a fabric
  getFabricImageUrl: async (fabricId) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/fabric/${encodeURIComponent(fabricId)}/image`,
      headers: {
        Authorization: `Bearer ${getBearerToken()}`,
      },
    };

    return axios
      .request(config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching fabric image URL:", error);
        throw error;
      });
  },

  // Deletes the image for a fabric
  deleteFabricImage: async (fabricId) => {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/fabric/${encodeURIComponent(fabricId)}/image`,
      headers: {
        Authorization: `Bearer ${getBearerToken()}`,
      },
    };

    return axios
      .request(config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error deleting fabric image:", error);
        throw error;
      });
  },
};

export default fabricService;
