"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";

const PickerBall = () => {
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    num_: 0,
    location: "",
    description: "",
    price: 0,
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/pickleball/getEvent");
      const data = await res.json();
      if (res.ok) {
        setEvents(data);
      } else {
        setError("Failed to fetch events");
      }
    } catch (error) {
      setError("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents(); 
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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
      setShowModal(false);
      setEditEventId(null);  
      setForm({
        name: "",
        date: "",
        time: "",
        num_: 0,
        location: "",
        description: "",
        price: 0,
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

  const handleEdit = (event: any) => {
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
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch("/api/pickleball/delEvent", {
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

  const handleViewDetails = (event: any) => {
    setSelectedEvent(event);
    setShowDetailPopup(true);
  };

  const closeDetailPopup = () => {
    setShowDetailPopup(false);
    setSelectedEvent(null);
  };

  interface Event {
    _id: string;
    name: string;
    date: string;
    time: string;
    location: string;
    price: number;
    num_: number;
  }
 
  return (
    <div className="relative min-h-screen bg-black">
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen">
      <header className="w-full bg-gradient-to-r from-white-500 via-gray-600 to-black-500 py-8">
        <div className="flex justify-between items-center px-8">
          <h1 className="text-4xl text-white font-extrabold text-left leading-tight transform transition duration-300 hover:scale-105">
            PICKLEBALL EVENTS FOR YOU
          </h1>
        </div>
      </header>
    
        <main className="w-full flex-1 px-8 py-4 bg-opacity-0 backdrop-blur-md rounded-lg shadow-lg mb-6">
          {!!error && (
            <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
              <TriangleAlert />
              <p>{error}</p>
            </div>
          )}

          <Button
            onClick={() => setShowModal(true)}
            className="w-full mb-6 bg-gray-600 text-white hover:bg-gray-700 transition duration-300 bg-gray-600"
            size="lg"
            disabled={pending}
          >
            Thêm Sự Kiện
          </Button>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[500px]">
                <h2 className="text-2xl font-bold mb-4 text-black">{editEventId ? "Chỉnh sửa sự kiện" : "Thêm sự kiện"}</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
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
                    placeholder="NOT"
                    value={form.num_}
                    onChange={(e) => setForm({ ...form, num_: Number(e.target.value) })}
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
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
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
                          num_: 0,
                          location: "",
                          description: "",
                          price: 0,
                        });
                        setEditEventId(null);  
                        setShowModal(false); 
                      }} 
                    >
                      Hủy
                    </Button>
                  </div>

                </form>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {events.length === 0 ? (
              <p className="text-white text-center">No events available</p>
            ) : (
              events.map((event: any) => (
                <Card key={event._id} className="p-4 bg-white bg-opacity-90 rounded-lg shadow-lg">
                  <CardHeader>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/014/484/060/small/pickleball-logo-with-a-combination-of-lettering-and-moving-pickleball-vector.jpg" alt="Event Image" className="w-full h-40 object-cover rounded-lg mb-4" />
                    <CardTitle className="text-center text-xl font-semibold ">{event.name}</CardTitle>
                    <CardDescription className="text-center text-sm text-gray-600">Số vé còn lại: {event.num_}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button onClick={() => handleViewDetails(event)} className="w-full bg-gray-600 text-white hover:bg-gray-800 mb-4">
                      Chi tiết sự kiện
                    </Button>
                    <div className="flex gap-2">
                      <Button onClick={() => handleEdit(event)} className="w-full bg-gray-600 text-white hover:bg-gray-800 transition duration-300">
                        Sửa sự kiện
                      </Button>
                      <Button onClick={() => handleDelete(event._id)} className="w-full bg-gray-600 text-white hover:bg-gray-800 transition duration-300">
                        Xóa sự kiện
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>

        {showDetailPopup && selectedEvent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] sm:w-[800px] lg:w-[1000px]">
              <h2 className="text-3xl font-bold mb-4 text-center text-black">{selectedEvent.name}</h2>
              <img src="https://static.vecteezy.com/system/resources/thumbnails/014/484/060/small/pickleball-logo-with-a-combination-of-lettering-and-moving-pickleball-vector.jpg" alt="Event Image" className="w-full h-80 object-cover rounded-lg mb-4" />
              <p><strong className="font-bold text-black">Ngày:</strong> <span className="text-black">{selectedEvent.date}</span></p>
              <p><strong className="font-bold text-black">Giờ:</strong> <span className="text-black">{selectedEvent.time}</span></p>
              <p><strong className="font-bold text-black">Địa điểm:</strong> <span className="text-black">{selectedEvent.location}</span></p>
              <p><strong className="font-bold text-black">Mô tả:</strong> <span className="text-black">{selectedEvent.description}</span></p>
              <p><strong className="font-bold text-black">Giá:</strong> <span className="text-black">{selectedEvent.price}</span></p>

              <div className="flex justify-between mt-4">
                <Button onClick={closeDetailPopup} className="bg-red-600 text-white hover:bg-red-800">
                  Thoát
                </Button>
              </div>
            </div>
          </div>
        )}

        <footer className="w-full py-6 bg-opacity-80 backdrop-blur-md text-center text-white">
          <p>&copy; 2025 PickerBall. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default PickerBall;
