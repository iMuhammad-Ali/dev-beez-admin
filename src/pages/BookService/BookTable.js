import React, { useState, useEffect } from "react";

// import CTA from "../components/CTA";
import InfoCard from "../../components/Cards/InfoCard";
import ChartCard from "../../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../../components/Chart/ChartLegend";
import PageTitle from "../../components/Typography/PageTitle";
import { SearchIcon } from "../../icons";
import RoundIcon from "../../components/RoundIcon";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, deleteClient } from "../../store/clientThunk";
import data from "../../utils/demo/tableData";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Button,
  Input,
} from "@windmill/react-ui";
import { setFilter } from "../../store/clientSlice";
import Modals from "../../pages/Modals";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../../utils/demo/chartsData";

function BookService() {
  const [page, setPage] = useState(1);
  const clients = useSelector((s) => s.client.items || []);
  const filter = useSelector((s) => s.client.filter || "all");
  const [dataa, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modelMode, setModelMode] = useState(null); // "detail" or "delete"
  const dispatch = useDispatch();

  function openModal(user, mode) {
    setSelectedUser(user);
    setModelMode(mode);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedUser(null);
  }

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = clients.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(clients.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page, clients]);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);
  return (
    <>
      <PageTitle>Book Service</PageTitle>

      {/* <CTA /> */}

      {/* <!-- Cards --> */}
      {/* <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total clients" value="6389">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Account balance" value="$ 46,760.89">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="New sales" value="376">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending contacts" value="35">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div> */}
      {/* <!-- Search input + Filter --> */}
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
              <TableCell>Message</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data
              .slice((page - 1) * resultsPerPage, page * resultsPerPage)
              .map((user, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">{user.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">$ {user.amount}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">$ {user.amount}</span>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(user.date).toLocaleDateString()}
                    </span>
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
              ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

      {/* Controlled modal for user details */}
      <Modals
        isOpen={isModalOpen}
        onClose={closeModal}
        header={modelMode === "delete" ? "Delete User" : "User Details"}
        body={
          modelMode === "delete" ? (
            <div>
              <p>
                Are you sure you want to delete{" "}
                <strong>{selectedUser?.name}</strong>?
              </p>
            </div>
          ) : selectedUser ? (
            <div>
              <p className="font-medium">Job: {selectedUser.job}</p>
              <p>Amount: $ {selectedUser.amount}</p>
              <p>Status: {selectedUser.status}</p>
              <p>Date: {new Date(selectedUser.date).toLocaleDateString()}</p>
            </div>
          ) : (
            <div>No details</div>
          )
        }
        mode={modelMode}
        onConfirm={async () => {
          if (modelMode === "delete" && selectedUser) {
            await dispatch(deleteClient(selectedUser.id));
            closeModal();
            // ensure page index stays valid
            if ((page - 1) * resultsPerPage >= clients.length - 1 && page > 1) {
              setPage((p) => p - 1);
            }
          } else {
            closeModal();
          }
        }}
      />

      <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
    </>
  );
}

export default BookService;
