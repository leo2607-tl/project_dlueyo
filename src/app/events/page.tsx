'use client';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import './i18n';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Dashboard() {
  interface Event {
    _id: string;
    name: string;
    date: string;
    time: string;
    location: string;
    price: number;
    description: string;
    num_ : number;
  }
  const [isVisible, setIsVisible] = useState(false);
  const [language, setLanguage] = useState('vi');
  const [pickleballEvents, setPickleballEvents] = useState<Event[]>([]);
  const [tennisEvents, setTennisEvents] = useState<Event[]>([]);
  const [marathonEvents, setMarathonEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    date: '',
    time: '',
    num_: '',
    location: '',
    description: '',
    price: '',
  });
  const [editEventId, setEditEventId] = useState(null);
  const [showModalPic, setShowModalPic] = useState(false);
  const [showModalTen, setShowModalTen] = useState(false);
  const [showModalMar, setShowModalMar] = useState(false);
  const [pending, setPending] = useState(false);
  const { t, i18n } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    fetchEvents();
  }, []);

  const handleLanguageChange = (lang: string): void => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const fetchEvents = async () => {
    try {
      const pickleballRes = await fetch("/api/pickleball/getEvent");
      const pickleballData = await pickleballRes.json();
      const tennisRes = await fetch("/api/tennis/getEvent");
      const tennisData = await tennisRes.json();
      const marathonRes = await fetch("/api/marathon/getEvent");
      const marathonData = await marathonRes.json();

      if (pickleballRes.ok && tennisRes.ok && marathonRes.ok) {
        setPickleballEvents(pickleballData);
        setTennisEvents(tennisData);
        setMarathonEvents(marathonData);
      } else {
        setError("Failed to fetch events");
      }
    } catch (error) {
      setError("Failed to fetch events");
    }
  };

  const handleDelete = async (id: string, type: string) => {
    const res = await fetch(`/api/${type}/delEvent`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      fetchEvents();
    } else {
      toast.error(data.message);
    }
  };

  const handleSubmitPic = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const url = editEventId ? "/api/pickleball/updEvent" : "/api/pickleball/postEvent"; 
    
    const res = await fetch(url, {
      method: editEventId ? "PATCH" : "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: editEventId }), 
    });
  
    const data = await res.json();
  
    if (res.ok) {
      setPending(false);
      toast.success(data.message);
      setShowModalPic(false);
      setEditEventId(null);  
      setForm({
        name: "",
        date: "",
        time: "",
        num_: "",
        location: "",
        description: "",
        price: "",
      });  
      fetchEvents();
    } else if (res.status === 400) {
      setError(data.message);
      setPending(false);
    } else if (res.status === 500) {
      setError(data.message);
      setPending(false);
    }
  };

  const handleEditPic = (event: any) => {
    setForm({
      name: event.name,
      date: event.date,
      time: event.time,
      num_: event.num_,
      location: event.location,
      description: event.description,
      price: event.price,
    });
    setEditEventId(event._id); 
    setShowModalPic(true);
  };

  const handleSubmitMar = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const url = editEventId ? "/api/marathon/updEvent" : "/api/marathon/postEvent"; 
    
    const res = await fetch(url, {
      method: editEventId ? "PATCH" : "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: editEventId }), 
    });
  
    const data = await res.json();
  
    if (res.ok) {
      setPending(false);
      toast.success(data.message);
      setShowModalMar(false);
      setEditEventId(null);  
      setForm({
        name: "",
        date: "",
        time: "",
        num_: "",
        location: "",
        description: "",
        price: "",
      });  
      fetchEvents();
    } else if (res.status === 400) {
      setError(data.message);
      setPending(false);
    } else if (res.status === 500) {
      setError(data.message);
      setPending(false);
    }
  };

  const handleEditMar = (event: any) => {
    setForm({
      name: event.name,
      date: event.date,
      time: event.time,
      num_: event.num_,
      location: event.location,
      description: event.description,
      price: event.price,
    });
    setEditEventId(event._id); 
    setShowModalMar(true);
  };

  const handleSubmitTen = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const url = editEventId ? "/api/tennis/updEvent" : "/api/tennis/postEvent"; 
    
    const res = await fetch(url, {
      method: editEventId ? "PATCH" : "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: editEventId }), 
    });
  
    const data = await res.json();
  
    if (res.ok) {
      setPending(false);
      toast.success(data.message);
      setShowModalTen(false);
      setEditEventId(null);  
      setForm({
        name: "",
        date: "",
        time: "",
        num_: "",
        location: "",
        description: "",
        price: "",
      });  
      fetchEvents();
    } else if (res.status === 400) {
      setError(data.message);
      setPending(false);
    } else if (res.status === 500) {
      setError(data.message);
      setPending(false);
    }
  };

  const handleEditTen = (event: any) => {
    setForm({
      name: event.name,
      date: event.date,
      time: event.time,
      num_: event.num_,
      location: event.location,
      description: event.description,
      price: event.price,
    });
    setEditEventId(event._id); 
    setShowModalTen(true);
  };


  return (
    <div className={`min-h-screen flex bg-gray-100 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      <aside className="w-64 bg-black text-white p-6">
        <div className="text-4xl text-teal-500 font-bold">Daidi</div>
        <ul className="mt-8 space-y-4">
          <li>
            <button onClick={() => router.push('/events')} className="w-full text-left text-lg text-green-300 hover:text-gray-400">
            Quản Lý Sự Kiện
            </button>
          </li>
          <li>
            <button onClick={() => router.push('/users')} className="w-full text-left text-lg text-purple-400 hover:text-gray-400">
            Quản Lý Người Dùng
            </button>
          </li>
          <li>
            <button onClick={() => router.push('/buys')} className="w-full text-left text-lg text-yellow-400 hover:text-gray-400">
            Quản Lý Doanh Thu
            </button>
          </li>
        </ul>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center bg-white p-4 shadow-md">
          <div className="text-3xl text-teal-900 font-bold">Admin Dashboard</div>
        </header>

        <main className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
            <div className="text-xl text-green-900 font-semibold">Pickleball Events</div>
            <div className="text-4xl text-green-600 font-bold">{pickleballEvents.length}</div>
            <div className="text-green-500">Sự kiện đang hoạt động</div>
            <button
              onClick={() => setShowModalPic(true)}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700"
            >
              Thêm sự kiện
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
            <div className="text-xl text-pink-900 font-semibold">Tennis Events</div>
            <div className="text-4xl text-pink-500 font-bold">{tennisEvents.length}</div>
            <div className="text-pink-500">Sự kiện đang hoạt động</div>
            <button
              onClick={() => setShowModalTen(true)}
              className="mt-4 bg-pink-600 text-white py-2 px-4 rounded-full hover:bg-pink-700"
            >
              Thêm sự kiện
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
            <div className="text-xl text-orange-700 font-semibold">Marathon Events</div>
            <div className="text-4xl text-orange-500 font-bold">{marathonEvents.length}</div>
            <div className="text-orange-500">Sự kiện đang hoạt động</div>
            <button
              onClick={() => setShowModalMar(true)}
              className="mt-4 bg-orange-400 text-white py-2 px-4 rounded-full hover:bg-orange-700"
            >
              Thêm sự kiện
            </button>
          </div>
        </main>

        <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-green-300 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl text-green-900 font-semibold mb-4">Pickleball Events</h2>
            <div className="space-y-4">
              {pickleballEvents.map((event, index) => (
                <div key={index} className="bg-green-400 p-4 rounded-lg text-white hover:bg-green-500 transition duration-300">
                  <h3 className="text-lg font-semibold break-words">{event.name}</h3>
                  <p className='break-words'> Mô tả: {event.description}</p>
                  <p className="break-words">Giá: {event.price}</p>
                  <p className="break-words">Số vé còn lại: : {event.num_}</p>
                  <p className="break-words">Địa điểm: {event.location}</p>

                  <div className="flex flex-wrap space-x-4 space-x-4">
                  <button
                    onClick={() => handleEditPic(event)}
                    className="mt-4 bg-purple-400 text-white py-2 px-4 rounded-full hover:bg-purple-700"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(event._id, 'pickleball')}
                    className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-full hover:bg-gray-700"
                  >
                    Xóa
                  </button>
                </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tennis Events List */}
          <div className="bg-pink-300 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl text-pink-800 font-semibold mb-4">Tennis Events</h2>
            <div className="space-y-4">
              {tennisEvents.map((event, index) => (
                <div key={index} className="bg-pink-500 p-4 rounded-lg text-white hover:bg-pink-600 transition duration-300">
                  <h3 className="text-lg font-semibold break-words">{event.name}</h3>
                  <p className='break-words'> Mô tả: {event.description}</p>
                  <p className="break-words">Giá: {event.price}</p>
                  <p className="break-words">Số vé còn lại: : {event.num_}</p>
                  <p className="break-words">Địa điểm: {event.location}</p>
                  <div className="flex flex-wrap space-x-4 space-x-4">
                  <button
                    onClick={() => handleEditTen(event)}
                    className="mt-4 bg-purple-400 text-white py-2 px-4 rounded-full hover:bg-purple-500"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(event._id, 'tennis')}
                    className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-full hover:bg-gray-700"
                  >
                    Xóa
                  </button>
                </div>

                </div>
              ))}
            </div>
          </div>

          {/* Marathon Events List */}
          <div className="bg-orange-300 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl text-orange-700 font-semibold mb-4">Marathon Events</h2>
            <div className="space-y-4">
              {marathonEvents.map((event, index) => (
                <div key={index} className="bg-orange-400 p-4 rounded-lg text-white hover:bg-orange-500 transition duration-300">
                  <h3 className="text-lg font-semibold break-words">{event.name}</h3>
                  <p className='break-words'> Mô tả: {event.description}</p>
                  <p className="break-words">Giá: {event.price}</p>
                  <p className="break-words">Số vé còn lại: : {event.num_}</p>
                  <p className="break-words">Địa điểm: {event.location}</p>
                  <div className="flex flex-wrap space-x-4 space-x-4">
                    <button
                      onClick={() => handleEditMar(event)}
                      className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-full hover:bg-purple-600"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(event._id, 'marathon')}
                      className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-full hover:bg-gray-700"
                    >
                      Xóa
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal */}
        {showModalPic && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[500px]">
                <h2 className="text-2xl font-bold mb-4 text-black">{editEventId ? "Chỉnh sửa sự kiện" : "Thêm sự kiện"}</h2>
                <form onSubmit={handleSubmitPic} className="space-y-3">
                  <Input
                    type="text"
                    disabled={pending}
                    placeholder="Event Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <Input
                    type="date"
                    disabled={pending}
                    placeholder="Event Date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                  />
                  <Input
                    type="time"
                    disabled={pending}
                    placeholder="Event Time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    required
                  />
                  <Input
                    type="number"
                    disabled={pending}
                    placeholder="num_"
                    value={form.num_}
                    onChange={(e) => setForm({ ...form, num_: e.target.value })}
                    required
                  />
                  <Input
                    type="text"
                    disabled={pending}
                    placeholder="Location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    required
                  />
                  <Input
                    type="text"
                    disabled={pending}
                    placeholder="Event Description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="number"
                    disabled={pending}
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                  />
                  <div className="flex justify-between p-2 space-x-4">
                    <Button
                      type="submit"
                      className="w-1/2 bg-gray-900 text-white hover:bg-gray-800"
                      disabled={pending}
                    >
                      {editEventId ? "Lưu Thay Đổi" : "Lưu Sự Kiện"}
                    </Button>
                    <Button
                      type="button"
                      className="w-1/2 bg-gray-600 text-white hover:bg-gray-800"
                      onClick={() => {
                        setForm({
                          name: "",
                          date: "",
                          time: "",
                          num_: "",
                          location: "",
                          description: "",
                          price: "",
                        });
                        setEditEventId(null);  
                        setShowModalPic(false); 
                      }} 
                    >
                      Hủy
                    </Button>
                  </div>

                </form>
              </div>
            </div>
        )}
        {showModalTen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[500px]">
                <h2 className="text-2xl font-bold mb-4 text-black">{editEventId ? "Chỉnh sửa sự kiện" : "Thêm sự kiện"}</h2>
                <form onSubmit={handleSubmitTen} className="space-y-3">
                  <Input
                    type="text"
                    disabled={pending}
                    placeholder="Event Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <Input
                    type="date"
                    disabled={pending}
                    placeholder="Event Date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                  />
                  <Input
                    type="time"
                    disabled={pending}
                    placeholder="Event Time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    required
                  />
                  <Input
                    type="number"
                    disabled={pending}
                    placeholder="num_"
                    value={form.num_}
                    onChange={(e) => setForm({ ...form, num_: e.target.value })}
                    required
                  />
                  <Input
                    type="text"
                    disabled={pending}
                    placeholder="Location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    required
                  />
                  <Input
                    type="text"
                    disabled={pending}
                    placeholder="Event Description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="number"
                    disabled={pending}
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                  />
                  <div className="flex justify-between p-2 space-x-4">
                    <Button
                      type="submit"
                      className="w-1/2 bg-gray-900 text-white hover:bg-gray-800"
                      disabled={pending}
                    >
                      {editEventId ? "Lưu Thay Đổi" : "Lưu Sự Kiện"}
                    </Button>
                    <Button
                      type="button"
                      className="w-1/2 bg-gray-600 text-white hover:bg-gray-800"
                      onClick={() => {
                        setForm({
                          name: "",
                          date: "",
                          time: "",
                          num_: "",
                          location: "",
                          description: "",
                          price: "",
                        });
                        setEditEventId(null);  
                        setShowModalTen(false); 
                      }} 
                    >
                      Hủy
                    </Button>
                  </div>

                </form>
              </div>
            </div>
        )}
        {showModalMar && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[500px]">
                <h2 className="text-2xl font-bold mb-4 text-black">{editEventId ? "Chỉnh sửa sự kiện" : "Thêm sự kiện"}</h2>
                <form onSubmit={handleSubmitMar} className="space-y-3">
                  <Input
                    type="text"
                    disabled={pending}
                    placeholder="Event Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <Input
                    type="date"
                    disabled={pending}
                    placeholder="Event Date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                  />
                  <Input
                    type="time"
                    disabled={pending}
                    placeholder="Event Time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    required
                  />
                  <Input
                    type="number"
                    disabled={pending}
                    placeholder="num_"
                    value={form.num_}
                    onChange={(e) => setForm({ ...form, num_: e.target.value })}
                    required
                  />
                  <Input
                    type="text"
                    disabled={pending}
                    placeholder="Location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    required
                  />
                  <Input
                    type="text"
                    disabled={pending}
                    placeholder="Event Description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="number"
                    disabled={pending}
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                  />
                  <div className="flex justify-between p-2 space-x-4">
                    <Button
                      type="submit"
                      className="w-1/2 bg-gray-900 text-white hover:bg-gray-800"
                      disabled={pending}
                    >
                      {editEventId ? "Lưu Thay Đổi" : "Lưu Sự Kiện"}
                    </Button>
                    <Button
                      type="button"
                      className="w-1/2 bg-gray-600 text-white hover:bg-gray-800"
                      onClick={() => {
                        setForm({
                          name: "",
                          date: "",
                          time: "",
                          num_: "",
                          location: "",
                          description: "",
                          price: "",
                        });
                        setEditEventId(null);  
                        setShowModalMar(false); 
                      }} 
                    >
                      Hủy
                    </Button>
                  </div>

                </form>
              </div>
            </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
