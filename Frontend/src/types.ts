// Une succursale, telle que renvoyée par l'API
export interface Branch {
  branch_code: number;
  branch_name: string;
}

// Un cours de studio
export interface Class {
  class_code: number;
  branch_code: number;
  class_name: string;
  start_time: string;
  end_time: string;
  instructor_name: string;
  max_participants: number;
}
