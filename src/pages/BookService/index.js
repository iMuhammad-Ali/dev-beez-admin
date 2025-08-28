import BookService from "./BookTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../../store/clientThunk";
import { useEffect, useMemo } from "react";

const Book_Service = () => {
  const bookServiceData = useSelector((s) => s.client.book_services);
  const filter = useSelector((s) => s.client.filter);
  const cursor = useSelector((s) => s.client.meta?.book_services?.cursor);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!bookServiceData.length) {
      dispatch(fetchClients({ table: "book_services", status: "PENDING" }));
    }
  }, [dispatch, bookServiceData.length]);

  console.log(bookServiceData);

  const filteredData = useMemo(() => {
    if (filter === "completed") {
      return bookServiceData.filter((x) => x.status === "COMPLETED");
    }
    if (filter === "pending") {
      return bookServiceData.filter((x) => x.status === "PENDING");
    }
    return bookServiceData; // "all"
  }, [bookServiceData, filter]);
  const onLoadMore = () => {
    dispatch(
      fetchClients({
        table: "book_services",
        status: "PENDING",
        cursor,
      })
    );
  };
  return <BookService filteredData={filteredData} onLoadMore={onLoadMore} />;
};

export default Book_Service;
