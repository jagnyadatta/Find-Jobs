import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";

const CompaniesTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <tr>
            <TableCell>
              <Avatar>
                <AvatarImage src="https://www.shutterstock.com/shutterstock/photos/2487834049/display_1500/stock-vector-growth-logo-technology-software-finance-investment-etc-logo-template-for-businesses-2487834049.jpg" />
              </Avatar>
            </TableCell>
            {/* <TableCell>{company.name}</TableCell> */}
            <TableCell>Company Name</TableCell>
            {/* <TableCell>{company.createdAt.split("T")[0]}</TableCell> */}
            <TableCell>13-10-2024</TableCell>
            <TableCell className="text-right cursor-pointer">
              <Popover>
                <PopoverTrigger className="bg-white">
                  <MoreHorizontal  />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  <div
                    // onClick={() => navigate(`/admin/companies/${company._id}`)}
                    className="flex items-center gap-2 w-fit cursor-pointer"
                  >
                    <Edit2 className="w-4" />
                    <span>Edit</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </tr>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
