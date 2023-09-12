import ReactMarkdown from 'react-markdown';
import { useQuery } from '@tanstack/react-query';
import ErrorMessage from './ErrorMessage';
import { getStatus } from '../api';

function Status() {
  const {
    isLoading, isError, error, data,
  } = useQuery({ queryKey: ['status'], queryFn: getStatus });

  return (
    <section className="card-wrapper status-wrapper">
      <h2 className="title">Current status</h2>
      <div className="content">
        {isLoading && (<p>Loading...</p>)}
        {isError && (<ErrorMessage error={error} />)}
        {data?.data.body && (<ReactMarkdown>{data.data.body}</ReactMarkdown>)}
      </div>
    </section>
  );
}

export default Status;
