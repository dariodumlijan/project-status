import { get, toString } from 'lodash';

type Props = {
  error: Error | unknown,
};

function ErrorMessage(props: Props) {
  return (
    <p className="error-report">
      {toString(get(props.error, 'status', ''))} - {toString(get(props.error, 'message', ''))}
    </p>
  );
}

export default ErrorMessage;
