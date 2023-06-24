import Search from "@/src/Search";
// for example we can revalidate every 5h our home page (ISR)
export const revalidate = 18000000;

const Home = () => {
  return (
    <main className="flex flex-col items-center">
      <Search />
    </main>
  );
};
export default Home;
