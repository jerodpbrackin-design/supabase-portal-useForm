import React from "react";
import { useForm } from "react-hook-form";
import "./SupabaseForm.css";
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const baseUrl = import.meta.env.VITE_SUPABASE_URL;

export const SupabaseForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { isPublic: false, priorityLevel: "Medium" },
  });

  const onSubmit = async (data) => {
    try {
      const fetchUrl = baseUrl.endsWith("/")
        ? `${baseUrl}projects`
        : `${baseUrl}/projects`;

      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Project Submitted Successfully!");
        reset();
      } else {
        const errorData = await response.json();
        console.error("Supabase Error:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="portal-container">
      <header className="portal-header">
        <h1 className="portal-title">PROJECT ENTRY PORTAL</h1>
        <p className="portal-subtitle">
          Secure deployment data entry for Supabase
        </p>
      </header>
      <div style={{ display: "flex", borderRadius: "10px" }}>
        <div className="form-card">
          <form onSubmit={handleSubmit(onSubmit)} className="project-form">
            <div className="form-group">
              <label>Project Name</label>
              <input
                {...register("projectName", {
                  required: "Required",
                  minLength: 5,
                })}
                className={errors.projectName ? "error-input" : ""}
                placeholder="Internal Tooling"
              />
              {errors.projectName && (
                <span className="error-text">Min 5 characters</span>
              )}
            </div>

            <div className="form-group">
              <label>Developer Email</label>
              <input
                type="email"
                {...register("developerEmail", { required: true })}
                placeholder="dev@company.com"
              />
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select {...register("priorityLevel")}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Deployment Date</label>
              <input
                type="date"
                {...register("deploymentDate", { required: true })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="versionNumber">Version Number</label>
              <input
                id="versionNumber"
                type="number"
                step="0.1"
                {...register("versionNumber", {
                  required: "Version is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Must be greater than 0" },
                })}
                placeholder="0.1"
              />
              {errors.versionNumber && (
                <span className="error-text">
                  {errors.versionNumber.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Repo URL</label>
              <input
                type="url"
                {...register("repositoryUrl", { required: true })}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="teamLead">Team Lead</label>
              <input
                id="teamLead"
                placeholder="Fernando"
                {...register("teamLead", { required: true })}
              />
              {errors.teamLead && <span className="error-text">Required</span>}
            </div>
            <div className="form-group">
              <label>Budget Code</label>
              <input
                type="password"
                {...register("budgetCode", { maxLength: 8 })}
                placeholder="Max 8 chars"
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                {...register("description", { maxLength: 200 })}
                rows="3"
                placeholder="Project details..."
              />
            </div>

            <div className="checkbox-group">
              <input type="checkbox" {...register("isPublic")} id="isPublic" />
              <label htmlFor="isPublic">Public Project Visibility</label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? "SYNCING..." : "SUBMIT PROJECT"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupabaseForm;
