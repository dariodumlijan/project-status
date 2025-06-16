import { lowerCase, map } from "lodash";
import { RoadmapColumn as RoadmapColumnType } from "../../api";

function RoadmapColumn(props: RoadmapColumnType) {
  return (
    <div className="row" data-color={lowerCase(props.color)}>
      <h3 className="title">{props.name}</h3>
      {map(props.items, (item) => (
        <div key={item.id} className="card">
          <span className="label">{item.title}</span>
        </div>
      ))}
    </div>
  );
}

export default RoadmapColumn;