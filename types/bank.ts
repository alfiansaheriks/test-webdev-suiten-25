export type Bank = {
  id: string;
  bank_name: string;
  bank_short_name: string;
};

export type BankState = {
  banks: Bank[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  create: (bank: Omit<Bank, "id">) => Promise<Bank>;
  remove: (id: string) => Promise<void>;
};
