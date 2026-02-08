import React, { useEffect, useState } from "react";
import "../assets/remotejobs.css";
import Loader from "../components/Loader";

const RemotiveJobs = ({ category = "php" }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // Filter states
  const [countryFilter, setCountryFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const jobsPerPage = 20;
  const [selectedJob, setSelectedJob] = useState(null);
  const allCompanies = Array.from(
    new Set(jobs.map((job) => job.company_name).filter(Boolean))
  );

  // Filter companies by selected country
  const filteredCompanies = countryFilter
    ? Array.from(
        new Set(
          jobs
            .filter((job) => job.candidate_required_location === countryFilter)
            .map((job) => job.company_name)
            .filter(Boolean)
        )
      )
    : allCompanies;

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://remotive.com/api/remote-jobs?category=${category}`
        );
        const data = await response.json();
        setJobs(data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
        setCurrentPage(1);
        setCountryFilter("");
        setCompanyFilter("");
      }
    };
    fetchJobs();
  }, [category]);

  // Get unique countries and companies for filter dropdowns
  const countries = Array.from(
    new Set(jobs.map((job) => job.candidate_required_location).filter(Boolean))
  ).sort();

  const companies = Array.from(
    new Set(jobs.map((job) => job.company_name).filter(Boolean))
  ).sort();

  // Filter jobs based on filters
  const filteredJobs = jobs.filter((job) => {
    const matchesCountry = countryFilter
      ? job.candidate_required_location === countryFilter
      : true;
    const matchesCompany = companyFilter
      ? job.company_name === companyFilter
      : true;
    return matchesCountry && matchesCompany;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Modal handlers
  const openModal = (job) => setSelectedJob(job);
  const closeModal = () => setSelectedJob(null);

  // Pagination handlers
  const goToPage = (page) => setCurrentPage(page);
  const goToNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 text-capitalize">
        Remote {category.replace("-", " ")} Jobs
      </h2>

      {/* Filter dropdowns */}

      {loading ? (
        <p className="text-center">
          <Loader />
          Loading jobs...
        </p>
      ) : currentJobs.length === 0 ? (
        <p className="text-center text-muted">No jobs found.</p>
      ) : (
        <>
          <div className="row mb-3">
            <div className="col-12 col-md-6 mb-2 mb-md-0">
              <select
                value={countryFilter}
                onChange={(e) => {
                  setCountryFilter(e.target.value);
                  setCompanyFilter(""); // reset company filter when country changes
                  setCurrentPage(1);
                }}
                className="form-select"
                aria-label="Filter by country"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6">
              <select
                value={companyFilter}
                onChange={(e) => {
                  setCompanyFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="form-select"
                aria-label="Filter by company"
              >
                <option value="">All Companies</option>
                {filteredCompanies.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {currentJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <div>
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-info">
                    <strong>Category:</strong> {job.category}
                  </p>
                  <p className="job-info">
                    <strong>Job Type:</strong> {job.job_type}
                  </p>
                  <p className="job-info">
                    📅 {new Date(job.publication_date).toLocaleDateString()}
                  </p>
                  <p className="job-info">
                    🌎 {job.candidate_required_location}
                  </p>
                  <p className="job-info">
                    <strong>Salary:</strong> {job.salary || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="card-buttons">
                <button className="details-btn" onClick={() => openModal(job)}>
                  View Details
                </button>
              </div>
            </div>
          ))}

          {/* Modal */}
{selectedJob && (
  <div className="modal-overlay" onClick={closeModal}>
    <div
      className="modal-content slide-in-right"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        className="close-modal"
        onClick={closeModal}
        aria-label="Close modal"
      >
        ×
      </button>
      <h3 id="modal-title">{selectedJob.title}</h3>
      <p>
        <strong>Company:</strong> {selectedJob.company_name}
      </p>
      <p>
        <strong>Category:</strong> {selectedJob.category}
      </p>
      <p>
        <strong>Type:</strong> {selectedJob.job_type}
      </p>
      <p>
        <strong>Location:</strong> {selectedJob.candidate_required_location}
      </p>
      <p>
        <strong>Salary:</strong> {selectedJob.salary || "Not specified"}
      </p>
      <p>
        <strong>Posted:</strong> {new Date(selectedJob.publication_date).toLocaleDateString()}
      </p>
      <div
        className="modal-description"
        style={{ textAlign: "justify" }}
        dangerouslySetInnerHTML={{ __html: selectedJob.description }}
      />
      {/* Apply Job Button */}
      {selectedJob.url && (
        <div className="apply-job-container">
  <a
    href={selectedJob.url}
    target="_blank"
    rel="noopener noreferrer"
    className="apply-job-button"
    aria-label={`Apply for ${selectedJob.title} job`}
  >
    Apply Job
  </a>
</div>
      )}
    </div>
  </div>
)}


          {/* Pagination */}
          <nav>
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button className="page-link" onClick={() => goToPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default RemotiveJobs;
