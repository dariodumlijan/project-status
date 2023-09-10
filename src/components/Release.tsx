import ReactMarkdown from 'react-markdown';
import { useQuery } from 'react-query';
import { get } from 'lodash';
import { getReleaseNotes } from '../api';

function Release() {
  const {
    isLoading, isError, error, data,
  } = useQuery(['release'], getReleaseNotes);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error! {get(error, 'message', '')}</div>;

  return (
    <section className="release-wrapper">
      <h2>Latest release</h2>
      {data?.data.body && (
        <ReactMarkdown>{data.data.body}</ReactMarkdown>
      )}
    </section>
  );
}

export default Release;
