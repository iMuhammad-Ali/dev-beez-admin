import React, { useMemo, useState, useEffect } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import { SearchIcon } from "../../icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteClient } from "../../store/clientThunk";
import { setFilter } from "../../store/clientSlice";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Badge,
  Button,
  Input,
} from "@windmill/react-ui";
import Modals from "../../pages/Modals";

function ScheduleCall({ filteredData = [], onLoadMore }) {
  const dispatch = useDispatch();
  const filter = useSelector((s) => s.client.filter || "all");
  const meta = useSelector((s) => s.client.meta.schedule_calls);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const truncate = (t, n = 8) => {
    if (!t && t !== 0) return "—";
    const s = String(t);
    return s.length > n ? s.slice(0, n) + "..." : s;
  };
  const [selectedUser, setSelectedUser] = useState(null);
  const [modelMode, setModelMode] = useState(null);

  const resultsPerPage = 10;
  const totalResults = filteredData.length;

  // visible count for "Load more"
  const [visibleCount, setVisibleCount] = useState(resultsPerPage);

  const visibleData = useMemo(
    () => filteredData.slice(0, visibleCount),
    [filteredData, visibleCount]
  );

  function openModal(user, mode) {
    setSelectedUser(user);
    setModelMode(mode);
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
    setSelectedUser(null);
  }

  const fmtDate = (d) => {
    if (!d) return "—";
    const date = typeof d?.toDate === "function" ? d.toDate() : new Date(d);
    return isNaN(date) ? "—" : date.toLocaleDateString();
  };

  const getMoreData = () => {
    setLoading(true);
    onLoadMore();
    setVisibleCount((c) => c + resultsPerPage);
    setLoading(false);
  };

  return (
    <>
      <PageTitle>Schedule Call</PageTitle>

      <div className="flex items-center mb-2 space-x-2">
        <div className="relative flex-1 focus-within:text-purple-500">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="pl-8 text-gray-700"
            placeholder="Search for projects"
            aria-label="Search"
          />
        </div>
        <div>
          <select
            className="form-select block w-40 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm leading-5 text-gray-700"
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
            aria-label="Filter clients"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>

          <TableBody>
            {visibleData.map((user, i) => {
              const firstFile =
                Array.isArray(user.attachments) && user.attachments[0];
              const status = (user.status || "PENDING").toString();
              return (
                <TableRow key={user.id || i} className="hover:bg-gray-100">
                  <TableCell>
                    <p className="font-semibold">{user.fullName || "—"}</p>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.email || "—"}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.phoneNumber || "—"}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {truncate(user.projectDetails, 10)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {firstFile ? (
                      <a
                        className="text-sm underline"
                        href={firstFile.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {truncate(firstFile.name, 10)}
                      </a>
                    ) : (
                      <span className="text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge type={status === "PENDING" ? "warning" : "success"}>
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{fmtDate(user.createdAt)}</span>
                  </TableCell>
                  <TableCell className="flex items-center space-x-2">
                    <Button
                      size="small"
                      onClick={() => openModal(user, "detail")}
                    >
                      Detail
                    </Button>
                    <Button
                      size="small"
                      aria-label="Delete"
                      style={{ backgroundColor: "#ef4444" }}
                      className="text-white hover:bg-red-600"
                      onClick={() => openModal(user, "delete")}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <TableFooter>
          <div className="w-full flex justify-center py-4">
            <Button
              size="small"
              disabled={loading || !meta.hasMore}
              onClick={() => getMoreData()}
            >
              {loading ? "Loading..." : meta.hasMore ? "Load more" : "No more"}
            </Button>
          </div>
        </TableFooter>
      </TableContainer>

      <Modals
        isOpen={isModalOpen}
        onClose={closeModal}
        header={modelMode === "delete" ? "Delete Entry" : "Entry Details"}
        body={
          modelMode === "delete" ? (
            <div>
              <p>
                Are you sure you want to delete{" "}
                <strong>{selectedUser?.fullName}</strong>?
              </p>
            </div>
          ) : selectedUser ? (
            <div className=" grid grid-cols-1 md:grid-cols-2">
              <div>
                {" "}
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">
                    {selectedUser.fullName || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-gray-700">
                    {selectedUser.email || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm text-gray-700">
                    {selectedUser.phoneNumber || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Company</p>
                  <p className="text-sm text-gray-700">
                    {selectedUser.companyName || "—"}
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <p className="text-xs text-gray-500">Message</p>
                  <pre className="whitespace-pre-wrap break-words break-all text-sm text-gray-800 bg-gray-50 p-2 rounded">
                    {selectedUser.projectDetails || "—"}
                  </pre>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <Badge
                    type={
                      selectedUser.status === "PENDING" ? "warning" : "success"
                    }
                  >
                    {selectedUser.status || "—"}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm text-gray-700">
                    {fmtDate(selectedUser.createdAt)}
                  </p>
                </div>

                {selectedUser.attachments &&
                  selectedUser.attachments.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500">Attachments</p>
                      <ul className="mt-1 space-y-1">
                        {selectedUser.attachments.map((a, idx) => (
                          <li key={idx}>
                            <a
                              href={a.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-blue-600 underline"
                            >
                              {a.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          ) : (
            <div>No details</div>
          )
        }
        mode={modelMode}
        onConfirm={async () => {
          if (selectedUser) {
            // delete from schedule_calls
            await dispatch(
              deleteClient({ table: "schedule_calls", id: selectedUser.id })
            );
            closeModal();
            // keep visibleCount valid after deletion
            const newTotal = filteredData.length - 1;
            if (visibleCount > newTotal) {
              setVisibleCount(Math.max(resultsPerPage, newTotal));
            }
          } else {
            closeModal();
          }
        }}
      />
    </>
  );
}

export default ScheduleCall;
