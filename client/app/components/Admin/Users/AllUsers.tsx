import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { ImCross } from "react-icons/im";
import { useTheme } from "next-themes";

import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { MdMarkEmailRead } from "react-icons/md";
import { styles } from "@/app/styles/styles";

import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation();
  const [updateUserRole, { isSuccess, error: updateRoleError }] =
    useUpdateUserRoleMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("User role update Successfully");
    }
    if (deleteSuccess) {
      refetch();
      toast.success("User Deleted Successfully ");
    }
    if (updateRoleError) {
      if ("data" in updateRoleError) {
        const errorMessage = updateRoleError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, updateRoleError, deleteSuccess, deleteError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await updateUserRole({
      email,
      role,
    });
    setActive(false);
  };
  const handleDelete = async (id: string) => {
    await deleteUser(id);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "User Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.2 },
    { field: "join", headerName: "Joined", flex: 0.3 },

    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete
                onClick={() => handleDelete(params.row.id)}
                size={20}
                className="text-black dark:text-white"
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "sendemail ",
      headerName: "Send Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <MdMarkEmailRead
                size={20}
                className="text-black dark:text-white"
                onClick={() => {
                  window.location.href = `mailto:${params.row.email}`;
                }}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users?.filter((user: any) => user.role === "admin");
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          join: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users?.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          join: format(item.createdAt),
        });
      });
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {active && (
            <div
              className="fixed inset-0 flex items-center justify-center z-50  bg-transparent
"
            >
              <div className=" items-center justify-center bg-black  p-5">
                <span className="flex justify-end">
                  <ImCross
                    size={25}
                    className="dark"
                    onClick={() => setActive(false)}
                  />
                </span>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className={`${styles.input} !w-[440px] !text-white !p-4`}
                    placeholder="Enter the Email of person "
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                  />
                  <br />
                  <select
                    name="role"
                    id=""
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`${styles.input}  mt-3 !text-white`}
                  >
                    <option
                      value="admin"
                      className="dark:text-black text-white bg-black dark:bg-white"
                    >
                      admin
                    </option>
                    <option
                      value="user"
                      className="dark:text-black text-white bg-black dark:bg-white"
                    >
                      user
                    </option>
                  </select>
                  <br />
                  <br />
                  <input
                    type="submit"
                    value="submit"
                    className={`${styles.button}`}
                  />
                </form>
              </div>
            </div>
          )}
          {isTeam && (
            <div className=" w-full flex justify-end p-2">
              <div
                className={`${styles.button} !w-[200px]`}
                onClick={() => setActive(true)}
              >
                Add New
              </div>
            </div>
          )}

          <Box
            sx={{
              height: {
                xs: "calc(100vh - 500px)",
                sm: "calc(100vh - 450px)",
                lg: "calc(100vh - 400px)",
              },
              minHeight: { xs: "400px", sm: "500px" },
              width: "100%",
              "& .MuiDataGrid-root": {
                border: "none",
                fontFamily: "Poppins, sans-serif",
                backgroundColor: "transparent",
              },
              "& .MuiDataGrid-main": {
                backgroundColor: "transparent",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#ffffff", // Fixed: Always white background for headers
                borderBottom:
                  theme === "dark" ? "2px solid #64748b" : "2px solid #cbd5e1",
                color: "#000000", // Fixed: Always black text for headers
                fontSize: { xs: "12px", sm: "14px" },
                fontWeight: "700",
                minHeight: { xs: "52px", sm: "60px" },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "700",
                  color: "#000000", // Fixed: Always black text
                  fontSize: "inherit",
                  display: "flex",
                  alignItems: "center",
                },
                "& .MuiDataGrid-columnHeader": {
                  display: "flex",
                  alignItems: "center",
                  "&:focus": {
                    outline: "none",
                  },
                  "&:focus-within": {
                    outline: "none",
                  },
                },
                "& .MuiDataGrid-iconButtonContainer": {
                  "& .MuiIconButton-root": {
                    color: "#000000", // Fixed: Always black icons
                  },
                },
                "& .MuiDataGrid-sortIcon": {
                  color: "#000000", // Fixed: Always black sort icon
                  opacity: 1,
                },
                "& .MuiDataGrid-menuIcon": {
                  color: "#000000", // Fixed: Always black menu icon
                  opacity: 1,
                },
                "& .MuiDataGrid-columnSeparator": {
                  color: "#000000", // Fixed: Always black separator
                  opacity: 0.3,
                },
              },
              "& .MuiDataGrid-cell": {
                borderBottom:
                  theme === "dark" ? "1px solid #374151" : "1px solid #f3f4f6",
                fontSize: { xs: "12px", sm: "14px" },
                padding: { xs: "12px 8px", sm: "16px" },
                color: theme === "dark" ? "#ffffff" : "#374151",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                "&:focus": {
                  outline: "none",
                },
              },
              "& .MuiDataGrid-row": {
                backgroundColor: "transparent",
                minHeight: { xs: "52px", sm: "60px" },
                "&:nth-of-type(odd)": {
                  backgroundColor: theme === "dark" ? "#1e293b" : "#fafafa",
                },
                "&:nth-of-type(even)": {
                  backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
                },
                "&:hover": {
                  backgroundColor:
                    theme === "dark"
                      ? "#475569 !important"
                      : "#e2e8f0 !important",
                },
                "&.Mui-selected": {
                  backgroundColor:
                    theme === "dark"
                      ? "#1e40af40 !important"
                      : "#dbeafe !important",
                  "&:hover": {
                    backgroundColor:
                      theme === "dark"
                        ? "#1e40af50 !important"
                        : "#bfdbfe !important",
                  },
                },
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "transparent",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#475569" : "#f1f5f9",
                borderTop:
                  theme === "dark" ? "2px solid #64748b" : "2px solid #cbd5e1",
                color: theme === "dark" ? "#ffffff" : "#374151",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#ffffff" : "#374151",
              },
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                {
                  color: theme === "dark" ? "#ffffff" : "#374151",
                  fontSize: { xs: "12px", sm: "14px" },
                },
              "& .MuiTablePagination-select": {
                color: theme === "dark" ? "#ffffff" : "#374151",
              },
              "& .MuiTablePagination-actions": {
                "& .MuiIconButton-root": {
                  color: theme === "dark" ? "#ffffff" : "#374151",
                },
              },
              "& .MuiCheckbox-root": {
                color: theme === "dark" ? "#60a5fa" : "#3b82f6",
                "&.Mui-checked": {
                  color: theme === "dark" ? "#60a5fa" : "#3b82f6",
                },
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
