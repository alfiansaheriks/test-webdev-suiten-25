export type Shift = {
  id: string;
  shift_name: string;
  start_time: string;
  end_time: string;
};

export type ShiftState = {
  shifts: Shift[];
  totalItems: number;
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  create: (shift: Omit<Shift, "id">) => Promise<Shift>;
  remove: (id: string) => Promise<void>;
};
