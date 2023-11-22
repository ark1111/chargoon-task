import "./index.css";

interface ActionType {
  title: string;
  handler: () => void;
}

interface Props {
  actions: ActionType[];
}

function ActionBar({ actions }: Props) {
  return (
    <div className="actionbar">
      {actions.map((item, index) => (
        <button
          key={item.title}
          className="actionbar-button"
          onClick={item.handler}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
}
export default ActionBar;
