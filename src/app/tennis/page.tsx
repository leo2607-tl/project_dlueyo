"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";

const Tennis = () => {
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
    price: "",
    category: ""
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/tennis/getEvent");
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
      setShowModal(false);
      setEditEventId(null); 
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
        location: event.location,
        description: event.description,
        price: event.price,
        category: event.category
    });
    setEditEventId(event._id); 
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch("/api/tennis/delEvent", {
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

  
  return (
    <div className="relative min-h-screen bg-black">
      <video autoPlay loop muted className="absolute w-full h-full object-cover">
        <source src="https://cdn.pixabay.com/video/2023/03/15/154779-808521851.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen">
        <header className="w-full bg-opacity-0 py-6">
          <h1 className="text-4xl text-white font-bold text-center">Sự kiện tennis </h1>
        </header>

        <main className="w-full flex-1 px-8 py-8 bg-opacity-0 backdrop-blur-md rounded-lg shadow-lg mb-6">
          {!!error && (
            <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
              <TriangleAlert />
              <p>{error}</p>
            </div>
          )}

          <Button
            onClick={() => setShowModal(true)}
            className="w-full mb-6 bg-indigo-600 text-white hover:bg-indigo-800 transition duration-300"
            size="lg"
            disabled={pending}
          >
            Thêm Sự Kiện
          </Button>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[500px]">
                <h2 className="text-xl font-bold mb-4">{editEventId ? "Chỉnh sửa sự kiện" : "Thêm sự kiện"}</h2>
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
                    <Input
                    type="number"
                    disabled={pending}
                    placeholder="category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    required
                  />
                  <div className="flex justify-between">
                    <Button
                      type="submit"
                      className="w-1/2 bg-blue-600 text-white hover:bg-blue-800"
                      disabled={pending}
                    >
                      {editEventId ? "Lưu Thay Đổi" : "Lưu Sự Kiện"}
                    </Button>
                    <Button
                      type="button"
                      className="w-1/2 bg-red-600 text-white hover:bg-red-800"
                      onClick={() => setShowModal(false)} 
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
                    <CardTitle className="text-center text-xl font-semibold text-blue-600">{event.name}</CardTitle>
                    <CardDescription className="text-center text-sm text-gray-600">{event.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Description:</strong> {event.description}</p>
                    <p><strong>Price:</strong> {event.price}</p>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={() => handleEdit(event)} className="w-full bg-blue-600 text-white hover:bg-blue-800 transition duration-300">
                        Edit Event
                      </Button>
                      <Button onClick={() => handleDelete(event._id)} className="w-full bg-red-600 text-white hover:bg-red-800 transition duration-300">
                        Delete Event
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>

        <footer className="w-full py-6 bg-opacity-80 backdrop-blur-md text-center text-white">
          <p>&copy; 2025 Picker. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Tennis;