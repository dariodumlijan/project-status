import ReactMarkdown from 'react-markdown';
import { useQuery } from '@tanstack/react-query';
import ErrorMessage from './ErrorMessage';
import { getReleaseNotes } from '../api';

function Release() {
  const {
    isLoading, isError, error, data,
  } = useQuery({ queryKey: ['release'], queryFn: getReleaseNotes });

  return (
    <section className="card-wrapper release-wrapper">
      <h2 className="title">Latest release</h2>
      <div className="content">
        {isLoading && (<p>Loading...</p>)}
        {isError && (<ErrorMessage error={error} />)}
        {data?.data.body && (<ReactMarkdown>{data.data.body}</ReactMarkdown>)}
      </div>
    </section>
  );
}

export default Release;
