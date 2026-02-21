import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const AddTuitionForm = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const tuitionData = {
        studentName: user?.displayName,
        studentEmail: user?.email,
        subject: data.subject,
        class: data.class,
        location: data.location,
        budget: Number(data.budget),
        schedule: data.schedule,
        description: data.description,
        image: data.image || "", //
        status: "Pending",
        postedAt: new Date(),
      };

      const res = await axios.post(
        `https://etuitionbd-zeta.vercel.app/tuition`,
        tuitionData,
      );

      if (res.data.insertedId) {
        toast.success("Tuition posted successfully (Pending Approval)");
        reset();
      }
    } catch (error) {
      toast.error("Failed to post tuition", error);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-4/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Side */}
          <div className="space-y-6">
            <div>
              <label>Your Name</label>
              <input
                type="text"
                readOnly
                value={user?.displayName}
                className="w-full px-4 py-3 bg-gray-200 rounded-md"
              />
            </div>

            <div>
              <label>Your Email</label>
              <input
                type="email"
                readOnly
                value={user?.email}
                className="w-full px-4 py-3 bg-gray-200 rounded-md"
              />
            </div>

            <div>
              <label>Subject</label>
              <select
                {...register("subject", { required: "Required" })}
                className="w-full px-4 py-3 border rounded-md"
              >
                <option value="">Select Subject</option>
                <option value="Bangla">Bangla</option>
                <option value="English">English</option>
                <option value="Math">Math</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
              </select>
            </div>

            <div>
              <label>Class</label>
              <input
                {...register("class", { required: "Required" })}
                className="w-full px-4 py-3 border rounded-md"
              />
            </div>

            <div>
              <label>Location</label>
              <input
                {...register("location", { required: "Required" })}
                className="w-full px-4 py-3 border rounded-md"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <div>
              <label>Budget</label>
              <input
                type="number"
                {...register("budget", { required: "Required" })}
                className="w-full px-4 py-3 border rounded-md"
              />
            </div>

            <div>
              <label>Schedule</label>
              <input
                {...register("schedule", { required: "Required" })}
                className="w-full px-4 py-3 border rounded-md"
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                {...register("description", { required: "Required" })}
                className="w-full h-32 px-4 py-3 border rounded-md"
              ></textarea>
            </div>

            <div>
              <label>Image URL</label>
              <input
                type="text"
                {...register("image", { required: "Image URL is required" })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 mt-3 text-center font-medium text-white bg-lime-500 rounded-md"
            >
              Post Tuition
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTuitionForm;
