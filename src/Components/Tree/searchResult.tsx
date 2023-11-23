import "./searchResult.css";
import { NodeType } from "../../types";
import OrgchartIcon from "../SvgIcons/orgchart";
interface Props {
  items: NodeType[];
}

function SearchResult({ items }: Props) {
  return (
    <div className="search-result" style={{ height: 200, overflow: "auto" }}>
      {items.map((item) => (
        <div className="search-result-item">
          <div>{item.title}</div>
          <div className="search-result-item-icon">
            <OrgchartIcon />
          </div>
        </div>
      ))}
    </div>
  );
}
export default SearchResult;
