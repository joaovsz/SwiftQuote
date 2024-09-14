import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface ColumnMeta {
  field: string;
  header: string;
}

export default function CustomTable({
  data,
  columns,
  block,
  actionTemplate,
}: {
  data: any[];
  block?: boolean;
  actionTemplate?: (rowData: any) => JSX.Element;
  columns: ColumnMeta[];
}) {
  return (
    <div className="card" style={{ maxHeight: "70vh" }}>
      <DataTable
        value={data}
        scrollHeight="70vh"
        style={{}}
        tableStyle={{ minWidth: "50rem", maxHeight: "100%" }}
      >
        {columns.map((col, i) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}
        {block && <Column field={""} body={actionTemplate} style={{ width: "3rem" }} />}
      </DataTable>
    </div>
  );
}
