import { 
  useGetAllUserQuery, 
  useUserBlockMutation
} from "../../../redux/features/admin/AdminApi";
import { useState } from "react";

const Users = () => {
  const { data, error, isLoading } = useGetAllUserQuery("");
  const [userBlock] = useUserBlockMutation();

  // Local States
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const handleBlockUnblock = async (id: string) => {
    try {
      await userBlock(id).unwrap();
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  // Filter + Sort + Pagination
  const users = data?.data || [];

  const filteredUsers = users
    .filter((user: any) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a: any, b: any) =>
      sort === "newest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const paginatedUsers = filteredUsers.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-200 outline-none"
          />

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Table */}
        {isLoading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error loading users</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase">User</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase">Email</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase">Role</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase">Approval</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase">Created At</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedUsers.map((user: any) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    {/* Picture + Name */}
                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                      <img 
                        src={user.picture || "https://via.placeholder.com/40"} 
                        alt={user.name} 
                        className="w-10 h-10 rounded-full object-cover border" 
                      />
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.email}</td>

                    {/* Phone */}
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.phone}</td>

                    {/* Role */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-blue-100 text-blue-600">
                        {user.role}
                      </span>
                    </td>

                    {/* Approval */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-lg text-xs font-semibold 
                        ${user.approvalStatus === "approved" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}
                      `}>
                        {user.approvalStatus}
                      </span>
                    </td>

                    {/* Blocked Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-lg text-xs font-semibold 
                        ${user.isBlocked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}
                      `}>
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    {/* Created At */}
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* Action Button */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleBlockUnblock(user._id)}
                        className={`px-4 py-1 rounded-lg text-sm font-medium transition 
                          ${user.isBlocked 
                            ? "bg-green-500 text-white hover:bg-green-600" 
                            : "bg-red-500 text-white hover:bg-red-600"}
                        `}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <button 
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button 
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
