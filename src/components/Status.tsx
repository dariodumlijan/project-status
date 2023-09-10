import ReactMarkdown from 'react-markdown';
import { useQuery } from 'react-query';
import { get } from 'lodash';
import { getStatus } from '../api';

function Status() {
  const {
    isLoading, isError, error, data,
  } = useQuery(['status'], getStatus);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error! {get(error, 'message', '')}</div>;

  return (
    <section className="status-wrapper">
      <h2>Current status</h2>
      {data?.data.body && (
        <ReactMarkdown>{data.data.body}</ReactMarkdown>
      )}
    </section>
  );
}

export default Status;
