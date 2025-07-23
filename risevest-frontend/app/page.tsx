"use client";
import Image from "next/image";
import logo from "@/public/logo-main.svg";
import avatar from "@/public/Avatar.png";
import man2 from "@/public/Headshot of a black young man.png";
import woman1 from "@/public/Headshot of a black young woman with a mild smile.png";
import woman2 from "@/public/Headshot of a black young woman with afro hair.png";
import { FiPlus } from "react-icons/fi";
import { HiMiniPhone } from "react-icons/hi2";
import { HiDocumentText } from "react-icons/hi2";
import { HiMail } from "react-icons/hi";
import { PiSmileySadThin } from "react-icons/pi";
import { useState, useEffect } from "react";
import { FaFaceSmileBeam } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Modal from "@/components/Modal";

type Feedback = {
  id?: string;
  name: string;
  email: string;
  message: string;
  number: string;
  type: "bug" | "feature" | "other";
};

const FEEDBACK_TYPES = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "other", label: "Other" },
];
const API_URL = "https://rise-frontend-test-api.developer-a6a.workers.dev/";

const getInitials = (nameString: string) => {
  if (!nameString) return "";
  const words = nameString.split(" ");
  const initials = words
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return initials;
};

const getRandomHexColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
};

const FEEDBACKS_PER_PAGE = 12; 

