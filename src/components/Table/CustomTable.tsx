import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface ColumnMeta {
  field: string;
  header: string;
}

export default function CustomTable({ data, columns }: { data: any[] , columns: ColumnMeta[] }) {

  return (
    <div className="card">
      <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
        {columns.map((col, i) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}
      </DataTable>
    </div>
  );
}
