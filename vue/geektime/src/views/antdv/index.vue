<template>
  <a-table
    :columns="columns"
    :data-source="data"
    class="components-table-demo-nested"
    :defaultExpandAllRows="false"
    :row-selection="rowSelection"
    :expandIconColumnIndex="expandIconColumnIndex"
    :expandIconAsCell="false"
  >
    <a slot="operation" slot-scope="text">Publish</a>
    <!-- <span slot="expandIcon">
      <a-badge status="success" />
    </span> -->
    <a-table
      slot="expandedRowRender"
      slot-scope="text"
      :columns="innerColumns"
      :data-source="innerData"
      :pagination="false"
    >
      <span slot="status" slot-scope="text">
        <a-badge status="success" />Finished
      </span>
      <span slot="operation" slot-scope="text" class="table-operation">
        <a>Pause</a>
        <a>Stop</a>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item> Action 1 </a-menu-item>
            <a-menu-item> Action 2 </a-menu-item>
          </a-menu>
          <a> More <a-icon type="down" /> </a>
        </a-dropdown>
      </span>
      <a-table
        slot="expandedRowRender"
        slot-scope="text"
        :columns="innerinnerColumns"
        :data-source="innerinnerData"
        :pagination="false"
      >
        <span slot="status" slot-scope="text">
          <a-badge status="success" />Finished
        </span>
        <span slot="operation" slot-scope="text" class="table-operation">
          <a>Pause</a>
          <a>Stop</a>
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item> Action 1 </a-menu-item>
              <a-menu-item> Action 2 </a-menu-item>
            </a-menu>
            <a> More <a-icon type="down" /> </a>
          </a-dropdown>
        </span>
      </a-table>
    </a-table>
  </a-table>
</template>
<script>
// import ArrowDown from "../../assets/arrow-down.svg?sprite";
const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Platform", dataIndex: "platform", key: "platform" },
  { title: "Version", dataIndex: "version", key: "version" },
  { title: "Upgraded", dataIndex: "upgradeNum", key: "upgradeNum" },
  { title: "Creator", dataIndex: "creator", key: "creator" },
  { title: "Date", dataIndex: "createdAt", key: "createdAt" },
  {
    title: "Action",
    key: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

const data = [];
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    name: "Screem",
    platform: "iOS",
    version: "10.3.4.5654",
    upgradeNum: 500,
    creator: "Jack",
    createdAt: "2014-12-24 23:12:00",
  });
}

const innerColumns = [
  // { title: "Date", dataIndex: "date", key: "date" },
  // { title: "Name", dataIndex: "name", key: "name" },
  {
    title: "Status",
    key: "state",
    width: 500,
    align: "right",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "Upgrade Status",
    width: 100,
    align: "center",
    dataIndex: "upgradeNum",
    key: "upgradeNum",
  },
  {
    title: "Action",
    dataIndex: "operation",
    width: 200,
    align: "center",
    key: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

const innerData = [];
for (let i = 0; i < 3; ++i) {
  innerData.push({
    key: i,
    date: "2014-12-24 23:12:00",
    name: "This is production name",
    upgradeNum: "Upgraded: 56",
  });
}

export default {
  // components: { ArrowDown },
  data() {
    return {
      data,
      columns,
      innerColumns,
      innerData,
      innerinnerColumns: [...innerColumns],
      innerinnerData: [...innerData],
    };
  },
  computed: {
    expandIconColumnIndex() {
      return this.columns.length;
    },
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: (record) => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name,
          },
        }),
      };
    },
  },
};
</script>
