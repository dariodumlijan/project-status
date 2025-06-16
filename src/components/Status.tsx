import { get } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import ErrorMessage from './ErrorMessage';
import { getStatusSummary } from '../api';
import text from "../locales/default.json"
import { IconActivity } from '@tabler/icons-react';

function Status() {
  const {
    isLoading, isError, error, data,
  } = useQuery({ queryKey: ['status'], queryFn: getStatusSummary });
  const response = get(data, "data");
  const body = get(response, 'body')

  return (
    <section id="status" className="status-wrapper">
      <div className="content">
        <div className="header">
          <h2 className="title">
            <IconActivity className="icon" />
            {text.status.title}
          </h2>
          {response && (
            <span className="timestamp">
              {text.status.timestamp}{" "}
              {response.updated_at && new Date(response.updated_at).toLocaleString()}
            </span>
          )}
        </div>

        {isLoading && <p>{text.loading.message}</p>}
        {isError && <ErrorMessage error={error} />}
        {body && <ReactMarkdown>{body}</ReactMarkdown>}
      </div>
    </section>
  );
}

export default Status;
