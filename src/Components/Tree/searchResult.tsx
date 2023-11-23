import "./searchResult.css";
import { NodeType } from "../../types";
import OrgchartIcon from "../SvgIcons/orgchart";
import ArrowDownIcon from "../SvgIcons/arrow-down";
import ArrowUpIcon from "../SvgIcons/arrow-up";
interface Props {
  items: NodeType[];
  searchResultVisible: boolean;
  setSearchResultVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchResult({
  items,
  searchResultVisible,
  setSearchResultVisible,
}: Props) {
  return (
    <div className="search-result">
      <div
        className="search-result-trigger-button"
        onClick={() => setSearchResultVisible((oldValue) => !oldValue)}
      >
        {searchResultVisible ? <ArrowDownIcon /> : <ArrowUpIcon />}
      </div>
      {searchResultVisible && (
        <div className="search-result-box">
          {items.map((item) => (
            <div className="search-result-item">
              <div>{item.title}</div>
              <div className="search-result-item-icon">
                <OrgchartIcon />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default SearchResult;
