import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useTheme } from "next-themes";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/styles";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = {};

const AllCourses: FC<Props> = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState();
  const [deleteCourse, { isSuccess, error: courseDeleteError }] =
    useDeleteCourseMutation();

  const { isLoading, data, error, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Deleted Successfully");
    }
    if (courseDeleteError) {
      if ("data" in courseDeleteError) {
        const errorData = courseDeleteError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, courseDeleteError]);
  const handleDelete = async (id: any) => {
    await deleteCourse(id);

    setOpen(false);
    refetch();
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <AiOutlineEdit size={20} className="text-black dark:text-white" />
            </Link>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(true);
                setCourseId(params.row.id);
              }}
            >
              <AiOutlineDelete
                size={20}
                className="text-black dark:text-white"
              />
            </Button>
          </>
        );
      },
    },
  ];
  const rows: any = [];
  {
    data &&
      data.courses.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          purchased: item.purchased,
          ratings: item.ratings,
          created_at: format(item.createdAt),
        });
      });
  }

  return (
    <div className="mt-[120px] ">
      {isLoading ? (
        <Loader />
      ) : (
        <Box className="m-[10px] ">
          {open && (
            <div className="fixed inset-0 flex items-center justify-center z-50  bg-transparent">
              <div className=" items-center justify-center dark:bg-slate-600  p-5 rounded bg-black">
                <p className=" text-white">
                  Are you sure to delete this course?
                </p>
                <br />
                <div className="flex justify-between">
                  <button
                    className={`${styles.button} !mr-4`}
                    onClick={() => setOpen(false)}
                  >
                    Cencel
                  </button>
                  <button
                    className={`${styles.button} !bg-red-600`}
                    onClick={() => handleDelete(courseId)}
                  >
                    {" "}
                    Delete
                  </button>
                </div>
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

export default AllCourses;
