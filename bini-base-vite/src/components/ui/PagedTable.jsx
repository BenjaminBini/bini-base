import { DataTable } from "mantine-datatable";
import { Group, Pagination, Text } from "@mantine/core";
import { useState } from "react";

export default function PagedTable({
  getQuery,
  columns,
  selectedRecords,
  setSelectedRecords,
  initialDelta = 10,
  onRowClick,
}) {
  const [activePage, setActivePage] = useState(1);
  const [delta, setDelta] = useState(initialDelta);
  const { data: response, status } = getQuery(activePage - 1, delta);
  return (
    <>
      <DataTable
        fetching={status === "loading"}
        loaderBackgroundBlur={3}
        withBorder
        borderRadius="sm"
        striped
        noRecordsText="No users found"
        minHeight={
          response?.data?.length === 0 || status === "loading" ? 150 : 0
        }
        highlightOnHover
        records={response?.data}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        onRowClick={onRowClick}
        columns={columns}
      />
      {response?.pagesCount > 1 && (
        <Group position="right">
          <Text size="sm">{response?.count} items</Text>
          <Pagination
            value={activePage}
            onChange={setActivePage}
            total={response?.pagesCount}
          />
        </Group>
      )}
    </>
  );
}
