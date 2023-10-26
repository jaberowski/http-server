import { Program } from "../../../routes/program.route";

export interface Plan {
  id: number;
  title: string;
  description: string;
  deadLine: Date;
  programs: Program[];
}
