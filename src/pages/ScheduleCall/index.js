import React, { useEffect, useMemo } from "react";
import ScheduleCall from "./ScheduleTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../../store/clientThunk";

const Schedule_Call = () => {
  const scheduleCallData = useSelector((s) => s.client.schedule_calls);
  const filter = useSelector((s) => s.client.filter || "all");
  const cursor = useSelector((s) => s.client.meta?.schedule_calls?.cursor);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!scheduleCallData.length) {
      dispatch(fetchClients({ table: "schedule_calls" }));
    }
  }, [dispatch, scheduleCallData.length, filter]);

  const filteredData = useMemo(() => {
    if (filter === "completed")
      return scheduleCallData.filter((x) => x.status === "COMPLETED");
    if (filter === "pending")
      return scheduleCallData.filter(
        (x) => !x.status || x.status === "PENDING"
      );
    return scheduleCallData; // "all"
  }, [scheduleCallData, filter]);

  const onLoadMore = () => {
    dispatch(
      fetchClients({
        table: "schedule_calls",
        pageSize: 10,
        cursor,
      })
    );
  };

  return <ScheduleCall filteredData={filteredData} onLoadMore={onLoadMore} />;
};

export default Schedule_Call;
