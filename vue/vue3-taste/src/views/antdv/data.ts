import { ColumnsType } from "ant-design-vue/lib/vc-table/interface";

export interface DataSource {
  name: string;
  age: number;
}

export const dataSource: DataSource[] = Array.from(
  { length: 10 },
  (_, i) => i
).map(() => ({
  name: `name_${Math.random()}`,
  age: Math.random(),
}));
export const columns: ColumnsType<DataSource> = [
  { title: "name", dataIndex: "name" },
  {
    title: "age",
    dataIndex: "age",
    customRender: ({ text, record }) => {
      return `${record.name}'s age is ${text}`;
    },
  },
];
