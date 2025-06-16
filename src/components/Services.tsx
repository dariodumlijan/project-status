import { first, get, isEmpty, map } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import ErrorMessage from './ErrorMessage';
import ServiceState from './ServiceState';
import { getStatusServices } from '../api';
import text from "../locales/default.json"

function Services() {
  const {
    isLoading, isError, error, data,
  } = useQuery({ queryKey: ['services'], queryFn: getStatusServices });
  const response = get(data, "data", []);

  return (
    <section id="services" className="services-wrapper">
      <h2 className="title">{text.services.title}</h2>
      <div className="grid-wrapper">
        {isEmpty(response) ? (
          <div className="content">
            {isLoading && <p>{text.loading.message}</p>}
            {isError && <ErrorMessage error={error} />}
          </div>
        ) : (
          map(response, (service) => {
            const label = first(service.labels)

            return (
              <div key={service.id} className="content" title={label?.name}>
                <ServiceState label={label} />
                <h3 className="title">{service.title}</h3>
              </div>
            )
          })
        )}
      </div>
    </section>
  );
}

export default Services;
