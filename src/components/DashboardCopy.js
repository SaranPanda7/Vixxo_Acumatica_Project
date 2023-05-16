import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import jwt_decode from "jwt-decode";
import RefreshIcon from "@mui/icons-material/Refresh";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
const inlineCSS = `
    table.table-border >thead >tr>th,
    table.table-border >thead >tr>td,
    table.table-border >tbody >tr>th,
    table.table-border >tbody >tr>td {
        border: 1px solid #ddd;
    }
`;
const Dashboard = () => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("access")
      ? jwt_decode(localStorage.getItem("access"))
      : null
  );

  const [authtoken, setAuthtoken] = useState(() =>
    localStorage.getItem("access") ? localStorage.getItem("access") : null
  );

  const [dashboardData, setDashboardData] = useState([]);

  console.log(dashboardData);

  const [open, setOpen] = useState({});
  console.log(open);

  const [refresh, setRefresh] = useState({});
  console.log(refresh);

  const getDashboardData = async () => {
    let response = await axios.get("http://192.168.75.203:8000/dashboard/", {
      headers: {
        Authorization: `Bearer ${authtoken}`,

        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setDashboardData(response.data);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const [serviceId, setServiceId] = useState("");

  console.log(serviceId);

  const [serviceReqData, setServiceReqData] = useState();

  console.log(serviceReqData);

  const getServiceRequestData = async () => {
    let response = await axios.get(
      `http://192.168.75.203:8000/dashboard_sub_data/${serviceId}`,
      {
        headers: {
          Authorization: `Bearer ${authtoken}`,

          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log(response.data);
      setServiceReqData(response.data);
    }
  };
  useEffect(() => {
    if (serviceId) {
      getServiceRequestData();
    }
  }, [serviceId]);

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 10) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "   read more..." : "   ...show less"}
        </span>
      </p>
    );
  };

  return (
    <>
      <style>{inlineCSS}</style>
      <div class="scrollmenu">
        <Table className="table table-bordered table-striped-2" size="large">
          <TableHead>
            <TableRow>
              <TableCell className="text" component="th">
                Expand
              </TableCell>
              <TableCell className="text" component="th">
                Accumatica SR
              </TableCell>
              <TableCell className="text" component="th">
                Vixxo Service Id
              </TableCell>
              <TableCell component="th">RFS State</TableCell>
              <TableCell component="th">Required Arrival Time</TableCell>
              <TableCell component="th">Target Completion Date</TableCell>
              <TableCell component="th">Service Need</TableCell>
              <TableCell component="th">Service Level</TableCell>
              <TableCell component="th">Root Cause</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dashboardData.map((req) => (
              <>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      data-csstooltip="Acumitica & Vixxo Update"
                      onClick={() => {
                        setOpen((prev) => ({
                          ...prev,
                          [req.a_id]: !prev[req.a_id],
                        }));

                        setServiceId(req.a_id);
                        // setServiceReqData("")
                      }}
                          // onClick={() => {
                          //   setOpen((prev) => ({
                          //     ...prev,
                          //     if(dashboardData.a_id === dashboardData.a_id){
                          //       [req.a_id expanded]: !prev[req.a_id expanded];
                          //     }else{
                          //       req.a_id = false;
                          //     }
                          //     return setServiceId(req.a_id)
                          //   }))
                          // }}
                    >
                      {open[req.a_id] ? (
                        <RemoveCircleOutlineIcon />
                      ) : (
                        <AddCircleOutlineIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{req.serviceordernbr}</TableCell>
                  <TableCell>{req.v.service_request}</TableCell>
                  <TableCell>{req.v.rfs_state}</TableCell>
                  <TableCell>{req.v.target_completion_date}</TableCell>
                  <TableCell>{req.v.required_arrival_time}</TableCell>
                  <TableCell>{req.v.service_need}</TableCell>
                  <TableCell>{req.v.service_level}</TableCell>
                  <TableCell>{req.v.root_cause}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={10}
                  >
                    <Collapse in={open[req.a_id]} timeout="auto" unmountOnExit>
                      {open[req.a_id] && (
                        <Box sx={{ margin: 1 }}>
                          <div className="">
                            <TableContainer component={Paper}>
                              <Table aria-label="simple table table-border">
                                <TableHead>
                                  <TableRow>
                                    <TableCell rowSpan={2} align="center">
                                      Action
                                    </TableCell>
                                    <TableCell rowSpan={2} align="center">
                                      Appointment
                                    </TableCell>
                                    <TableCell rowSpan={2} align="center">
                                      ETA
                                    </TableCell>
                                    <TableCell align="center" colSpan={2}>
                                      CHECK-IN
                                    </TableCell>
                                    <TableCell align="center" colSpan={2}>
                                      CHECK-OUT
                                    </TableCell>
                                    <TableCell rowSpan={2} align="center">
                                      NOTES
                                    </TableCell>
                                    <TableCell rowSpan={2} align="center">
                                      IS JOB COMPLETE
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="center">
                                      LONGITUDE
                                    </TableCell>
                                    <TableCell align="center">
                                      LATITUDE
                                    </TableCell>
                                    <TableCell align="center">
                                      LONGITUDE
                                    </TableCell>
                                    <TableCell align="center">
                                      LATITUDE
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {serviceReqData ? (
                                    <TableRow>
                                      <TableCell align="center">
                                        <IconButton
                                          aria-label="expand row"
                                          size="small"
                                          data-csstooltip="Acumitica & Vixxo Update"
                                          onClick={() => {
                                            setRefresh((prev) => ({
                                              ...prev,
                                              [req.a_id]: !prev[req.a_id],
                                            }));

                                            setServiceId(req.a_id);
                                            // setServiceReqData("")
                                          }}
                                        >
                                          {refresh[req.a_id] ? (
                                            <RefreshIcon />
                                          ) : (
                                            <RefreshIcon />
                                          )}
                                        </IconButton>
                                      </TableCell>

                                      <TableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                      >
                                        {req.serviceordernbr}
                                      </TableCell>
                                      <TableCell align="center">
                                        {serviceReqData.eta}
                                      </TableCell>
                                      <TableCell align="center">
                                        {serviceReqData.longitudestart}
                                      </TableCell>
                                      <TableCell align="center">
                                        {serviceReqData.latitudestart}
                                      </TableCell>
                                      <TableCell align="center">
                                        {serviceReqData.longitudeend}
                                      </TableCell>
                                      <TableCell align="center">
                                        {serviceReqData.latitudeend}
                                      </TableCell>
                                      <TableCell align="center">
                                        {serviceReqData.notes}
                                      </TableCell>
                                      <TableCell align="center">
                                        {serviceReqData.isjobcomplete}
                                      </TableCell>
                                    </TableRow>
                                  ) : (
                                    <h3>No Data Found</h3>
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </Box>
                      )}
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Dashboard;
