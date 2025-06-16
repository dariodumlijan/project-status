import { get, isEmpty, map } from "lodash";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "../elements/ErrorMessage";
import RoadmapColumn from "../elements/RoadmapColumn";
import { getRoadmap, RoadmapColumn as RoadmapColumnType } from "../../api";
import text from "../../locales/default.json"

function Roadmap() {
  const {
    isLoading, isError, error, data,
  } = useQuery({ queryKey: ['roadmap'], queryFn: getRoadmap });
  const response: RoadmapColumnType[] = get(data, "data", []);

  return (
    <section id="roadmap" className="roadmap-wrapper">
      <h2 className="title">{text.roadmap.title}</h2>
      <div className="grid-wrapper">
        {isEmpty(response) ? (
          <div className="card">
            {isLoading && <p>{text.loading.message}</p>}
            {isError && <ErrorMessage error={error} />}
          </div>
        ) : (
          map(response, (column) => (
            <RoadmapColumn key={column.id} {...column} />
          ))
        )}
      </div>
    </section>
  );
}

export default Roadmap;