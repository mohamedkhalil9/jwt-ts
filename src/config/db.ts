import mongoose from "mongoose";

const connectDB = () => {
    mongoose
        .connect(process.env.DB_URI)
        .then((conn) =>
            console.log(`Database connected on host ${conn.connection.host}`),
        )
        .catch((err) => console.log(err));
};

export default connectDB;
