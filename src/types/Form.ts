import { Rule } from "antd/es/form";

export type Field = {
  label: string;
  type: "input" | "select" | "password";
  rule?: Rule[];
  disabled?: boolean;
};
