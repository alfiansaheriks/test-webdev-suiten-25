import { SetPageTitle } from "./components/set-page-title";

export default function Page() {
  return (
    <>
      <SetPageTitle title="Dashboard" action="landing" alsoDocument />
      <h1 className="text-2xl font-semibold">Welcome to the dashboard!</h1>
    </>
  );
}
