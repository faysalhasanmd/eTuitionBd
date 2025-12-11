import Card from "./Card";
import Container from "../Shared/Container";

const Tuition = ({ tuitions }) => {
  return (
    <Container>
      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 ">
        {tuitions && tuitions.length > 0 ? (
          tuitions.map((tuition) => <Card key={tuition._id} item={tuition} />)
        ) : (
          <p className="col-span-full text-center font-semibold">
            No approved tuitions found.
          </p>
        )}
      </div>
    </Container>
  );
};

export default Tuition;
