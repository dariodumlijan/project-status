import { get } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import ErrorMessage from '../elements/ErrorMessage';
import { getReleaseNotes } from '../../api';
import text from "../../locales/default.json"

function Release() {
  const {
    isLoading, isError, error, data,
  } = useQuery({ queryKey: ['release'], queryFn: getReleaseNotes });
  const response = get(data, "data");
  const body = get(response, 'body')

  return (
    <section id="release" className="release-wrapper">
      <h2 className="title">{text.release.title}</h2>
      {response && (
        <span className="timestamp">
          {text.release.timestamp}{" "}
          {response.published_at &&
            new Date(response.published_at).toLocaleString()}
        </span>
      )}
      <div className="card">
        {isLoading && <p>{text.loading.message}</p>}
        {isError && <ErrorMessage error={error} />}
        {body && <ReactMarkdown>{body}</ReactMarkdown>}
      </div>
    </section>
  );
}

export default Release;
