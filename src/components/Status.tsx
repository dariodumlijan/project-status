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
    <section className="card-wrapper status-wrapper">
      <h2 className="title">Current status</h2>
      <div className="content">
        {data?.data.body && (
        <ReactMarkdown>{data.data.body}</ReactMarkdown>
        )}
      </div>
    </section>
  );
}

export default Status;
