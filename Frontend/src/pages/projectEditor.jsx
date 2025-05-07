import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { themeColors } from "../config/theme";
import ProjectEditorSidebar from "../components/ProjectEditorSidebar";
import API from "../services/api";
import QRCode from "react-qr-code"; 

const ProjectEditor = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [sceneObjects, setSceneObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      const res = await API.get(`/projects/${projectId}`);
      setProject(res.data.data);
      setSceneObjects(res.data.data.sceneObjects || []);
      generateQrCode(res.data.data);
    } catch (error) {
      console.error("Failed to load project:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !selectedObject) return;

    const newObject = {
      ...selectedObject,
      image: URL.createObjectURL(file), // Update image URL
      rawImage: file, // Keep raw image for uploading
    };

    // Update the sceneObjects array with the new object
    const updatedObjects = sceneObjects.map((obj) =>
      obj.id === selectedObject.id ? newObject : obj
    );

    setSceneObjects(updatedObjects);
    setSelectedObject(newObject);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        ...project,
        sceneObjects: sceneObjects.map(({  ...obj }) => obj),
      };

      // If there's an image, upload it
      const formData = new FormData();
      sceneObjects.forEach((obj) => {
        if (obj.rawImage) {
          formData.append("image", obj.rawImage, obj.rawImage.name);
        }
      });

      await API.put(`/projects/${projectId}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: formData,
      });
      alert("Project saved successfully!");
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  const generateQrCode = (projectData) => {
    const url = `${window.location.origin}/ar/${projectData._id}`;
    setQrCodeUrl(url);
  };

  const addEmptyObject = () => {
    const newObject = {
      id: Date.now(),
      type: "Image",
      position: { x: 0, y: 0, z: 0 },
    };
    setSceneObjects([...sceneObjects, newObject]);
    setSelectedObject(newObject);
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: themeColors.primaryDark }}>
      <ProjectEditorSidebar />

      <main className="flex-1 overflow-auto p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">{project?.name || "Project Editor"}</h2>

        {/* Scene Area */}
        <div
          className="w-full border-2 border-dashed rounded-lg mb-6 flex items-center justify-center relative"
          style={{
            minHeight: "300px",
            backgroundColor: themeColors.primaryPurple + "15",
            borderColor: themeColors.primaryPurple + "40",
          }}
        >
          {sceneObjects.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>No AR objects yet.</p>
              <button
                onClick={addEmptyObject}
                className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Add Image Object
              </button>
            </div>
          ) : (
            <div className="absolute inset-0 flex justify-center items-center flex-wrap gap-6">
              {sceneObjects.map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => setSelectedObject(obj)}
                  className={`p-3 rounded-lg cursor-pointer ${
                    selectedObject?.id === obj.id
                      ? "border-2 border-blue-500 bg-blue-500/20"
                      : "border border-transparent bg-blue-500/10"
                  }`}
                >
                  {obj.image ? (
                    <img
                      src={obj.image}  // Ensure this is the updated image URL
                      alt="AR"
                      className="w-32 h-32 object-contain rounded"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-800 flex items-center justify-center text-sm text-gray-400">
                      No Image
                    </div>
                  )}
                  <p className="text-center mt-2 text-sm">{obj.type}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Object Properties */}
        {selectedObject && (
          <div className="bg-[#1E293B] p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-3">Edit Object</h3>

            <label className="block mb-2 text-sm">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
            />

            <div className="grid grid-cols-3 gap-4">
              {["x", "y", "z"].map((axis) => (
                <div key={axis}>
                  <label className="block text-xs mb-1">
                    Position {axis.toUpperCase()}
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                    value={selectedObject.position[axis]}
                    onChange={(e) => {
                      const newPos = {
                        ...selectedObject.position,
                        [axis]: parseFloat(e.target.value) || 0,
                      };
                      const newObj = { ...selectedObject, position: newPos };
                      setSelectedObject(newObj);
                      setSceneObjects((prev) =>
                        prev.map((obj) =>
                          obj.id === newObj.id ? newObj : obj
                        )
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-green-600 rounded hover:bg-green-700"
          >
            {loading ? "Saving..." : "Save Project"}
          </button>

          {qrCodeUrl && (
            <div className="flex items-center gap-4">
              <QRCode value={qrCodeUrl} size={80} bgColor="#FFFFFF" fgColor="#000000" />
              <div className="text-sm text-gray-300">
                Scan to view AR on mobile
                <div className="text-xs text-blue-400 mt-1">{qrCodeUrl}</div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectEditor;
