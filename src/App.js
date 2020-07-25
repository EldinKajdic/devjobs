import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import { Container, Spinner } from 'react-bootstrap';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }

  return (
    <Container className="my-4">
      <h1>Developer jobs</h1>
      <h2 className="mb-4">Search for developer jobs all around the world</h2>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination
        page={page}
        setPage={setPage}
        hasNextPage={hasNextPage}
        display={jobs.length > 0 && !loading}
      />
      {loading && (
        <div className="text-center">
          <h1>Loading...</h1>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && <h1>Error. Try refreshing.</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
      <JobsPagination
        page={page}
        setPage={setPage}
        hasNextPage={hasNextPage}
        loading={loading}
        display={jobs.length > 0 && !loading}
      />
    </Container>
  );
}

export default App;
