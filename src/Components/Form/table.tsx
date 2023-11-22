import "./table.css"
type Props = {};

const headers = [
  {
    id: 1,
    title: "عملیات",
    width: "20%",
  },
  {
    id: 1,
    title: "پیش فرض",
    width: "25%",
  },
  {
    id: 1,
    title: "کد",
    width: "55%",
  },
];

const Table = (props: Props) => {
  return (
    <div className="table">
      <div className="table-header">
        {headers.map((item) => (
          <div className="table-header-item" style={{ width: item.width }}>
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
