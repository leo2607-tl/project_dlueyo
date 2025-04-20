"use client";

import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  password: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getEvent");
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
          setTotalUsers(data.length);
        } else {
          setError("Failed to fetch users");
        }
      } catch (error) {
        setError("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex bg-gradient-to-r from-indigo-50 to-gray-100 min-h-screen">
      <div className="w-1/5 p-8 bg-white shadow-lg rounded-xl">
        <div className="p-2 mb-4 w-full h-full">
          <h2 className="text-3xl font-bold text-left text-blue-800 overflow-wrap break-words hover:text-white hover:bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-lg transition-all duration-300">
            Quản Lý Người Dùng
          </h2>
          <p className="text-left font-semibold text-gray-500 mt-8">
            Quản lí tài khoản của người dùng đã đăng ký vào web Daidi
          </p>
        </div>
      </div>

      <div className="w-4/5 p-6 space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 flex justify-center items-center hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col items-center w-full">
            <h3 className="text-xl font-bold text-gray-800 p-2 rounded-lg hover:text-white hover:bg-gradient-to-r from-teal-400 to-blue-500 transition-all duration-300">
              Số Người Dùng Đã Đăng Ký
            </h3>
            <p className="text-4xl text-yellow-500 font-semibold">{totalUsers}</p>
          </div>
        </div>
  
        <div className="border-t-2 border-gray-400 my-8"></div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-white to-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 break-words"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-gray-300 flex justify-center items-center">
                  <span className="text-2xl font-semibold text-gray-800">
                    {user.name[0]}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 w-full overflow-wrap break-word">{user.name}</h4>
                <p className="text-sm text-gray-500 w-full overflow-wrap break-word">Email: {user.email}</p>
                <p className="text-sm text-gray-500 w-full overflow-wrap break-word">Password: {user.password}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button className="text-blue-400 hover:underline">Edit</button>
                <button className="text-red-400 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
    
};

export default UserList;