export default function Home() {
  const [form, setForm] = useState<Feedback>({
    name: "",
    email: "",
    message: "",
    number: "",
    type: "bug",
  });
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filter, setFilter] = useState<"" | "bug" | "feature" | "other">("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thankYou, setThankYou] = useState(false);

  
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setFeedbacks(data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ name: "", email: "", message: "", number: "", type: "bug" });
      setIsModalOpen(false);
      setThankYou(true);
      await fetchFeedbacks();
      setCurrentPage(1); 
    } catch (err) {
      console.log(err);
    }
  };

  
  const filteredFeedbacks = feedbacks.filter(
    (fb) =>
      (filter ? fb.type === filter : true) &&
      (search
        ? fb.message.toLowerCase().includes(search.toLowerCase()) ||
          fb.name.toLowerCase().includes(search.toLowerCase())
        : true)
  );

 
  const totalPages = Math.max(
    1,
    Math.ceil(filteredFeedbacks.length / FEEDBACKS_PER_PAGE)
  );
  const paginatedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * FEEDBACKS_PER_PAGE,
    currentPage * FEEDBACKS_PER_PAGE
  );

  
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search]);

  const isFormValid = form.name && form.email && form.message;

  return (
    <div className="bg-[#f8f8f8] font-sans flex flex-col  w-full min-h-[100vh]">
      <nav className=" md:p-8 p-4 bg-white">
        <Image src={logo} width={"97"} height={"52"} alt="" />
      </nav>

      <section className="flex flex-col w-full  md:w-fit md:px-8 px-4 py-4 gap-2">
        <h3 className="font-medium font-sans w-full md:w-fit md:text-[32px] text-[24px]">
          Got a complaint or feedback?
        </h3>
        <div className=" flex w-full">
          <aside className=" w-[20%] items-center flex">
            <Image src={avatar} width={"30"} height={"30"} alt="" />
            <Image
              className="-ml-3"
              src={man2}
              width={"30"}
              height={"30"}
              alt=""
            />
            <Image
              className="-ml-3"
              src={woman1}
              width={"30"}
              height={"30"}
              alt=""
            />
            <Image
              className="-ml-3"
              src={woman2}
              width={"30"}
              height={"30"}
              alt=""
            />
          </aside>
          <p className="items-center w-full text-[#555B64] flex">
            Our support team is ready to listen and resolve.
          </p>
        </div>
      </section>

      <section className="flex justify-between w-full items-start lg:items-center md:px-8 px-4 py-4 gap-4 flex-col lg:flex-row">
        <aside className="flex lg:w-[60%] xl:w-[50%] 2xl:w-[40%] justify-between  w-full md:w-[90%]   items-center">
          <button
            onClick={() => setFilter("")}
            className={`px-6 py-2 font-medium cursor-pointer border-2 outline-0 rounded-xl transition-colors duration-200 ${
              filter === ""
                ? "bg-[#EDFFFF] border-[#9FDCE1]"
                : "bg-white border-[#EAECF0]  hover:border-[#9FDCE1]"
            }`}
          >
            All Feedbacks
          </button>
          <button
            onClick={() => setFilter("bug")}
            className={`px-6 py-2 font-medium cursor-pointer border-2 outline-0 rounded-xl transition-colors duration-200 ${
              filter === "bug"
                ? "bg-[#EDFFFF] border-[#9FDCE1]"
                : "bg-white border-[#EAECF0]  hover:border-[#9FDCE1]"
            }`}
          >
            Bugs Only
          </button>
          <button
            onClick={() => setFilter("feature")}
            className={`px-6 py-2 font-medium cursor-pointer border-2 outline-0 rounded-xl transition-colors duration-200 ${
              filter === "feature"
                ? "bg-[#EDFFFF] border-[#9FDCE1]"
                : "bg-white border-[#EAECF0]  hover:border-[#9FDCE1]"
            }`}
          >
            Feature Requests
          </button>
          <button
            onClick={() => setFilter("other")}
            className={`px-6 py-2 font-medium cursor-pointer border-2 outline-0 rounded-xl transition-colors duration-200 ${
              filter === "other"
                ? "bg-[#EDFFFF] border-[#9FDCE1]"
                : "bg-white border-[#EAECF0]  hover:border-[#9FDCE1]"
            }`}
          >
            Other
          </button>
        </aside>

        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-1 p-3 cursor-pointer rounded-3xl outline-0 bg-[#006D79] text-white border-[#006D79] border-2 hover:bg-white hover:text-[#006D79] hover:border-[#006D79] hover:border-2"
        >
          <FiPlus className="text-white text-xl group-hover:text-[#006D79]" />
          Submit New Feedback
        </button>
      </section>
      {(filteredFeedbacks.length === 0 && (
        <section className="w-full flex mt-[10%]">
          <p className="text-[#555B64] flex text-xl font-sans items-center mx-auto">
            <PiSmileySadThin className="text-[#555B64] text-4xl" />
            Feedbacks Loading...
          </p>
        </section>
      )) || (
        <section className="relative">
          <div className="grid lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 md:grid-cols-2 p-4 place-items-center w-full gap-2">
            {paginatedFeedbacks.map((fb, id) => (
              <div
                key={id}
                className="bg-white lg:w-[90%] w-[80%] md:w-[80%] flex flex-col gap-3 p-4 rounded-2xl border-[1px] border-[#EAECF0]"
              >
                <aside className="flex w-full gap-2  items-center">
                  <p
                    className="w-10 h-10 rounded-full text-lg text-center p-2 items-center bg-gray-200"
                    style={{ color: getRandomHexColor() }}
                  >
                    {getInitials(fb.name)}
                  </p>
                  <h4 className="text-xl font-semibold font-sans">{fb.name}</h4>
                </aside>
                <p className="flex text-[#555B64] gap-2 items-center">
                  <HiMail className="text-[#c9cdd3] text-lg" />
                  {fb.email}
                </p>
                <p className="flex text-[#555B64] gap-2 items-center">
                  <HiMiniPhone className="text-[#c9cdd3] text-lg" />
                  {fb.number ? fb.number : "n/a"}
                </p>
                <p className="flex gap-2 items-center">
                  <HiDocumentText className="text-[#c9cdd3] text-lg" />
                  {fb.type}
                </p>
                <p className="text-[#555B64] px-6">{fb.message}</p>
              </div>
            ))}
          </div>

         
          {totalPages > 1 && (
            <div className="flex justify-between items-center px-4 py-4 w-full  left-0 bottom-0">
            
              <div className="text-gray-500 text-sm font-medium">
                Page {currentPage} of {totalPages}
              </div>
             
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-3 rounded-full font-semibold flex justify-center items-center w-10 h-10 ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#006D79] text-white cursor-pointer hover:bg-[#00545f]"
                  }`}
                >
                  <IoIosArrowBack />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-3 rounded-full font-semibold w-10 h-10 flex justify-center items-center
    ${
      currentPage === totalPages
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-[#006D79] text-white cursor-pointer hover:bg-[#00545f]"
    }`}
                   
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      <Modal isOpen={isModalOpen}>
        <h3 className="text-lg font-bold ml-4 mt-2">
          What would you like to bring to our attention?
        </h3>
        <p className="text-[#555B64] text-sm ml-4 mt-1">
          Kindly fill the details below to submit.
        </p>

        <form
          className="w-full mt-8  bg-[#f8f8f8] border-y-2 px-4 py-8 md:gap-4 gap-2 flex flex-col border-y-[#EAECF0] "
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Full name"
            required
            className=" rounded-lg font-medium p-4 outline-none border-[#EAECF0] border-[1px]"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <div className="flex items-center px-3 py-2 w-full rounded-lg p-2 outline-none border-[#EAECF0] border-[1px] ">
            <HiMail className="text-gray-400 text-lg mr-2 border-r-2 border-r-[#EAECF0]" />
            <input
              type="email"
              placeholder="Enter email"
              className="flex-1 outline-none font-medium py-2 "
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="flex items-center px-3 py-2 w-full rounded-lg p-2 outline-none border-[#EAECF0] border-[1px] ">
            <HiMiniPhone className="text-gray-400 text-lg mr-2 border-r-2 border-r-[#EAECF0]" />
            <input
              type="text"
              placeholder="Phone Number"
              className="flex-1 font-medium outline-none py-2 "
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
            />
          </div>

          <select
            className="rounded-lg p-4 font-medium outline-none border-[#EAECF0] border-[1px]"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as Feedback["type"] })
            }
          >
            {FEEDBACK_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Enter feedback message..."
            required
            className="rounded-lg font-medium p-4 outline-none border-[#EAECF0] border-[1px] resize-none"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <aside className="flex justify-between w-full gap-2 items-center">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-[#EAECF0] text-[#006D79] w-[50%] p-3 rounded-4xl hover:bg-[#dfe1e4] cursor-pointer"
            >
              Close
            </button>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-[50%] p-3 rounded-4xl font-semibold transition-all ${
                isFormValid
                  ? "bg-[#006D79] text-white cursor-pointer hover:bg-[#00545f]"
                  : "bg-[#CFEAEC] text-[#ffffffa6] cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </aside>
        </form>
      </Modal>

      <Modal isOpen={thankYou}>
        <div className="w-full flex flex-col gap-4 py-4 bg-[#EAECF0] border-b-2 border-b-[#EAECF0] items-center">
          <FaFaceSmileBeam className="text-[#00545f] text-4xl" />
          <h2 className="font-bold text-2xl">Thank you for your feedback</h2>
          <p className="text-[#555B64] text-sm">
            We have received your feedback! Our team will attend to it.
          </p>
        </div>

        <aside className="flex flex-col bg-white mt-4">
          <button
            className="w-[50%] p-3 rounded-4xl mx-auto font-semibold cursor-pointer hover:bg-[#00545f] hover:text-[#EAECF0] bg-[#EAECF0] text-[#00545f] text-sm "
            onClick={() => setThankYou(false)}
          >
            Close
          </button>
        </aside>
      </Modal>
    </div>
  );
}
