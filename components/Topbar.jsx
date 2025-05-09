export default function Topbar() {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  
    return (
      <div className="ml-64 bg-white p-4 shadow flex justify-between items-center">
        <h2 className="text-black font-semibold">{today}</h2>
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded px-4 py-1 w-64 text-black"
        />
      </div>
    );
  }
  