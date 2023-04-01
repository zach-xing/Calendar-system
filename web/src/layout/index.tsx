import CalendarLayout from "./Calendar";
import Sider from "./Sider";

export default function Layout({ children }: any) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "100px 1fr 360px",
        height: "100vh",
        overflow: "hidden",
        padding: "10px 0",
        backgroundColor: "white",
      }}
    >
      <Sider />
      <main
        style={{
          borderRadius: "10px",
          backgroundColor: "#f7f6f9",
          padding: "20px 30px",
        }}
      >
        {children}
      </main>
      <CalendarLayout />
    </div>
  );
}
