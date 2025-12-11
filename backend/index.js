require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const admin = require("firebase-admin");

const port = process.env.PORT || 3000;
const decoded = Buffer.from(process.env.FB_SERVICE_KEY, "base64").toString(
  "utf-8"
);
const serviceAccount = JSON.parse(decoded);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://b12-m11-session.web.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

// JWT Verify (Optional for now)
const verifyJWT = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) return res.status(401).send({ message: "Unauthorized!" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.tokenEmail = decoded.email;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

// MongoDB Setup
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: { version: ServerApiVersion.v1, strict: true },
});

async function run() {
  try {
    const db = client.db("eTuitionBD");
    const tuitionCollection = db.collection("tuition");
    const applicationsCollection = db.collection("applications");
    const UsersCollection = db.collection("users");

    // Student Posts Tuition
    app.post("/tuition", async (req, res) => {
      const tuitionData = req.body;
      tuitionData.status = "Pending";
      tuitionData.postedAt = new Date();

      const result = await tuitionCollection.insertOne(tuitionData);
      res.send(result);
    });

    //user save and update
    app.post("/user", async (req, res) => {
      const userData = req.body;
      const result = await UsersCollection.insertOne(userData);
      console.log(userData);
      res.send(result);
    });

    // Get tuition by ID
    app.get("/tuition/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const tuition = await tuitionCollection.findOne({
          _id: new ObjectId(id),
        });
        if (!tuition) return res.status(404).send({ message: "Not found" });
        res.send(tuition);
      } catch (err) {
        res.status(500).send({ message: "Server error" });
      }
    });

    // DELETE Tuition
    app.delete("/tuition/:id", async (req, res) => {
      const id = req.params.id;
      const result = await tuitionCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // Get all applications for a student (all tuitions)
    app.get("/applications/student/:email", async (req, res) => {
      const email = req.params.email;

      // 1️⃣ Get all tuitions for student
      const studentTuitions = await tuitionCollection
        .find({ studentEmail: email })
        .toArray();

      const tuitionIds = studentTuitions.map((t) => t._id.toString());

      // 2️⃣ Get all applications for those tuitions
      const applications = await applicationsCollection
        .find({ tuitionId: { $in: tuitionIds } })
        .toArray();

      res.send(applications);
    });

    // --------------------------------------------------------------

    // Tutor Apply
    app.post("/applications", async (req, res) => {
      const application = req.body;
      application.status = "Pending";
      application.appliedAt = new Date();

      const result = await applicationsCollection.insertOne(application);
      res.send(result);
    });

    // Get Applications by Tuition ID (Student Dashboard)
    app.get("/applications/tuition/:id", async (req, res) => {
      const tuitionId = req.params.id;
      const result = await applicationsCollection.find({ tuitionId }).toArray();
      res.send(result);
    });

    // Approve Application
    app.put("/applications/approve/:id", async (req, res) => {
      const id = req.params.id;

      const result = await applicationsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "Approved" } }
      );

      res.send(result);
    });

    // Reject Application
    app.put("/applications/reject/:id", async (req, res) => {
      const id = req.params.id;

      const result = await applicationsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "Rejected" } }
      );

      res.send(result);
    });
    // --------------------------------------------------------------

    // Update Tuition
    app.put("/tuition/update/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const result = await tuitionCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );
      res.send(result);
    });

    // ⬅ Get Tuitions (Support ?status=Approved OR Pending)
    app.get("/tuition", async (req, res) => {
      const status = req.query.status;

      let query = {};
      if (status) query.status = status;

      const result = await tuitionCollection.find(query).toArray();
      res.send(result);
    });

    // ⬅ Admin Approves Tuition
    app.put("/tuition/approve/:id", async (req, res) => {
      const id = req.params.id;
      const result = await tuitionCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "Approved" } }
      );

      res.send(result);
    });
    console.log("Connected to MongoDB Successfully!");
  } catch (e) {
    console.log(e);
  }
}
run();

app.get("/", (req, res) => {
  res.send("eTuitionBD Server Running...");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
